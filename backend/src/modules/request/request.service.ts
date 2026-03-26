import mongoose from "mongoose";
import Listing, { IListing, ListingStatus } from "../listings/listings.model";
import Request, { IRequest, RequestStatus } from "./request.model";
import { CreateRequestDto } from "./request.schema";
import { ListingsService } from "../listings/listings.service";

interface RequestMutationResult {
  updatedRequest: IRequest;
  updatedListing: IListing;
  affectedRequestsCount: number;
  notificationMessage: string;
  autoRejectedRequests?: IRequest[];
}

const requesterPopulate = {
  path: "requester",
  select: "name email phone address city district state profileImage",
};

const donorPopulate = {
  path: "donor",
  select: "name email phone address city district state profileImage",
};

const listingPopulate = {
  path: "listingId",
  select:
    "title images price stock contactInfo location expiresAt status donor",
};

const reviewPopulate = {
  path: "review",
  populate: {
    path: "reviewer",
    select: "name city district state profileImage",
  },
};



export class RequestService {

  static async getHistoryOverview(userId: string): Promise<{
    requests: IRequest[];
    foodPosts: any[];
  }> {
    await ListingsService.syncListingStatuses();

    const [requests, foodPosts] = await Promise.all([
      Request.find({
        requester: userId,
        status: { $in: [RequestStatus.APPROVED, RequestStatus.REJECTED] },
      })
        .populate(listingPopulate)
        .populate(donorPopulate)
        .populate(reviewPopulate)
        .sort({ createdAt: -1 }),
      Listing.find({
        donor: userId,
        status: { $in: [ListingStatus.EXPIRED, ListingStatus.NOT_AVAILABLE] },
      })
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    return { requests, foodPosts };
  }

  static async getHistoryRequestsForListing(
    userId: string,
    listingId: string,
  ): Promise<IRequest[]> {
    await ListingsService.syncListingStatuses();

    const listing = await Listing.findOne({ _id: listingId, donor: userId });
    if (!listing) {
      throw new Error("Food post not found");
    }

    return Request.find({
      donor: userId,
      listingId,
      status: { $in: [RequestStatus.APPROVED, RequestStatus.REJECTED] },
    })
      .populate(requesterPopulate)
      .populate(listingPopulate)
      .sort({ createdAt: -1 });
  }

  static async createRequest(
    userId: string,
    data: CreateRequestDto,
  ): Promise<IRequest> {
    await ListingsService.syncListingStatuses();

    const listing = await Listing.findById(data.listingId);
    if (!listing) {
      throw new Error("Listing not found");
    }

    if (String(listing.donor) === userId) {
      throw new Error("You cannot request your own listing");
    }

    if (listing.status !== ListingStatus.AVAILABLE) {
      throw new Error("This listing is not available");
    }

    if (listing.stock.quantity < data.requestedQuantity) {
      throw new Error("Requested quantity exceeds available stock");
    }

    const existingPendingRequest = await Request.findOne({
      listingId: listing._id,
      requester: userId,
      status: RequestStatus.PENDING,
    });

    if (existingPendingRequest) {
      throw new Error("You already have a pending request for this listing");
    }

    const request = await Request.create({
      listingId: listing._id,
      requester: userId,
      donor: listing.donor,
      requestedQuantity: data.requestedQuantity,
      message: data.message,
    });

    return Request.findById(request._id)
      .populate(listingPopulate)
      .populate(donorPopulate)
      .populate(requesterPopulate)
      .populate(reviewPopulate)
      .orFail();
  }

  static async getRequesterRequests(userId: string): Promise<IRequest[]> {
    await ListingsService.syncListingStatuses();

    return Request.find({ requester: userId })
      .populate(listingPopulate)
      .populate(donorPopulate)
      .populate(reviewPopulate)
      .sort({ createdAt: -1 });
  }

  static async getDonorRequests(
    userId: string,
    listingId: string,
  ): Promise<IRequest[]> {
    return Request.find({ donor: userId, listingId })
      .populate(requesterPopulate)
      .populate(listingPopulate)
      .populate(reviewPopulate)
      .sort({ createdAt: -1 });
  }

  static async acceptRequest(
    userId: string,
    requestId: string,
  ): Promise<RequestMutationResult> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const request = await Request.findOne({
        _id: requestId,
        donor: userId,
      }).session(session);
      if (!request) {
        throw new Error("Request not found");
      }

      if (request.status !== RequestStatus.PENDING) {
        throw new Error("Only pending requests can be accepted");
      }

      const listing = await Listing.findOne({
        _id: request.listingId,
        donor: userId,
      }).session(session);
      if (!listing) {
        throw new Error("Listing not found");
      }

      const derivedStatus = ListingsService.getDerivedStatus(listing);
      if (derivedStatus === ListingStatus.EXPIRED) {
        listing.status = ListingStatus.EXPIRED;
        await listing.save({ session });
        throw new Error("Listing has expired");
      }

      if (listing.stock.quantity < request.requestedQuantity) {
        listing.status =
          listing.stock.quantity > 0
            ? ListingStatus.AVAILABLE
            : ListingStatus.NOT_AVAILABLE;
        await listing.save({ session });
        throw new Error("Not enough stock to accept this request");
      }

      listing.stock.quantity = Math.max(
        0,
        listing.stock.quantity - request.requestedQuantity,
      );
      listing.status =
        listing.stock.quantity === 0
          ? ListingStatus.NOT_AVAILABLE
          : ListingStatus.AVAILABLE;
      await listing.save({ session });

      request.status = RequestStatus.APPROVED;
      request.acceptedAt = new Date();
      request.donorToastMessage = `Your request was accepted. Donor approved ${request.requestedQuantity} ${listing.stock.unit}.`;
      await request.save({ session });

      const notificationMessage =
        listing.stock.quantity === 0
          ? "This food post is now out of stock."
          : `Stock updated. Remaining stock: ${listing.stock.quantity} ${listing.stock.unit}.`;

      const autoRejectedRequestIds = (
        await Request.find(
          {
            listingId: listing._id,
            _id: { $ne: request._id },
            status: RequestStatus.PENDING,
            requestedQuantity: { $gt: listing.stock.quantity },
          },
          { _id: 1 },
          { session },
        )
      ).map((pendingRequest) => pendingRequest._id);

      let affectedRequestsCount = 0;

      if (autoRejectedRequestIds.length) {
        const updateResult = await Request.updateMany(
          {
            _id: { $in: autoRejectedRequestIds },
          },
          {
            $set: {
              status: RequestStatus.REJECTED,
              donorToastMessage: `Automatically rejected because only ${listing.stock.quantity} ${listing.stock.unit} remain in stock.`,
            },
          },
          { session },
        );

        affectedRequestsCount = updateResult.modifiedCount;
      }

      await session.commitTransaction();

      const [updatedRequest, autoRejectedRequests] = await Promise.all([
        Request.findById(request._id)
          .populate(requesterPopulate)
          .populate(listingPopulate)
          .populate(reviewPopulate)
          .orFail(),
        autoRejectedRequestIds.length
          ? Request.find({ _id: { $in: autoRejectedRequestIds } })
              .populate(requesterPopulate)
              .populate(listingPopulate)
              .populate(reviewPopulate)
          : Promise.resolve([]),
      ]);

      return {
        updatedRequest,
        updatedListing: listing,
        affectedRequestsCount,
        notificationMessage,
        autoRejectedRequests,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async rejectRequest(
    userId: string,
    requestId: string,
  ): Promise<RequestMutationResult> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const request = await Request.findOne({
        _id: requestId,
        donor: userId,
      }).session(session);
      if (!request) {
        throw new Error("Request not found");
      }

      if (request.status !== RequestStatus.PENDING) {
        throw new Error("Only pending requests can be rejected");
      }

      const listing = await Listing.findOne({
        _id: request.listingId,
        donor: userId,
      }).session(session);
      if (!listing) {
        throw new Error("Listing not found");
      }

      request.status = RequestStatus.REJECTED;
      request.donorToastMessage = "Your request was rejected by the donor.";
      await request.save({ session });

      await session.commitTransaction();

      const updatedRequest = await Request.findById(request._id)
        .populate(requesterPopulate)
        .populate(listingPopulate)
        .populate(reviewPopulate)
        .orFail();

      return {
        updatedRequest,
        updatedListing: listing,
        affectedRequestsCount: 1,
        notificationMessage: request.donorToastMessage,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

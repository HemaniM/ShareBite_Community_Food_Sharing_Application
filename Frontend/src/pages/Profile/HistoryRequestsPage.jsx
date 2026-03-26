import React from "react";
import { Icon } from "../../components/Icons/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Button1 from "../../components/ui/Button1";
import { deleteHistoryRequest } from "../../features/history/historySlice";
import { fetchMyRequests } from "../../features/requests/requestsSlice";

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString();
};

const HistoryRequestsPage = () => {
  const dispatch = useAppDispatch();
  const {
    historyRequests,
    overviewLoading,
    overviewError,
    deleteRequestLoading,
    deleteRequestError,
  } = useAppSelector((state) => state.history);

  const handleDeleteRequest = async (requestId) => {
    const action = await dispatch(deleteHistoryRequest(requestId));
    if (deleteHistoryRequest.fulfilled.match(action)) {
      dispatch(fetchMyRequests());
    }
  };

  return (
    <div className="space-y-[30px]">
      {overviewLoading && (
        <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--text-grey-4)] px-6 py-10 text-center text-[15px]">
          Loading history...
        </div>
      )}
      {overviewError && (
        <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--primary-orange-600)] px-6 py-10 text-center text-[15px]">
          {overviewError}
        </div>
      )}
      {deleteRequestError && (
        <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--primary-orange-600)] px-6 py-10 text-center text-[15px]">
          {deleteRequestError}
        </div>
      )}

      {!overviewLoading && !historyRequests.length && (
        <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--text-grey-4)] px-6 py-10 text-center text-[15px]">
          No approved/rejected requests in your history.
        </div>
      )}

      {historyRequests.map((request) => {
        const listing = request.listingId || {};
        const donor = request.donor || {};
        const image = listing.images?.[0] || "/images/Meals_image.jpg";

        return (
          <article
            key={request._id}
            className="rounded-[9px] border border-[#e6e5df] bg-white px-[28px] py-[20px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="max-w-[450px] flex items-center gap-[30px]">
                <img
                  src={image}
                  alt={listing.title || "Food post"}
                  className="h-[150px] w-[125px] rounded-[10px] object-cover"
                />

                <div className="text-[14px] text-[var(--text-grey-4)] leading-[26px]">
                  <h3 className="text-[18px] leading-[1.1] font-bold text-[var(--text-grey-5)] mb-[6px]">
                    {listing.title || "Food post"}
                  </h3>
                  <p className="mb-[16px]">
                    From, {donor.name || "ShareBite user"}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--text-grey-5)] mr-[45px]">
                      Price
                    </span>
                    {listing.price?.isFree
                      ? "Free"
                      : `${listing.price?.amount || 0} ₹/-`}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--text-grey-5)] mr-[25px]">
                      In Stock
                    </span>
                    {request.requestedQuantity || 0}{" "}
                    {listing.stock?.unit || "items"}
                  </p>
                </div>
              </div>

              <p className="text-[13px] text-[var(--text-grey-4)]">
                <span className="mr-3 font-bold text-[var(--text-grey-5)]">
                  Date
                </span>
                {formatDate(request.createdAt)}
              </p>
              <p className=" text-[20px] font-bold leading-none text-[var(--primary-orange-800)]">
                {listing.price?.isFree
                  ? "0 ₹/-"
                  : `${listing.price?.amount || 0} ₹/-`}
              </p>

              <div className="min-w-[100px] flex justify-center">
                <span
                  className={` ${request.status == "rejected" ? "bg-[var(--primary-orange-50)]" : "bg-[var(--primary-green-50)]"} rounded-[10px] px-[15px] py-[8px] text-[14px] font-semibold text-[var(--text-grey-4)] capitalize`}
                >
                  {request.status}
                </span>
              </div>

              <Button1
                variant="outline"
                color="orange"
                size="sm"
                className="group !border-none p-[16px] bg-[var(--primary-cream-100)] rounded-[8px]"
                aria-label="Delete request from history"
                onClick={() => handleDeleteRequest(request._id)}
                disabled={deleteRequestLoading}
              >
                <Icon
                  name="delete_icon_orange"
                  className="group-hover:hidden"
                />
                <Icon
                  name="delete_icon_white"
                  className="hidden group-hover:block"
                />
              </Button1>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default HistoryRequestsPage;

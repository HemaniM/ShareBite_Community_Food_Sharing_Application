import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Button1 from "../../components/ui/Button1";
import DropdownField from "../../components/ui/DropdownField";
import { Icon } from "../../components/Icons/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  acceptRequest,
  fetchRequestsForListing,
} from "../../features/requests/requestsSlice";

const dropdownOptions = ["ALL", "Pending", "Accepted", "Rejected"];

const formatRequestedAgo = (createdAt) => {
  if (!createdAt) {
    return "Requested recently";
  }

  const createdDate = new Date(createdAt);
  if (Number.isNaN(createdDate.getTime())) {
    return "Requested recently";
  }

  const diffInMinutes = Math.max(
    1,
    Math.round((Date.now() - createdDate.getTime()) / 60000),
  );
  if (diffInMinutes < 60) {
    return `Requested ${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.round(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Requested ${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.round(diffInHours / 24);
  return `Requested ${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
};

const formatDayLabel = (createdAt) => {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  return isToday ? "Today" : date.toLocaleDateString();
};

const FoodPostRequestsPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    listingRequests,
    listingRequestsLoading,
    listingRequestsError,
    acceptLoading,
  } = useAppSelector((state) => state.requests);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const dropdownRef = useRef(null);

  const pageTitle =
    location.state?.postTitle ||
    listingRequests[0]?.listingId?.title ||
    "FOOD POST";

  useEffect(() => {
    if (postId) {
      dispatch(fetchRequestsForListing(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!toast.message) {
      return undefined;
    }

    const timeoutId = setTimeout(
      () => setToast({ message: "", type: "success" }),
      3000,
    );

    return () => clearTimeout(timeoutId);
  }, [toast]);

  const filteredRequests = useMemo(() => {
    if (statusFilter === "ALL") {
      return listingRequests;
    }

    return listingRequests.filter(
      (request) => request.status === statusFilter.toLowerCase(),
    );
  }, [listingRequests, statusFilter]);

  const handleAcceptRequest = async (requestId) => {
    const action = await dispatch(
      acceptRequest({ requestId, listingId: postId }),
    );
    if (acceptRequest.fulfilled.match(action)) {
      setToast({ message: "Request accepted successfully", type: "success" });
      dispatch(fetchRequestsForListing(postId));
    } else {
      setToast({
        message: action.payload || "Unable to accept request",
        type: "error",
      });
    }
  };

  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
      {toast.message && (
        <div
          className={`fixed top-5 right-5 z-50 rounded-lg px-4 py-3 text-white shadow-lg ${
            toast.type === "error" ? "bg-orange-500" : "bg-green-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold tracking-[0.4px] text-black uppercase">
          ALL REQUESTS FOR <span className="text-orange">{pageTitle}</span>
        </h2>

        <div ref={dropdownRef} className="w-[180px]">
          <DropdownField
            name="statusFilter"
            value={statusFilter}
            placeholder="ALL"
            buttonColorClass="bg-orange text-white"
            iconName="arrow_down_white"
            options={dropdownOptions}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen((previous) => !previous)}
            onSelect={(value) => {
              setStatusFilter(value);
              setIsDropdownOpen(false);
            }}
            buttonClassName="!mt-0"
          />
        </div>
      </div>

      {listingRequestsLoading && <p>Loading requests...</p>}
      {listingRequestsError && (
        <p className="text-red-500">{listingRequestsError}</p>
      )}

      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const requester = request.requester || {};
          const address = [requester.address, requester.city, requester.state]
            .filter(Boolean)
            .join(", ");

          return (
            <article
              key={request._id}
              className="rounded-[8px] border border-[var(--white-600)] bg-white py-[22px] px-[24px]"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex flex-col gap-[15px]">
                  <div className="flex items-center gap-[20px]">
                    <img
                      src={
                        requester.profileImage || "/images/profile_image.jpg"
                      }
                      alt={requester.name || "Requester"}
                      className="h-[50px] w-[50px] rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-[16px] font-bold text-[var(--text-grey-5)] mb-[8px]">
                        {requester.name || "ShareBite User"}
                      </h3>
                      <p className="text-[10px] text-[var(--text-grey-3)]">
                        {formatRequestedAgo(request.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-[12px] leading-[19px] text-[var(--text-grey-4)] px-2">
                    <div className="mt-[10px] grid md:grid-cols-2 gap-x-[80px] ">
                      <div className="flex flex-col gap-[6px]">
                        <p>
                          <span className="mr-[30px] font-semibold text-[#2f2e2b]">
                            Product
                          </span>
                          {request.listingId?.title || pageTitle}
                        </p>
                        <p>
                          <span className="mr-[12px] font-semibold text-[#2f2e2b]">
                            Request ID
                          </span>
                          {request._id}
                        </p>
                        <p>
                          <span className="mr-[25px] font-semibold text-[#2f2e2b]">
                            Quantity
                          </span>
                          {request.requestedQuantity}{" "}
                          {request.listingId?.stock?.unit || "items"}
                        </p>
                        <p className="md:col-span-2">
                          <span className="mr-[45px] font-semibold text-[#2f2e2b]">
                            From
                          </span>
                          {address || requester.email || "-"}
                        </p>
                        {request.message && (
                          <p className="md:col-span-2">
                            <span className="mr-[24px] font-semibold text-[#2f2e2b]">
                              Message
                            </span>
                            {request.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <p className="font-semibold text-[#2f2e2b]">Contacts</p>
                        <p>{requester.phone || "-"}</p>
                        <p>{requester.email || "-"}</p>
                      </div>
                    </div>

                    <div className="mt-[15px] flex items-center gap-[15px]">
                      {request.status === "pending" ? (
                        <Button1
                          type="button"
                          variant="filled"
                          color="green"
                          size="sm"
                          onClick={() => handleAcceptRequest(request._id)}
                          disabled={acceptLoading}
                          className="rounded-[8px] px-[18px] py-[10px] text-[12px] font-semibold"
                        >
                          {acceptLoading ? "PROCESSING..." : "ACCEPT REQUEST"}
                        </Button1>
                      ) : (
                        <Button1
                          type="button"
                          variant={
                            request.status === "approved" ? "filled" : "outline"
                          }
                          color={
                            request.status === "approved" ? "green" : "orange"
                          }
                          size="sm"
                          className="rounded-[8px] px-[18px] py-[10px] text-[12px] font-semibold"
                        >
                          {request.status.toUpperCase()}
                        </Button1>
                      )}
                    </div>

                    {request.donorToastMessage && (
                      <p className="mt-3 text-[12px] text-[var(--text-grey-4)]">
                        {request.donorToastMessage}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-[14px] text-[var(--text-grey-5)] mt-3 font-medium">
                  {formatDayLabel(request.createdAt)}
                </p>
              </div>
            </article>
          );
        })}

        {!listingRequestsLoading && filteredRequests.length === 0 && (
          <div className="rounded-[8px] border border-dashed border-[var(--white-600)] px-6 py-10 text-center text-[14px] text-[var(--text-grey-4)]">
            No requests found for the selected filter.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/profile/food-posts">
          <Button1
            type="button"
            variant="outline"
            color="green"
            size="md"
            className="group text-[16px] rounded-[10px] font-semibold px-[18px] py-[12px] leading-tight"
          >
            View post details
            <Icon
              name="right_arrow_green"
              className="ml-[15px] group-hover:hidden"
            />
            <Icon
              name="right_arrow"
              className="hidden group-hover:block ml-[15px]"
            />
          </Button1>
        </Link>
      </div>
    </section>
  );
};

export default FoodPostRequestsPage;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchMyRequests } from "../../features/requests/requestsSlice";

const requestFilterOptions = [
  { value: "all", label: "ALL" },
  { value: "pending", label: "Requested" },
  { value: "approved", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const formatRequestDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString();
};

const getStatusLabel = (status) => {
  switch (status) {
    case "approved":
      return "REQUEST ACCEPTED";
    case "pending":
      return "REQUESTED";
    case "rejected":
      return "REQUEST REJECTED";
    case "completed":
      return "COMPLETED";
    case "cancelled":
      return "CANCELLED";
    default:
      return (status || "REQUESTED").toUpperCase();
  }
};

const getStatusColor = (status) => {
  if (status === "approved" || status === "completed") {
    return "green";
  }

  if (status === "pending") {
    return "green";
  }

  return "orange";
};

export const RequestsPage = () => {
  const dispatch = useAppDispatch();
  const { myRequests, myRequestsLoading, myRequestsError } = useAppSelector(
    (state) => state.requests,
  );

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [activeRequestId, setActiveRequestId] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);

  useEffect(() => {
    dispatch(fetchMyRequests());
  }, [dispatch]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredRequests = useMemo(() => {
    if (selectedFilter === "all") {
      return myRequests;
    }

    return myRequests.filter((request) => request.status === selectedFilter);
  }, [myRequests, selectedFilter]);

  const selectedFilterLabel =
    requestFilterOptions.find((option) => option.value === selectedFilter)
      ?.label || "ALL";

  const handleOpenFeedbackModal = (requestId) => {
    setActiveRequestId(requestId);
    setFeedbackText("");
    setFeedbackRating(0);
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setActiveRequestId("");
    setFeedbackText("");
    setFeedbackRating(0);
  };

  const collectAndSubmitFeedback = ({ requestId, rating, feedback }) => {
    const feedbackPayload = {
      requestId,
      rating,
      feedback,
      submittedAt: new Date().toISOString(),
    };

    console.log("Feedback submitted:", feedbackPayload);

    return feedbackPayload;
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    const feedbackPayload = collectAndSubmitFeedback({
      requestId: activeRequestId,
      rating: feedbackRating,
      feedback: feedbackText.trim(),
    });

    if (feedbackPayload) {
      handleCloseFeedbackModal();
    }
  };

  return (
    <>
      <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
        <div className="flex items-center justify-between mb-[50px]">
          <h2 className="text-[22px] font-bold tracking-[0.4px] text-black">
            ALL REQUESTS
          </h2>

          <div ref={filterRef} className="relative">
            <Button1
              type="button"
              variant="filled"
              color="orange"
              size="sm"
              onClick={() => setIsFilterOpen((previous) => !previous)}
              className="px-[20px] py-[10px] rounded-[8px] text-[12px] font-semibold gap-[20px]"
            >
              {selectedFilterLabel}
              <Icon
                name="arrow_down_white"
                className={`scale-[0.7] transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </Button1>

            {isFilterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-[150px] rounded-[8px] border border-[#F2EBE5] bg-white p-2 shadow-[0px_8px_24px_#00000024]">
                {requestFilterOptions.map((option) => {
                  const isSelected = selectedFilter === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSelectedFilter(option.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full rounded-[6px] px-3 py-2 text-left text-[12px] font-semibold ${
                        isSelected
                          ? "bg-[var(--primary-green-50)] text-[#595957]"
                          : "text-[var(--text-grey-4)] hover:bg-[#F2F4EA]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {myRequestsLoading && <p>Loading requests...</p>}
        {myRequestsError && <p className="text-red-500">{myRequestsError}</p>}

        <div className="space-y-4">
          {!myRequestsLoading && !filteredRequests.length && (
            <div className="rounded-[8px] border border-dashed border-[var(--white-600)] px-6 py-10 text-center text-[14px] text-[var(--text-grey-4)]">
              No requests found for the selected filter.
            </div>
          )}

          {filteredRequests.map((request) => {
            const listing = request.listingId || {};
            const donor = request.donor || {};
            const image = listing.images?.[0] || "/images/Meals_image.jpg";
            const address = [
              listing.location?.addressLineOne,
              listing.location?.city,
              listing.location?.state,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <article
                key={request._id}
                className="rounded-[8px] border border-[var(--white-600)] bg-white py-[25px] px-[30px]"
              >
                <div className="flex items-start justify-between gap-[30px]">
                  <div className="flex gap-[30px]">
                    <img
                      src={image}
                      alt={listing.title || "Requested food post"}
                      className="h-[200px] w-[165px] rounded-[8px] object-cover"
                    />

                    <div className="text-[12px] text-[#77746d] leading-[17px] p-1">
                      <h3 className="text-[20px] leading-none font-bold text-[#31302b] mb-[10px]">
                        {listing.title || "Food post"}
                      </h3>

                      <p className="text-[13px] my-[6px]">{address || "-"}</p>
                      <p className="text-[13px]">
                        From, {donor.name || "ShareBite Donor"}
                      </p>

                      <div className="mt-[16px] grid grid-cols-2 gap-x-[100px] gap-y-2 max-w-[600px]">
                        <p>
                          <span className="font-semibold text-[#2f2e2b] mr-[40px]">
                            Price
                          </span>
                          <span className="ml-2">
                            {listing.price?.isFree
                              ? "FREE /-"
                              : `${listing.price?.amount || 0} ₹/-`}
                          </span>
                        </p>
                        <p className="font-semibold text-[#2f2e2b]">Contact</p>
                        <p>
                          <span className="font-semibold text-[#2f2e2b] mr-[7px]">
                            Request ID
                          </span>
                          <span className="ml-2">{request._id}</span>
                        </p>
                        <p>
                          {listing.contactInfo?.phoneNumber ||
                            donor.phone ||
                            "-"}
                        </p>
                        <p>
                          <span className="font-semibold text-[#2f2e2b] mr-[16px]">
                            Quantity
                          </span>
                          <span className="ml-2">
                            {request.requestedQuantity}{" "}
                            {listing.stock?.unit || "items"}
                          </span>
                        </p>
                        <p>
                          {listing.contactInfo?.email || donor.email || "-"}
                        </p>
                      </div>

                      <div className="mt-[15px] flex flex-wrap items-center gap-[15px]">
                        <Button1
                          type="button"
                          variant={
                            getStatusColor(request.status) === "green"
                              ? "filled"
                              : "outline"
                          }
                          color={getStatusColor(request.status)}
                          size="sm"
                          className="rounded-[8px] px-[18px] py-[10px] text-[12px] font-semibold"
                        >
                          {getStatusLabel(request.status)}
                        </Button1>

                        {request.status === "approved" && (
                          <Button1
                            type="button"
                            variant="outline"
                            color="orange"
                            size="sm"
                            className="rounded-[8px] px-[18px] py-[9px] text-[12px] font-semibold"
                            onClick={() => handleOpenFeedbackModal(request._id)}
                          >
                            SHARE YOUR FEEDBACK
                          </Button1>
                        )}
                      </div>

                      {request.donorToastMessage && (
                        <p className="mt-4 text-[12px] text-[var(--text-grey-4)]">
                          {request.donorToastMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[14px] text-[var(--text-grey-5)] mt-3 font-medium">
                    {formatRequestDate(request.createdAt)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[520px] rounded-[14px] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-bold text-[#2f2e2b]">
                Share feedback
              </h3>
              <button
                type="button"
                onClick={handleCloseFeedbackModal}
                className="text-[22px] leading-none text-[#77746d]"
              >
                ×
              </button>
            </div>

            <form className="mt-6" onSubmit={handleFeedbackSubmit}>
              <label className="block text-[13px] font-semibold text-[#2f2e2b]">
                Rating
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="1"
                  value={feedbackRating}
                  onChange={(event) =>
                    setFeedbackRating(Number(event.target.value))
                  }
                  className="mt-2 w-full rounded-[8px] border border-[#e5e4df] px-3 py-2"
                />
              </label>

              <label className="mt-4 block text-[13px] font-semibold text-[#2f2e2b]">
                Feedback
                <textarea
                  rows="4"
                  value={feedbackText}
                  onChange={(event) => setFeedbackText(event.target.value)}
                  className="mt-2 w-full rounded-[8px] border border-[#e5e4df] px-3 py-2"
                  placeholder="Share your experience"
                />
              </label>

              <div className="mt-6 flex justify-end gap-3">
                <Button1
                  type="button"
                  variant="outline"
                  color="orange"
                  size="sm"
                  onClick={handleCloseFeedbackModal}
                  className="rounded-[8px] px-4 py-2 text-[12px] font-semibold"
                >
                  CANCEL
                </Button1>
                <Button1
                  type="submit"
                  variant="filled"
                  color="green"
                  size="sm"
                  className="rounded-[8px] px-4 py-2 text-[12px] font-semibold"
                >
                  SUBMIT FEEDBACK
                </Button1>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestsPage;

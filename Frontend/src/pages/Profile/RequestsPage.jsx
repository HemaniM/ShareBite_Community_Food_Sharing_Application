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
    default:
      return (status || "REQUESTED").toUpperCase();
  }
};

const getStatusStyles = (status) => {
  if (status === "approved") {
    return {
      variant: "filled",
      color: "green",
      className: "bg-[var(--primary-green-50)] text-green pointer-events-none",
    };
  }

  if (status === "pending") {
    return {
      variant: "outline",
      color: "green",
      className: "pointer-events-none",
    };
  }

  return {
    variant: "outline",
    color: "orange",
    className: "pointer-events-none",
  };
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
      return myRequests.filter((request) =>
        ["pending", "approved", "rejected"].includes(request.status),
      );
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
                className={`scale-[0.7] transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
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
            const statusStyles = getStatusStyles(request.status);

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
                          variant={statusStyles.variant}
                          color={statusStyles.color}
                          size="sm"
                          className={`rounded-[8px] px-[18px] py-[10px] text-[12px] font-semibold ${statusStyles.className}`}
                        >
                          {getStatusLabel(request.status)}
                        </Button1>

                        {request.status === "approved" && (
                          <Button1
                            type="button"
                            variant="filled"
                            color="orange"
                            size="sm"
                            className="rounded-[10px] px-[18px] py-[10px] text-[12px] font-semibold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(49,48,43,0.16)] backdrop-blur-[3px] px-4">
          <div className="relative w-full max-w-[520px] rounded-[8px] bg-white px-[44px] py-[36px] shadow-[0px_16px_40px_#00000029]">
            <button
              type="button"
              onClick={handleCloseFeedbackModal}
              className="absolute right-[24px] top-[22px]"
              aria-label="Close feedback modal"
            >
              <Icon name="cross_icon" />
            </button>

            <h3 className="text-center text-[22px] font-semibold tracking-[0.2px] text-[#31302b] uppercase">
              HOW WAS YOUR EXPERIENCE?
            </h3>
            <p className="mx-auto mt-[14px] max-w-[275px] text-center text-[11px] font-medium uppercase leading-[16px] text-[var(--text-grey-4)]">
              YOUR FEEDBACK HELPS US TO IMPROVE. TAP A STAR TO RATE YOUR
              EXPERIENCE.
            </p>

            <form className="mt-[34px]" onSubmit={handleFeedbackSubmit}>
              <div className="mb-[28px] flex items-center justify-center gap-[10px]">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled = starValue <= feedbackRating;

                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setFeedbackRating(starValue)}
                      className="transition-transform duration-150 hover:scale-110"
                      aria-label={`Rate ${starValue} star`}
                    >
                      <Icon
                        name={
                          isFilled
                            ? "feedback_star_icon_filled"
                            : "feedback_star_icon_outlined"
                        }
                      />
                    </button>
                  );
                })}
              </div>

              <textarea
                value={feedbackText}
                onChange={(event) => setFeedbackText(event.target.value)}
                placeholder="Type Your Feedback Here..."
                className="h-[112px] w-full rounded-[6px] border border-[#e5dfd6] px-[18px] py-[16px] text-[12px] text-[var(--text-grey-4)] outline-none resize-none placeholder:text-[#b5ada3]"
                required
              />

              <Button1
                type="submit"
                variant="filled"
                color="orange"
                size="md"
                disabled={feedbackRating === 0}
                className="mx-auto mt-[28px] block rounded-[8px] px-[20px] py-[12px] text-[12px] font-bold tracking-[0.4px]"
              >
                SUBMIT REVIEW
              </Button1>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestsPage;

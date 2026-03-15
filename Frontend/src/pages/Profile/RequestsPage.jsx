import React from "react";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";
import { useEffect, useMemo, useRef, useState } from "react";

const requests = [
  {
    id: "R6327YEg3",
    foodName: "Kathi Roll",
    price: 10,
    username: "Riya Mehata",
    address: "Bhayander (W), BP Road, Shiv Nagar",
    date: "Today",
    quantity: "3 Rolls",
    contactNumber: "+91 87759 50643",
    contactEmail: "riya.mehata243@gmail.com",
    image: "/images/Kathi_Roll.jpg",
    status: "accepted",
  },
  {
    id: "R6327SE5f4",
    foodName: "Noodles",
    price: 20,
    address: "Bhayander (W), Jesal Park, Shiv Nagar",
    username: "Nira Sharma",
    date: "30/01/2026",
    quantity: "3",
    contactNumber: "+91 87779 50643",
    contactEmail: "nira.sharma23@gmail.com",
    image: "/images/Noodles.jpg",
    status: "requested",
  },
  {
    id: "R4452ME771",
    foodName: "Watermelon Juice",
    price: 0,
    address: "Bhayander (E), Maxus Road",
    username: "Aman Gracias",
    date: "30/01/2026",
    quantity: "2 Plates",
    contactNumber: "+91 93472 13456",
    contactEmail: "aman.gr12@gmail.com",
    image: "/images/Watermelon_Juice.jpg",
    status: "requested",
  },
  {
    id: "R44534577d",
    foodName: "Badami Paneer",
    price: 40,
    address: "Bhayander (E), Shivar Garden",
    username: "Shruti Kadam",
    date: "29/01/2026",
    quantity: "2 Bottles",
    contactNumber: "+91 93472 13456",
    contactEmail: "kadam.shruti22@gmail.com",
    image: "/images/Badami_Paneer.jpg",
    status: "accepted",
  },
  {
    id: "R4452hj97d",
    foodName: "Mango Milkshake",
    price: 25,
    address: "Bhayander (E), Goddev Village, Pooja Nagar",
    username: "Manish Goyal",
    date: "29/01/2026",
    quantity: "2 Bottles",
    contactNumber: "+91 93472 13456",
    contactEmail: "goyaldj12@gmail.com",
    image: "/images/Mango_milkshake.jpg",
    status: "accepted",
  },
];

const requestFilterOptions = [
  { value: "all", label: "ALL" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
];

export const RequestsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [activeRequestId, setActiveRequestId] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);

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
      return requests;
    }

    return requests.filter((request) => request.status === selectedFilter);
  }, [selectedFilter]);

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

    // Replace this with your API/service call.
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

          {/* <Button1
          type="button"
          variant="filled"
          color="orange"
          size="sm"
          className="px-[20px] py-[10px] rounded-[8px] text-[12px] font-semibold gap-[20px]"
        >
          All
          <Icon name="arrow_down_white" className="scale-[0.7]" />
        </Button1>
      </div> */}

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

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <article
              key={request.id}
              className="rounded-[8px] border border-[var(--white-600)] bg-white py-[25px] px-[30px]"
            >
              <div className="flex items-start justify-between gap-[30px]">
                <div className="flex gap-[30px]">
                  <img
                    src={request.image}
                    alt={request.foodName}
                    className="h-[200px] w-[165px] rounded-[8px] object-cover"
                  />

                  <div className="text-[12px] text-[#77746d] leading-[17px] p-1">
                    <h3 className="text-[20px] leading-none font-bold text-[#31302b] mb-[10px]">
                      {request.foodName}
                    </h3>

                    <p className="text-[13px] my-[6px]">{request.address}</p>
                    <p className="text-[13px]">{request.username}</p>

                    <div className="mt-[16px] grid grid-cols-2 gap-x-[100px] gap-y-2 max-w-[600px]">
                      <p>
                        <span className="font-semibold text-[#2f2e2b] mr-[40px]">
                          Price
                        </span>
                        <span className="ml-2">
                          {request?.price === 0
                            ? "FREE /-"
                            : `${request?.price} ₹/-`}
                        </span>
                      </p>
                      <p className="font-semibold text-[#2f2e2b]">Contact</p>
                      <p>
                        <span className="font-semibold text-[#2f2e2b] mr-[7px]">
                          Request ID
                        </span>
                        <span className="ml-2">{request.id}</span>
                      </p>
                      <p>{request.contactNumber}</p>
                      <p>
                        <span className="font-semibold text-[#2f2e2b] mr-[20px]">
                          Quantity
                        </span>
                        <span className="ml-2">{request.quantity}</span>
                      </p>
                      <p className="truncate">{request.contactEmail}</p>
                    </div>

                    <div className="mt-[16px] flex items-center gap-[15px]">
                      <Button1
                        type="button"
                        variant="filled"
                        color="green"
                        size="sm"
                        className="px-[18px] py-[10px] rounded-[8px] text-[12px] font-semibold bg-[var(--primary-green-50)] text-green pointer-events-none"
                      >
                        {request.status === "accepted"
                          ? "REQUEST ACCEPTED"
                          : "REQUESTED"}
                      </Button1>

                      <Button1
                        type="button"
                        variant="outline"
                        color="orange"
                        size="sm"
                        className="px-[18px] py-[8px] rounded-[8px] px-3 text-[12px] font-semibold"
                      >
                        DELETE REQUEST
                      </Button1>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] pt-1 text-[var(--text-grey-5)]">
                  {request.date}
                </p>
              </div>

              <div
                className={`mt-3 ml-[200px] ${request.status === "accepted" ? "" : "hidden"}`}
              >
                <p className="text-[13px] text-[var(--text-grey-5)]">
                  You can now contact the owner to pick the product using
                  contact details
                </p>

                <Button1
                  type="button"
                  variant="filled"
                  color="orange"
                  size="md"
                  onClick={() => handleOpenFeedbackModal(request.id)}
                  className="group mt-3 bg-[var(--primary-orange-50)] text-[var(--primary-orange-600)] rounded-[10px] px-[18px] py-[15px] text-[12px] font-semibold inline-flex gap-[15px] hover:bg-orange hover:text-white"
                >
                  <Icon
                    name="feedback_msg_orange_icon"
                    className="group-hover:hidden"
                  />
                  <Icon
                    name="feedback_msg_white_icon"
                    className="hidden group-hover:block"
                  />
                  SHARE YOUR FEEDBACK
                </Button1>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="relative w-full max-w-[500px] rounded-[15px] bg-white px-8 py-9 shadow-[0px_16px_40px_#00000029]">
            {/* <button
              type="button"
              onClick={handleCloseFeedbackModal}
              className="absolute right-4 top-3 text-[#8c8c8a] text-[18px] leading-none"
              aria-label="Close feedback modal"
            >
              ×
            </button> */}
            <div className="flex justify-end mb-2">
              <div onClick={handleCloseFeedbackModal}>
                <Icon name="cross_icon" />
              </div>
            </div>
            <div className="px-4">
              <h3 className="text-center text-[18px] font-bold tracking-[0.4px] text-black uppercase">
                HOW WAS YOUR EXPERIENCE?
              </h3>
              <p className="mt-[20px] w-[300px] text-center mx-auto text-[12px] font-medium leading-[14px] text-[var(--text-grey-4)] uppercase">
                YOUR FEEDBACK HELPS US TO IMPROVE. TAP A STAR TO RATE YOUR
                EXPERIENCE.
              </p>

              <form onSubmit={handleFeedbackSubmit} className="mt-[60px]">
                <div className="flex items-center justify-center gap-2 mb-[45px]">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = starValue <= feedbackRating;

                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setFeedbackRating(starValue)}
                        className="leading-none leading-none transition-transform duration-150 hover:scale-110"
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
                  placeholder="Type your feedback here..."
                  className="w-full h-[100px] rounded-[8px] border border-[var(--text-grey-2)] px-3 py-2 text-[14px] text-[var(--text-grey-4)] outline-none resize-none"
                  required
                />

                <Button1
                  type="submit"
                  variant="filled"
                  color="orange"
                  size="md"
                  disabled={feedbackRating === 0}
                  className="mx-auto mt-[60px] block tracking-[0.4px] rounded-[8px] px-[20px] py-[15px] text-[14px] font-bold"
                >
                  SUBMIT REVIEW
                </Button1>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestsPage;

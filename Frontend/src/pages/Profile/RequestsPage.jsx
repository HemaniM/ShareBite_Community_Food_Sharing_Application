import React from "react";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";
import { useEffect, useMemo, useRef, useState } from "react";

const requests = [
  {
    id: "R6327YEg3",
    foodName: "Kathi Roll",
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

  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
      <div className="flex items-center justify-between mb-[50px]">
        <h2 className="text-[22px] font-bold tracking-[0.4px] text-[#2f2e2a]">
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
                      <span className="ml-2">20 ₹/-</span>
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
                You can now contact the owner to pick the product using contact
                details
              </p>

              <Button1
                type="button"
                variant="filled"
                color="orange"
                size="md"
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
  );
};

export default RequestsPage;

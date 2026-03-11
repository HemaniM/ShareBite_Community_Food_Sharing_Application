import React, { useMemo, useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button1 from "../../components/ui/Button1";
import DropdownField from "../../components/ui/DropdownField";
import { Icon } from "../../components/Icons/Icons";

const requestsByPost = {
  1: [
    {
      id: "R32F7Y463",
      requesterName: "Ananya Mishra",
      requestedAgo: "Requested 10 mins ago",
      product: "Pav Bhaji",
      quantity: "2 Plates",
      address: "Bhayander (E), Newyork Road, Sakhar Nagar",
      contactNumber: "+91 67778 56443",
      contactEmail: "ananyamishra112@gmail.com",
      avatar: "/images/Ananya_Mishra.jpg",
      dayLabel: "Today",
      status: "Pending",
    },
    {
      id: "R63J2F1A2",
      requesterName: "Harsh Maurya",
      requestedAgo: "Requested 15 mins ago",
      product: "Pav Bhaji",
      quantity: "1 Plate",
      address: "Bhayander (E), Newyork Road, Geeta Nagar",
      contactNumber: "+91 67899 58663",
      contactEmail: "harshmaurya23@gmail.com",
      avatar: "/images/log5.jpg",
      dayLabel: "Today",
      status: "Pending",
    },
    {
      id: "R31Y9H453",
      requesterName: "Aman Shahu",
      requestedAgo: "Requested 1 hour ago",
      product: "Pav Bhaji",
      quantity: "2 Plates",
      address: "Bhayander (W), 150 Feet Road, Shree Balaji Nagar",
      contactNumber: "+91 87718 51493",
      contactEmail: "amanshahu789@gmail.com",
      avatar: "/images/Aarav_Shah.jpg",
      dayLabel: "Today",
      status: "Accepted",
    },
  ],
};

const dropdownOptions = ["ALL", "Pending", "Accepted"];

const FoodPostRequestsPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const dropdownRef = useRef(null);

  const pageTitle = location.state?.postTitle || "FOOD POST";
  const requests = requestsByPost[postId] || [];

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const filteredRequests = useMemo(() => {
    if (statusFilter === "ALL") {
      return requests;
    }

    return requests.filter((request) => request.status === statusFilter);
  }, [requests, statusFilter]);

  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
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

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <article
            key={request.id}
            className="rounded-[8px] border border-[var(--white-600)] bg-white py-[22px] px-[24px]"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="flex flex-col gap-[15px]">
                <div className="flex items-center gap-[20px]">
                  <img
                    src={request.avatar}
                    alt={request.requesterName}
                    className="h-[50px] w-[50px] rounded-full object-cover"
                  />
                  <div className="">
                    <h3 className="text-[16px] font-bold text-[var(--text-grey-5)] mb-[8px]">
                      {request.requesterName}
                    </h3>
                    <p className="text-[10px] text-[var(--text-grey-3)]">
                      {request.requestedAgo}
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
                        {request.product}
                      </p>
                      <p>
                        <span className="mr-[12px] font-semibold text-[#2f2e2b]">
                          Request ID
                        </span>
                        {request.id}
                      </p>
                      <p>
                        <span className="mr-[25px] font-semibold text-[#2f2e2b]">
                          Quantity
                        </span>
                        {request.quantity}
                      </p>
                      <p className="md:col-span-2">
                        <span className="mr-[45px] font-semibold text-[#2f2e2b]">
                          From
                        </span>
                        {request.address}
                      </p>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <p className="font-semibold text-[#2f2e2b]">Contacts</p>
                      <p>{request.contactNumber}</p>
                      <p>{request.contactEmail}</p>
                    </div>
                  </div>

                  <div className="mt-[15px] flex items-center gap-[15px]">
                    <Button1
                      type="button"
                      variant="filled"
                      color="green"
                      size="sm"
                      className="rounded-[8px] px-[18px] py-[10px] text-[12px] font-semibold"
                    >
                      ACCEPT REQUEST
                    </Button1>

                    <Button1
                      type="button"
                      variant="outline"
                      color="orange"
                      size="sm"
                      className="rounded-[8px] px-[18px] py-[9px] text-[12px] font-semibold"
                    >
                      DECLINE
                    </Button1>
                  </div>
                </div>
              </div>

              <p className="text-[14px] text-[var(--text-grey-5)] mt-3 font-medium">
                {request.dayLabel}
              </p>
            </div>
          </article>
        ))}

        {filteredRequests.length === 0 && (
          <div className="rounded-[8px] border border-dashed border-[var(--white-600)] px-6 py-10 text-center text-[14px] text-[var(--text-grey-4)]">
            No requests found for the selected filter.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-start">
        <Button1
          type="button"
          variant="outline"
          color="green"
          size="md"
          className="group text-[16px] rounded-[10px] font-semibold px-[18px] py-[12px] leading-tight"
        >
          <Icon
            name="right_arrow_green"
            className="rotate-180 mr-[15px] group-hover:hidden"
          />
          <Icon
            name="right_arrow"
            className="hidden group-hover:block rotate-180 mr-[15px]"
          />
          View post details
        </Button1>
      </div>
    </section>
  );
};

export default FoodPostRequestsPage;

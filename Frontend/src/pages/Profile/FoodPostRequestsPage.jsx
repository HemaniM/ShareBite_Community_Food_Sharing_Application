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
            iconName = "arrow_down_white"
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
              <div className="flex gap-4">
                <img
                  src={request.avatar}
                  alt={request.requesterName}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />

                <div className="text-[12px] leading-[19px] text-[var(--text-grey-4)]">
                  <h3 className="text-[14px] font-bold text-[#31302b]">
                    {request.requesterName}
                  </h3>
                  <p className="text-[10px] text-[#9b9a95]">{request.requestedAgo}</p>

                  <div className="mt-[10px] grid md:grid-cols-2 gap-x-[80px] gap-y-[2px]">
                    <p>
                      <span className="mr-[24px] font-semibold text-[#2f2e2b]">Product</span>
                      {request.product}
                    </p>
                    <p className="font-semibold text-[#2f2e2b]">Contacts</p>

                    <p>
                      <span className="mr-[10px] font-semibold text-[#2f2e2b]">Request ID</span>
                      {request.id}
                    </p>
                    <p>{request.contactNumber}</p>

                    <p>
                      <span className="mr-[20px] font-semibold text-[#2f2e2b]">Quantity</span>
                      {request.quantity}
                    </p>
                    <p>{request.contactEmail}</p>

                    <p className="md:col-span-2">
                      <span className="mr-[36px] font-semibold text-[#2f2e2b]">From</span>
                      {request.address}
                    </p>
                  </div>

                  <div className="mt-[14px] flex items-center gap-[12px]">
                    <Button1
                      type="button"
                      variant="filled"
                      color="green"
                      size="sm"
                      className="rounded-[8px] px-[16px] py-[9px] text-[11px] font-semibold"
                    >
                      ACCEPT REQUEST
                    </Button1>

                    <Button1
                      type="button"
                      variant="outline"
                      color="orange"
                      size="sm"
                      className="rounded-[8px] px-[16px] py-[9px] text-[11px] font-semibold"
                    >
                      DECLINE
                    </Button1>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[var(--text-grey-5)]">{request.dayLabel}</p>
            </div>
          </article>
        ))}

        {filteredRequests.length === 0 && (
          <div className="rounded-[8px] border border-dashed border-[var(--white-600)] px-6 py-10 text-center text-[14px] text-[var(--text-grey-4)]">
            No requests found for the selected filter.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button1
          type="button"
          variant="outline"
          color="green"
          size="sm"
          className="rounded-[10px] px-[16px] py-[10px]"
        >
          View post details
          <Icon name="right_arrow_green" />
        </Button1>
      </div>
    </section>
  );
};

export default FoodPostRequestsPage;
import React from "react";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";

const TrustedDonorsSection = () => {
  const donorItems = [
    {
      id: 1,
      donor: "Anuj Shah",
      title: "Badami Paneer",
      price: "50 ₹",
      image: "/images/Badami_Paneer.jpg",
      classes: "md:col-span-3 md:row-span-2",
    },
    {
      id: 2,
      donor: "Harsh Mishra",
      title: "Nonveg Thali",
      price: "80 ₹",
      image: "/images/Nonveg_thali.jpg",
      classes: "md:col-span-3 md:row-span-1",
    },
    {
      id: 3,
      donor: "Nisha Jha",
      title: "Spaghetti",
      price: "60 ₹",
      image: "/images/Spaghetti.jpg",
      classes: "md:col-span-6 md:row-span-1",
    },
    {
      id: 4,
      donor: "Rahul Sharma",
      title: "Dry Fruit Mix",
      price: "80 ₹",
      image: "/images/Dry_fruits_mix.jpg",
      classes: "md:col-span-3 md:row-span-1",
    },
    {
      id: 5,
      donor: "Priya Patel",
      title: "Mango Milkshake",
      price: "40 ₹",
      image: "/images/Mango_milkshake.jpg",
      classes: "md:col-span-3 md:row-span-1",
    },
    {
      id: 6,
      donor: "Sneha Gupta",
      title: "Dal Tadaka",
      price: "Free",
      image: "/images/Dal_Tadka.jpg",
      classes: "md:col-span-3 md:row-span-1",
    },
    {
      id: 7,
      donor: "Rajesh Kumar",
      title: "Kadi Rice",
      price: "40 ₹",
      image: "/images/Kadhi_Chawal.jpg",
      classes: "md:col-span-4 md:row-span-1",
    },
    {
      id: 8,
      donor: "Manish Mehta",
      title: "Chakali",
      price: "20 ₹",
      image: "/images/Chakali.jpg",
      classes: "md:col-span-4 md:row-span-1",
    },
    {
      id: 9,
      donor: "Ramesh Verma",
      title: "Pav Bhaji",
      price: "Free",
      image: "/images/Pav_Bhaji.jpg",
      classes: "md:col-span-4 md:row-span-1",
    },
    {
      id: 10,
      donor: "Sunita Sharma",
      title: "Nonveg Biryani",
      price: "100 ₹",
      image: "/images/Nonveg_biryani.jpg",
      classes: "md:col-span-3 md:row-span-2",
    },
    {
      id: 11,
      donor: "Kavita Mehta",
      title: "Salad",
      price: "30 ₹",
      image: "/images/Salad.jpg",
      classes: "md:col-span-3 md:row-span-2",
    },
    {
      id: 12,
      donor: "Roshan Kumar",
      title: "Tandoori Paneer",
      price: "60 ₹",
      image: "/images/Tandoori_Paneer.jpg",
      classes: "md:col-span-3 md:row-span-2",
    },
    {
      id: 13,
      donor: "Anjali Singh",
      title: "Onion Pakoda",
      price: "55 ₹",
      image: "/images/Onion_Pakoda.jpg",
      classes: "md:col-span-3 md:row-span-2",
    },
  ];

  // const getItemClasses = (type) => {
  //   switch (type) {
  //     case "large":
  //       return "col-span-2 md:col-span-1 row-span-2 h-[300px] md:h-[400px]";
  //     case "wide":
  //       return "col-span-2 h-[150px] md:h-[190px]";
  //     case "medium":
  //       return "col-span-1 h-[150px] md:h-[190px]";
  //     case "small":
  //       return "col-span-1 h-[150px] md:h-[190px]";
  //     default:
  //       return "col-span-1 h-[150px] md:h-[190px]";
  //   }
  // };

  return (
    <section className="w-full py-[60px] lg:py-[60px]">
      <div className="mx-auto w-full max-w-[975px]">
        <div className="flex flex-col gap-[50px]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase tracking-wide text-black sm:text-xl lg:text-[22px]">
              From Most Trusted Donors
            </h2>

            {/* View More Button */}
            <Button1
              variant="filled"
              color="green"
              size="sm"
              className="w-[47px] h-[30px] lg:w-[47px] lg:h-[30px] rounded-[10px]"
            >
              <Icon name="right_arrow" />
            </Button1>
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-[20px] sm:grid-cols-3 md:grid-cols-12 md:grid-rows-[180px_180px_200px_300px]">
            {donorItems.map((item) => (
              <article
                key={item.id}
                className={`group relative col-span-1 overflow-hidden rounded-[12px] shadow-sm ${item.classes}`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay Content */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /> */}

                {/* Bottom Content */}
                {item.donor && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/15 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {item.donor}
                  </span>
                )}

                {/* Add Button */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-black/15 p-3 px-4 backdrop-blur-[2px]">
                  <div>
                    <h3 className="text-xs mb-1 font-semibold text-white sm:text-sm">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-semibold sm:text-xs text-[var(--primary-orange-100)]">
                      {item.price}
                    </p>
                  </div>

                  {/* <button
                    type="button"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#efa13d] transition-opacity hover:opacity-90"
                    aria-label={`Add ${item.title}`}
                  >
                    <img
                      src="/images/img_frame_37.svg"
                      alt="Add"
                      className="h-4 w-4 object-contain"
                    />
                  </button> */}
                  <Icon name="cart_small" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedDonorsSection;

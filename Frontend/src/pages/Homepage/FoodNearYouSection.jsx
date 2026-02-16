import React from "react";
import Button from "../../components/ui/Button";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";

const FoodNearYouSection = () => {
  const foodItems = [
    {
      id: 1,
      image: "/images/img_morning_breakfast.png",
      location: "BHAYANDER",
      title: "Poha",
      price: "20 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 2,
      image: "/images/img_download_19.png",
      location: "BHAYANDER",
      title: "Nibu Soda",
      price: "Free",
      priceColor: "#7d8d2a",
    },
    {
      id: 3,
      image: "/images/img_download_27.png",
      location: "BHAYANDER",
      title: "Sandwitch",
      price: "30 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 4,
      image: "/images/img_easy_raising_cane_s.png",
      location: "BHAYANDER",
      title: "Samose",
      price: "25 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 5,
      image: "/images/img_2b1c3930_d78f_4.png",
      location: "BHAYANDER",
      title: "Lunch Box",
      price: "40 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 6,
      image: "/images/img_chicken_kathi_roll.png",
      location: "BHAYANDER",
      title: "Kathi Roll",
      price: "55 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 7,
      image: "/images/img_premium_nuts_and.png",
      location: "BHAYANDER",
      title: "Dry Fruits Pack",
      price: "100 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 8,
      image: "/images/img_5_irresistible_fat_burning.png",
      location: "BHAYANDER",
      title: "Watermelon Juice",
      price: "Free",
      priceColor: "#7d8d2a",
    },
  ];

  return (
    <section className="w-full py-[60px] bg-[#f9f7f8]">
      <div className="w-full max-w-[975px] mx-auto">
        <div className="flex flex-col gap-[50px] items-center">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-4 sm:mb-0">
              fOOD nEAR YOU
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {foodItems?.map((item) => (
              <div
                key={item?.id}
                className="flex flex-col gap-1.5 lg:gap-[6px] items-center cursor-pointer group"
              >
                {/* Food Image with Add Button */}
                <div className="relative w-full h-[200px] lg:h-[270px] rounded-[10px] overflow-hidden">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Add Button */}
                  <div className="absolute top-3 right-3 lg:top-[12px] lg:right-[10px] hover:opacity-80 transition-opacity">
                    <Icon name="cart_small" />
                  </div>
                </div>

                {/* Food Details */}
                <div className="flex flex-col gap-0.5 lg:gap-[2px] items-center w-full">
                  {/* Location */}
                  <span className="text-[8px] font-normal leading-[11px] text-left text-[#6b6961] font-['Nunito']">
                    {item?.location}
                  </span>

                  {/* Title and Price Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-2 sm:gap-0">
                    <div className="flex flex-col items-center sm:items-start">
                      <h3 className="text-sm font-semibold leading-5 text-left text-black font-['Nunito']">
                        {item?.title}
                      </h3>
                      <p
                        className="text-[13px] font-semibold leading-[18px] text-left font-['Nunito']"
                        style={{ color: item?.priceColor }}
                      >
                        {item?.price}
                      </p>
                    </div>

                    {/* Request Button */}
                    <Button1
                      variant="filled"
                      color="green"
                      size="sm"
                      className="py-[9px] "
                    >
                      REQUEST
                    </Button1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodNearYouSection;

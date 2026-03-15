import React from "react";
import ProductCard from "../../components/common/ProductCard";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";

const FoodNearYouSection = ({ onProductClick, onViewMoreClick }) => {
  const foodItems = [
    {
      id: 1,
      image: "/images/Poha.jpg",
      location: "BHAYANDER",
      title: "Poha",
      price: 20,
      priceColor: "#d99338",
    },
    {
      id: 2,
      image: "/images/Nibu_Soda.jpg",
      location: "BHAYANDER",
      title: "Nibu Soda",
      price: 0,
      priceColor: "#7d8d2a",
    },
    {
      id: 3,
      image: "/images/Sandwitch.jpg",
      location: "BHAYANDER",
      title: "Sandwitch",
      price: 30,
      priceColor: "#d99338",
    },
    {
      id: 4,
      image: "/images/Samose.jpg",
      location: "BHAYANDER",
      title: "Samose",
      price: 25,
      priceColor: "#d99338",
    },
    {
      id: 5,
      image: "/images/Lunch_Box.jpg",
      location: "BHAYANDER",
      title: "Lunch Box",
      price: 40,
      priceColor: "#d99338",
    },
    {
      id: 6,
      image: "/images/Kathi_Roll.jpg",
      location: "BHAYANDER",
      title: "Kathi Roll",
      price: 55,
      priceColor: "#d99338",
    },
    {
      id: 7,
      image: "/images/Dry_Fruits_Pack.jpg",
      location: "BHAYANDER",
      title: "Dry Fruits Pack",
      price: 100,
      priceColor: "#d99338",
    },
    {
      id: 8,
      image: "/images/Watermelon_Juice.jpg",
      location: "BHAYANDER",
      title: "Watermelon Juice",
      price: 0,
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
              FOOD NEAR YOU
            </h2>

            {/* View More Button */}
            <Button1
              variant="filled"
              color="green"
              size="sm"
              onClick={onViewMoreClick}
              className="w-[47px] h-[30px] lg:w-[47px] lg:h-[30px] rounded-[10px]"
            >
              <Icon name="right_arrow" />
            </Button1>
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {foodItems?.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                priceColor={product?.priceColor}
                onProductClick={() => onProductClick?.(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodNearYouSection;

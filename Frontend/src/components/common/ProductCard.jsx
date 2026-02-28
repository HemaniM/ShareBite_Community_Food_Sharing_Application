import React from "react";
import Button1 from "../ui/Button1";
import { Icon } from "../Icons/Icons";

const ProductCard = ({
  image,
  location,
  title,
  price,
  priceColor = "#d99338",
  requestLabel = "REQUEST",
  onRequest,
  onCardClick,
}) => {
  return (
    <div
      className="flex flex-col gap-1.5 lg:gap-[6px] items-center cursor-pointer group"
      onClick={onCardClick}
    >
      <div className="relative w-full h-[200px] lg:h-[270px] rounded-[10px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute top-3 right-3 lg:top-[12px] lg:right-[10px] hover:opacity-80 transition-opacity">
          <Icon name="cart_small" />
        </div>
      </div>

      <div className="flex flex-col gap-0.5 lg:gap-[2px] items-center w-full">
        <span className="text-[8px] font-normal leading-[11px] text-left text-[#6b6961] font-['Nunito']">
          {location}
        </span>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-2 sm:gap-0">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-sm font-semibold leading-5 text-left text-black font-['Nunito']">
              {title}
            </h3>
            <p
              className="text-[13px] font-semibold leading-[18px] text-left font-['Nunito']"
              style={{ color: priceColor }}
            >
              {price}
            </p>
          </div>

          <Button1
            variant="filled"
            color="green"
            size="sm"
            className="py-[9px]"
            onClick={(event) => {
              event.stopPropagation();
              onRequest?.();
            }}
          >
            {requestLabel}
          </Button1>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

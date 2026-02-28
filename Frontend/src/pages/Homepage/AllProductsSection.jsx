import React from "react";
import Button from "../../components/ui/Button";
import ProductCard from "../../components/common/ProductCard";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";

const AllProductsSection = () => {
  const allProducts = [
    {
      id: 1,
      image: "/images/Lunch_Box_1.jpg",
      location: "BHAYANDER",
      title: "Lunch Box",
      price: "40 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 2,
      image: "/images/Roti_Sabzi.jpg",
      location: "BHAYANDER WEST",
      title: "Roti Sabzi",
      price: "FREE",
      priceColor: "#7d8d2a",
    },
    {
      id: 3,
      image: "/images/Orange_Juice.jpg",
      location: "VASAI",
      title: "Orange Juice",
      price: "15 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 4,
      image: "/images/Kiwi.jpg",
      location: "MIRA ROAD",
      title: "kiwi",
      price: "50 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 5,
      image: "/images/Noodles.jpg",
      location: "BHAYANDER EAST",
      title: "Noodles",
      price: "30 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 6,
      image: "/images/Rice_1kg.jpg",
      location: "BHAYANDER",
      title: "Rice 1kg",
      price: "25 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 7,
      image: "/images/Rajama_Chawal.jpg",
      location: "MALAD",
      title: "Rajama Chaval",
      price: "FREE",
      priceColor: "#7d8d2a",
    },
    {
      id: 8,
      image: "/images/Carrot_Juice.jpg",
      location: "BORIVALI",
      title: "Carrot Juice",
      price: "10 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 9,
      image: "/images/Apple_Cider_Vinegar.jpg",
      location: "DAHISAR",
      title: "Apple Cider Vinegar",
      price: "80 ₹ /-",
      priceColor: "#d99338",
    },
    {
      id: 10,
      image: "/images/Ramen.jpg",
      location: "ANDHERI",
      title: "Ramen",
      price: "40 ₹ /-",
      priceColor: "#d99338",
    },
  ];

  return (
    <section className="w-full py-[60px] bg-[#fffaef]">
      <div className="w-full max-w-[975px] mx-auto">
        <div className="flex flex-col gap-[50px] items-center">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-4 sm:mb-0">
              All Products
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {allProducts?.map((product) => (
              <ProductCard
                key={product?.id}
                image={product?.image}
                location={product?.location}
                title={product?.title}
                price={product?.price}
                priceColor={product?.priceColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;

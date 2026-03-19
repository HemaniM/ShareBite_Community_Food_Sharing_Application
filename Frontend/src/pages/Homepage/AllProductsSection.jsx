import React from "react";
import ProductCard from "../../components/common/ProductCard";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";

const AllProductsSection = ({
  onProductClick,
  onViewMoreClick,
  products = [],
  loading = false,
  error = null,
}) => {
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
              onClick={onViewMoreClick}
              className="w-[47px] h-[30px] lg:w-[47px] lg:h-[30px] rounded-[10px]"
            >
              <Icon name="right_arrow" />
            </Button1>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="w-full rounded-[10px] border border-[#f2ebe5] bg-white px-6 py-8 text-center text-[#6b6961]">
              Loading available food posts...
            </div>
          ) : error ? (
            <div className="w-full rounded-[10px] border border-[#f4c7c3] bg-white px-6 py-8 text-center text-[#b45309]">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="w-full rounded-[10px] border border-[#f2ebe5] bg-white px-6 py-8 text-center text-[#6b6961]">
              No available food posts right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priceColor={product.priceColor}
                  onProductClick={() => onProductClick?.(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;

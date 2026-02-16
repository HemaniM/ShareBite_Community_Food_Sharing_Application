import React from 'react';
import Button from '../../components/ui/Button';
import Button1 from '../../components/ui/Button1';
import { Icon } from '../../components/Icons/Icons';

const AllProductsSection = () => {
  const allProducts = [
    {
      id: 1,
      image: '/images/img_take_out_poke_bowls.png',
      location: 'BHAYANDER',
      title: 'Lunch Box',
      price: '40 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 2,
      image: '/images/img_plant_based_everyday.png',
      location: 'BHAYANDER WEST',
      title: 'Roti Sabzi',
      price: 'FREE',
      priceColor: '#7d8d2a'
    },
    {
      id: 3,
      image: '/images/img_botella_de_jugo.png',
      location: 'VASAI',
      title: 'Orange Juice',
      price: '15 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 4,
      image: '/images/img_3_2.png',
      location: 'MIRA ROAD',
      title: 'kiwi',
      price: '50 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 5,
      image: '/images/img_chili_garlic_noodles.png',
      location: 'BHAYANDER EAST',
      title: 'Noodles',
      price: '30 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 6,
      image: '/images/img_download_29_1.png',
      location: 'BHAYANDER',
      title: 'Rice 1kg',
      price: '25 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 7,
      image: '/images/img_270x224.png',
      location: 'MALAD',
      title: 'Rajama Chaval',
      price: 'FREE',
      priceColor: '#7d8d2a'
    },
    {
      id: 8,
      image: '/images/img_summer_fruits.png',
      location: 'BORIVALI',
      title: 'Carrot Juice',
      price: '10 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 9,
      image: '/images/img_the_ultimate_costco.png',
      location: 'DAHISAR',
      title: 'Apple Cider Vinegar',
      price: '80 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 10,
      image: '/images/img_download_24.png',
      location: 'ANDHERI',
      title: 'Ramen',
      price: '40 ₹ /-',
      priceColor: '#d99338'
    }
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
              <div
                key={product?.id}
                className="flex flex-col gap-1 lg:gap-[4px] items-center cursor-pointer group"
              >
                {/* Product Image with Add Button */}
                <div className="relative w-full h-[200px] lg:h-[270px] rounded-[10px] overflow-hidden">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Add Button */}
                  <button className="absolute top-3 right-3 lg:top-[12px] lg:right-[10px] flex items-center justify-center w-6 h-6 lg:w-[26px] lg:h-[26px] rounded-[8px] bg-[#efa13d] shadow-[0px_4px_2px_#888888ff] hover:opacity-90 transition-opacity">
                    <img
                      src="/images/img_frame_37.svg"
                      alt="Add to cart"
                      className="w-4 h-4 lg:w-[18px] lg:h-[18px] object-contain"
                    />
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-0.5 lg:gap-[2px] items-center w-full">
                  {/* Location */}
                  <span className="text-[8px] lg:text-[10px] font-normal leading-[11px] lg:leading-[14px] text-left text-[#6b6961] font-['Nunito']">
                    {product?.location}
                  </span>

                  {/* Title and Price Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-2 sm:gap-0">
                    <div className="flex flex-col items-center sm:items-start">
                      <h3 className="text-sm font-semibold leading-5 text-left text-black font-['Nunito']">
                        {product?.title}
                      </h3>
                      <p
                        className="text-[13px] font-semibold leading-[18px] text-left font-['Nunito']"
                        style={{ color: product?.priceColor }}
                      >
                        {product?.price}
                      </p>
                    </div>

                    {/* Request Button */}
                    <Button
                      text="REQUEST"
                      className="px-2.5 py-2.5 lg:px-[10px] lg:py-[10px] rounded-[6px] text-[10px] font-semibold leading-[14px] text-center text-white bg-[#7d8d2a] font-['Nunito'] hover:opacity-90 transition-opacity"
                      border_border=""
                      text_text_transform=""
                      effect_box_shadow=""
                      layout_align_self=""
                      layout_width=""
                      padding=""
                      position=""
                      margin=""
                      layout_gap=""
                      variant=""
                      size=""
                      onClick={() => { }}
                    />
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

export default AllProductsSection;

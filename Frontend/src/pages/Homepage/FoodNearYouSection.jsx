import React from 'react';
import Button from '../../components/ui/Button';

const FoodNearYouSection = () => {
  const foodItems = [
    {
      id: 1,
      image: '/images/img_morning_breakfast.png',
      location: 'BHAYANDER',
      title: 'Poha',
      price: '20 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 2,
      image: '/images/img_download_19.png',
      location: 'BHAYANDER',
      title: 'Nibu Soda',
      price: 'Free',
      priceColor: '#7d8d2a'
    },
    {
      id: 3,
      image: '/images/img_download_27.png',
      location: 'BHAYANDER',
      title: 'Sandwitch',
      price: '30 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 4,
      image: '/images/img_easy_raising_cane_s.png',
      location: 'BHAYANDER',
      title: 'Samose',
      price: '25 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 5,
      image: '/images/img_2b1c3930_d78f_4.png',
      location: 'BHAYANDER',
      title: 'Lunch Box',
      price: '40 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 6,
      image: '/images/img_chicken_kathi_roll.png',
      location: 'BHAYANDER',
      title: 'Kathi Roll',
      price: '55 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 7,
      image: '/images/img_premium_nuts_and.png',
      location: 'BHAYANDER',
      title: 'Dry Fruits Pack',
      price: '100 ₹ /-',
      priceColor: '#d99338'
    },
    {
      id: 8,
      image: '/images/img_5_irresistible_fat_burning.png',
      location: 'BHAYANDER',
      title: 'Watermelon Juice',
      price: 'Free',
      priceColor: '#7d8d2a'
    }
  ];

  return (
    <section className="w-full py-8 lg:py-[74px] bg-[#f9f7f8]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:gap-[40px] items-center">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-4 sm:mb-0">
              fOOD nEAR YOU
            </h2>

            {/* View More Button */}
            <button className="flex items-center justify-center w-8 h-8 lg:w-[46px] lg:h-[46px] rounded-[10px] bg-[#7d8d2a] hover:opacity-90 transition-opacity">
              <img
                src="/images/img_vector_white_a700.svg"
                alt="View more"
                className="w-2 lg:w-[8px] h-3 lg:h-[14px] object-contain"
              />
            </button>
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
                  <button className="absolute top-3 right-3 lg:top-[12px] lg:right-[10px] flex items-center justify-center w-6 h-6 lg:w-[26px] lg:h-[26px] rounded-[8px] bg-[#efa13d] shadow-[0px_4px_2px_#888888ff] hover:opacity-90 transition-opacity">
                    <img
                      src="/images/img_frame_37.svg"
                      alt="Add to cart"
                      className="w-4 h-4 lg:w-[18px] lg:h-[18px] object-contain"
                    />
                  </button>
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
                    <Button
                      text="REQUEST"
                      className="px-2.5 py-2.5 lg:px-[10px] lg:py-[10px] rounded-[6px] text-[10px] font-semibold leading-[14px] text-center text-white bg-[#7d8d2a] font-['Nunito'] hover:opacity-90 transition-opacity"
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

export default FoodNearYouSection;

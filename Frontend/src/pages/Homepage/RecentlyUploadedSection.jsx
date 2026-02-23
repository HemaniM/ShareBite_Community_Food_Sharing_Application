import React, { useState } from 'react';
import Button1 from '../../components/ui/Button1';
import { Icon } from '../../components/Icons/Icons';

const RecentlyUploadedSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const recentItems = [
    {
      id: 1,
      image: '/images/Pan_Fry_Momos.jpg',
      timeAgo: '• 20s ago',
      title: 'Pan Fry Momos',
      price: '20 ₹ /-',
      priceColor: '#f2f4ea'
    },
    {
      id: 2,
      image: '/images/Idli_Sambar.jpg',
      timeAgo: '• 1m ago',
      title: 'Idali Sambar',
      price: '30 ₹ /-',
      priceColor: '#f2f4ea'
    },
    {
      id: 3,
      image: '/images/Pineapple_Juice.jpg',
      timeAgo: '• 6m ago',
      title: 'Pineapple Juice',
      price: 'Free',
      priceColor: '#f2f4ea'
    },
    {
      id: 4,
      image: '/images/Spring_Rolls.jpg',
      timeAgo: '• 6m ago',
      title: 'Spring Rolls',
      price: '15 ₹ /-',
      priceColor: '#f2f4ea'
    },
    {
      id: 5,
      image: '/images/Spring_Rolls.jpg',
      timeAgo: '• 6m ago',
      title: 'Spring Rolls',
      price: '15 ₹ /-',
      priceColor: '#f2f4ea'
    },
    {
      id: 6,
      image: '/images/Spring_Rolls.jpg',
      timeAgo: '• 6m ago',
      title: 'Spring Rolls',
      price: '15 ₹ /-',
      priceColor: '#f2f4ea'
    }
  ];

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(1, prev + 1));
  };

  return (
    <section className="w-full py-[60px]">
      <div className="w-full max-w-[975px] mx-auto">
        <div className="flex flex-col gap-[50px] items-center">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-4 sm:mb-0">
              Recently Uploaded
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

          {/* Recent Items */}
          <div className="flex flex-col gap-4 lg:gap-5 w-full">
            {/* Items Row */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-[18px] overflow-x-auto pb-2">
              {recentItems?.map((item) => (
                <div
                  key={item?.id}
                  className="relative flex-shrink-0 w-full sm:w-[230px] h-[200px] lg:h-[276px] rounded-[14px] overflow-hidden group cursor-pointer"
                >
                  {/* Background Image */}
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    {/* Time Badge */}
                    <div className="absolute top-2 lg:top-[8px] left-3 lg:left-[12px]">
                      <span className="px-[8px] py-1 rounded-[10px] bg-[#59595726] backdrop-blur-sm text-[10px] font-semibold leading-[14px] text-left capitalize text-white font-['Nunito']">
                        {item?.timeAgo}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-[#59595726] backdrop-blur-sm rounded-b-[14px] shadow-[0px_4px_4px_#888888ff]">
                      <div className="flex items-center justify-between px-2 lg:px-[6px]">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xs lg:text-[14px] font-semibold leading-4 lg:leading-5 text-left capitalize text-white font-['Nunito']">
                            {item?.title}
                          </h3>
                          <p
                            className="text-[11px] font-semibold leading-4 text-left capitalize font-['Nunito']"
                            style={{ color: item?.priceColor }}
                          >
                            {item?.price}
                          </p>
                        </div>

                        {/* Add Button */}
                        <Icon name="cart_small" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 lg:gap-[14px]">
              <button
                onClick={handlePrevious}
                className="flex items-center justify-center w-8 h-8 lg:w-[34px] lg:h-[34px] rounded-[16px] bg-[#f8d4a6] hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={currentPage === 0}
              >
                <Icon name="left_arrow_slider" />
              </button>

              <button
                onClick={handleNext}
                className="flex items-center justify-center w-8 h-8 lg:w-[34px] lg:h-[34px] rounded-[16px] bg-[#efa13d] hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={currentPage === 1}
              >
                <Icon name="right_arrow_slider" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyUploadedSection;


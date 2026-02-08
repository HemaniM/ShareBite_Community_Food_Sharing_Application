import React, { useState } from 'react';

const RecentlyUploadedSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const recentItems = [
    {
      id: 1,
      image: '/images/img_pan_fried_gyoza.png',
      timeAgo: '• 20s ago',
      title: 'Pan Fry Momos',
      price: '20 ₹ /-',
      priceColor: '#f2f4ea'
    },
    {
      id: 2,
      image: '/images/img_idli_sambar.png',
      timeAgo: '• 1m ago',
      title: 'Idali Sambar',
      price: '30 ₹ /-',
      priceColor: '#f2f4ea'
    },
    {
      id: 3,
      image: '/images/img_download_28.png',
      timeAgo: '• 6m ago',
      title: 'Pineapple Juice',
      price: 'Free',
      priceColor: '#f2f4ea'
    },
    {
      id: 4,
      image: '/images/img_download_26.png',
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
    <section className="w-full py-8 lg:py-[56px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:gap-[40px] items-center">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-4 sm:mb-0">
              Recently Uploaded
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
                      <span className="px-1 lg:px-[4px] py-1 lg:py-[4px] rounded-[10px] bg-[#59595726] backdrop-blur-sm text-[10px] font-semibold leading-[14px] text-left capitalize text-white font-['Nunito'] shadow-[0px_4px_4px_#888888ff]">
                        {item?.timeAgo}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-1 lg:p-[4px] bg-[#59595726] backdrop-blur-sm rounded-b-[14px] shadow-[0px_4px_4px_#888888ff]">
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
                        <button className="flex items-center justify-center w-6 h-6 lg:w-[30px] lg:h-[30px] rounded-[8px] bg-[#efa13d] shadow-[0px_4px_2px_#888888ff] hover:opacity-90 transition-opacity">
                          <img
                            src="/images/img_frame_37.svg"
                            alt="Add to cart"
                            className="w-4 h-4 lg:w-[20px] lg:h-[20px] object-contain"
                          />
                        </button>
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
                <img
                  src="/images/img_vector_white_a700_34x34.svg"
                  alt="Previous"
                  className="w-4 h-4 lg:w-[20px] lg:h-[20px] object-contain rotate-180"
                />
              </button>

              <button
                onClick={handleNext}
                className="flex items-center justify-center w-8 h-8 lg:w-[34px] lg:h-[34px] rounded-[16px] bg-[#efa13d] hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={currentPage === 1}
              >
                <img
                  src="/images/img_vector_34x34.svg"
                  alt="Next"
                  className="w-4 h-4 lg:w-[20px] lg:h-[20px] object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyUploadedSection;


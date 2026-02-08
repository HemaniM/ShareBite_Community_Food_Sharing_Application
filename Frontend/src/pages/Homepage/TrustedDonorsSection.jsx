import React from 'react';
import Button from '../../components/ui/Button';

const TrustedDonorsSection = () => {
  const donorItems = [
    {
      id: 1,
      image: '/images/img_badami_paneer_paneer.png',
      donor: 'Anuj Shah',
      title: 'Badami Paneer',
      price: '50 ₹',
      priceColor: '#fae2c3',
      type: 'large'
    },
    {
      id: 2,
      image: '/images/img_indian_meal.png',
      title: 'Nonveg Thali',
      price: '80 ₹',
      type: 'medium'
    },
    {
      id: 3,
      image: '/images/img_download_18_1.png',
      donor: 'Nisha Jha',
      title: 'Spaghetti',
      price: '60 ₹',
      type: 'wide'
    },
    {
      id: 4,
      image: '/images/img_produktfotografie.png',
      title: 'Nonveg Thali',
      price: '80 ₹',
      type: 'medium'
    },
    {
      id: 5,
      image: '/images/img_mango_lassi_pepper.png',
      title: 'Mango Milkshake',
      price: '40 ₹',
      type: 'small'
    },
    {
      id: 6,
      image: '/images/img_moong_dal_tadka.png',
      title: 'Dal Tadaka',
      price: 'Free',
      priceColor: '#f2f4ea',
      type: 'small'
    }
  ];

  const getItemClasses = (type) => {
    switch (type) {
      case 'large':
        return 'col-span-2 md:col-span-1 row-span-2 h-[300px] md:h-[400px]';
      case 'wide':
        return 'col-span-2 h-[150px] md:h-[190px]';
      case 'medium':
        return 'col-span-1 h-[150px] md:h-[190px]';
      case 'small':
        return 'col-span-1 h-[150px] md:h-[190px]';
      default:
        return 'col-span-1 h-[150px] md:h-[190px]';
    }
  };

  return (
    <section className="w-full py-8 lg:py-[96px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:gap-[40px] items-center">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-4 sm:mb-0">
              From Most Trusted Donors
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 w-full">
            {donorItems?.map((item) => (
              <div
                key={item?.id}
                className={`relative rounded-[10px] overflow-hidden group cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-300 ${getItemClasses(item?.type)}`}
              >
                {/* Background Image */}
                <img
                  src={item?.image}
                  alt={item?.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  {/* Donor Badge (if exists) */}
                  {item?.donor && (
                    <div className="absolute top-3 lg:top-[22px] left-3 lg:left-[18px]">
                      <span className="px-2 lg:px-[10px] py-1 lg:py-[4px] rounded-[10px] bg-[#ffffff1e] backdrop-blur-sm text-[10px] font-bold leading-[14px] text-left text-white font-['Nunito'] shadow-[0px_4px_4px_#888888ff]">
                        {item?.donor}
                      </span>
                    </div>
                  )}

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-[8px] bg-[#ffffff26] backdrop-blur-sm rounded-b-[10px]">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xs lg:text-[14px] font-bold leading-4 lg:leading-5 text-left text-white font-['Nunito']">
                          {item?.title}
                        </h3>
                        <p className="text-xs lg:text-[14px] font-bold leading-4 lg:leading-5 text-left text-white font-['Nunito']">
                          <span style={{ color: item?.priceColor || '#ffffff' }}>
                            {item?.price}
                          </span>
                        </p>
                      </div>

                      {/* Add Button */}
                      <button className="flex items-center justify-center w-7 h-7 lg:w-[34px] lg:h-[34px] rounded-[10px] bg-[#efa13d] hover:opacity-90 transition-opacity">
                        <img
                          src="/images/img_frame_37.svg"
                          alt="Add to cart"
                          className="w-5 h-5 lg:w-[24px] lg:h-[24px] object-contain"
                        />
                      </button>
                    </div>
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

export default TrustedDonorsSection;
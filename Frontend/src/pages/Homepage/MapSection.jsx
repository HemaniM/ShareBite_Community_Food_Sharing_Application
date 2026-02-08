import React from 'react';
import Button from '../../components/ui/Button';

const MapSection = () => {
  return (
    <section className="w-full py-8 lg:py-[56px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:gap-[40px] items-start">
          {/* Section Title */}
          <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito']">
            Find Food Near You
          </h2>

          {/* Content Row */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[30px] items-start w-full">
            {/* Map Image */}
            <div className="w-full lg:w-[48%]">
              <img
                src="/images/img_image_11.png"
                alt="Food location map"
                className="w-full h-[200px] lg:h-[250px] object-cover rounded-[20px]"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="w-full lg:flex-1 flex flex-col gap-6 lg:gap-[40px] items-start">
              {/* Text Content */}
              <div className="flex flex-col gap-4 lg:gap-[30px] items-center lg:items-start w-full lg:w-[86%]">
                {/* Heading */}
                <h3 className="text-lg lg:text-[20px] font-semibold leading-6 lg:leading-[30px] text-left uppercase text-[#4f2819] font-['Nunito'] w-full">
                  Good food could be just around the corner
                </h3>

                {/* Description */}
                <p className="text-sm font-normal leading-5 lg:leading-[21px] text-left text-[#40403e] font-['Lato'] w-full">
                  Whether you are looking to donate or receive food, we make it easy to connect with your community. Explore nearby food options, check details, and request what you need in just a few steps.
                </p>
              </div>

              {/* Action Button */}
              <Button
                text="Search on Map"
                className="px-6 lg:px-[30px] py-2.5 lg:py-[10px] rounded-[10px] text-sm font-semibold leading-5 text-center uppercase text-white bg-[#efa13d] font-['Nunito'] hover:opacity-90 transition-opacity"
                border_border=""
                text_text_transform="uppercase"
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
      </div>
    </section>
  );
};

export default MapSection;

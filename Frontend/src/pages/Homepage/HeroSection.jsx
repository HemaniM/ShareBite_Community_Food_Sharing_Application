import React from 'react';
import Button from '../../components/ui/Button';
import { Icon } from '../../components/Icons/Icons';
import NavBarHomepage from '../../components/common/NavBarHomepage';



const HeroSection = () => {
  return (
    <section className="w-full min-h-[696px] bg-[url('../../public/images/hero_background.jpg'),linear-gradient(90deg,#f9f7f8_0%,#f0eeef_50%,#f3f1f2_100%)] bg-no-repeat bg-top relative">
      {/* Navigation Bar */}
      <NavBarHomepage />

      {/* Hero Content */}
      <div className="w-full relative">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[200px] md:w-[262px] h-full hidden lg:block"></div>

        <div className="w-full max-w-[1100px] mx-auto relative">
          <div className="flex flex-col lg:flex-row justify-between py-8 lg:py-0 min-h-[500px] max-h-[696px]">
            {/* Left Content */}
            <div className="w-full pt-[80px] lg:w-[53%] flex flex-col gap-6 lg:gap-[32px] items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
              <div className="flex flex-col gap-4 lg:gap-0 items-center lg:items-start w-full">
                {/* Tagline */}
                <h2 className="text-[20px] lg:text-[28px] font-bold leading-[28px] lg:leading-[39px] text-left uppercase text-[#7d8d2a] font-['Nunito Sans'] mb-2 lg:mb-4">
                  Got leftovers ?
                </h2>

                {/* Main Heading */}
                <h3 className="text-[28px] sm:text-[35px] lg:text-[50px] font-bold leading-[35px] sm:leading-[50px] lg:leading-[68px] tracking-[1px] text-left text-[#080403] font-['Nunito'] mb-4 lg:mb-8 max-w-full lg:max-w-[600px]">
                  Why waste when you can share
                </h3>

                {/* Description */}
                <p className="text-[16px] lg:text-[18px] font-medium leading-[22px] lg:leading-[24px] text-left text-[#595957] font-['Nunito Sans'] max-w-full lg:max-w-[94%]">
                  Connect with your community, share surplus food, and help reduce waste while making a difference.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-[32px] w-full lg:w-auto">
                <Button
                  text="GET STARTED"
                  className="w-full sm:w-auto px-6 py-2.5 lg:px-[24px] lg:py-[10px] rounded-[14px] text-base font-bold leading-[22px] text-center text-white bg-[#efa13d] font-['Nunito'] hover:opacity-90 transition-opacity"
                />

                <Button
                  text="LEARN MORE"
                  className="w-full sm:w-auto px-6 py-2.5 lg:px-[26px] lg:py-[10px] rounded-[14px] text-base font-bold leading-[22px] text-center text-[#d99338] bg-transparent border-2 border-[#d99338] font-['Nunito'] hover:bg-[#d99338] hover:text-white transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

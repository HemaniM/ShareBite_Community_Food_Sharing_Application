import React, { useState } from 'react';
import EditText from '../../components/ui/EditText';
import Button from '../../components/ui/Button';

const SearchSection = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    // Handle search functionality
    console.log('Search:', { location, category, budget });
  };

  return (
    <section className="w-full relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-8 lg:-mt-[62px] z-10">
          <div className="bg-white rounded-[5px] shadow-[0px_4px_25px_#00000019] p-4 lg:p-[22px_56px_22px_74px]">
            {/* Section Title */}
            <h2 className="text-base font-semibold leading-[22px] text-left text-black font-['Nunito'] mb-4 lg:mb-[24px]">
              Find Food Nearby
            </h2>

            {/* Search Form */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 w-full">
              {/* Location Input */}
              <div className="w-full lg:w-[20%] relative">
                <EditText
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e?.target?.value)}
                  className="w-full px-3 lg:px-[14px] py-2 lg:py-[10px] pr-10 lg:pr-[28px] rounded-[10px] border-2 border-[#f2ebe5] bg-white text-[15px] font-semibold leading-[21px] text-left text-[#595957] font-['Nunito'] focus:border-[#efa13d] focus:outline-none"
                />
                <img
                  src="/images/img_vector.svg"
                  alt="Location icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[14px] h-[16px] object-contain"
                />
              </div>

              {/* Category Input */}
              <div className="w-full lg:w-[20%] relative">
                <EditText
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e?.target?.value)}
                  className="w-full px-3 lg:px-[14px] py-2 lg:py-[10px] pr-10 lg:pr-[32px] rounded-[10px] border-2 border-[#f2ebe5] bg-white text-[15px] font-semibold leading-[21px] text-left text-[#595957] font-['Nunito'] focus:border-[#efa13d] focus:outline-none"
                />
                <img
                  src="/images/img_vector_blue_gray_400.svg"
                  alt="Category icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[16px] object-contain"
                />
              </div>

              {/* Budget Input */}
              <div className="w-full lg:w-[20%] relative">
                <EditText
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(e?.target?.value)}
                  className="w-full px-3 lg:px-[14px] py-2 lg:py-[10px] pr-10 lg:pr-[32px] rounded-[10px] border-2 border-[#f2ebe5] bg-white text-[15px] font-semibold leading-[21px] text-left text-[#595957] font-['Nunito'] focus:border-[#efa13d] focus:outline-none"
                />
                <img
                  src="/images/img_vector_blue_gray_400_16x18.svg"
                  alt="Budget icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[16px] object-contain"
                />
              </div>

              {/* Search Button */}
              <div className="w-full lg:w-[16%]">
                <Button
                  text="SEARCH"
                  onClick={handleSearch}
                  className="w-full px-2 lg:px-[10px] py-2 lg:py-[10px] rounded-[10px] text-sm font-semibold leading-5 text-center text-white bg-[#7d8d2a] font-['Nunito'] hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;

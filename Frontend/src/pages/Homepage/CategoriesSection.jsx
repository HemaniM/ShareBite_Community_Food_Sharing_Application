import React from 'react';

const CategoriesSection = () => {
  const categories = [
    { id: 1, name: 'Groceries', image: '/images/img_download_21.png' },
    { id: 2, name: 'Vegetable', image: '/images/img_download_ai_generated.png' },
    { id: 3, name: 'Fruits', image: '/images/img_.png' },
    { id: 4, name: 'Snacks', image: '/images/img_box_agridulce_1.png' },
    { id: 5, name: 'Meals', image: '/images/img_street_photos.png' },
    { id: 6, name: 'Fast Food', image: '/images/img_hamburguesas_de.png' },
    { id: 7, name: 'Drinks', image: '/images/img_blood_orange_berry.png' },
  ];

  return (
    <section className="w-full py-12 lg:py-[96px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:gap-[38px] items-center">
          {/* Section Title */}
          <h2 className="text-xl lg:text-[20px] font-bold leading-7 lg:leading-[28px] text-center uppercase text-black font-['Nunito']">
            Categories
          </h2>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-[38px] w-full max-w-[974px]">
            {categories?.map((category) => (
              <div
                key={category?.id}
                className="flex flex-col gap-1.5 lg:gap-[6px] items-center w-full max-w-[108px] mx-auto cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
              >
                {/* Category Image */}
                <div className="w-[80px] lg:w-[108px] h-[80px] lg:h-[108px] rounded-[10px] overflow-hidden">
                  <img
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </div>

                {/* Category Name */}
                <span className="text-sm font-normal leading-5 text-center text-black font-['Nunito']">
                  {category?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

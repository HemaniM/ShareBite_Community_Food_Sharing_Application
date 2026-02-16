import React from 'react';

const CategoriesSection = () => {
  const categories = [
    { id: 1, name: 'Groceries', image: '/images/Grocery_image.jpg' },
    { id: 2, name: 'Vegetable', image: '/images/Vegetable_image.jpg' },
    { id: 3, name: 'Fruits', image: '/images/Fruits_image.jpg' },
    { id: 4, name: 'Snacks', image: '/images/Snacks_image.jpg' },
    { id: 5, name: 'Meals', image: '/images/Meals_image.jpg' },
    { id: 6, name: 'Fast Food', image: '/images/Fast_food_image.jpg' },
    { id: 7, name: 'Drinks', image: '/images/Drinks_image.jpg' },
  ];

  return (
    <section className="w-full pt-[80px] pb-[50px] lg:pt-[80px] lg:pb-[50px]">
      <div className="w-full max-w-[975px] mx-auto">
        <div className="flex flex-col gap-6 lg:gap-[38px] items-center">
          {/* Section Title */}
          <h2 className="text-xl lg:text-[20px] font-bold leading-7 lg:leading-[28px] text-center uppercase text-black font-['Nunito']">
            Categories
          </h2>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-[38px] w-full max-w-[975px]">
            {categories?.map((category) => (
              <div
                key={category?.id}
                className="flex flex-col gap-1.5 lg:gap-[6px] items-center w-full max-w-[108px] mx-auto cursor-pointer hover:transform hover:scale-110 transition-transform duration-200"
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

import React, { useState } from "react";
import { useRef, useEffect } from "react";
import EditText from "../../components/ui/EditText";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";

const SearchSection = () => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "groceries", label: "Groceries" },
    { value: "vegetable", label: "Vegetable" },
    { value: "fruits", label: "Fruits" },
    { value: "snacks", label: "Snacks" },
    { value: "meals", label: "Meals" },
    { value: "fast-food", label: "Fast Food" },
    { value: "drinks", label: "Drinks" },
  ];

  const budgetOptions = [
    { value: "", label: "All Budgets" },
    { value: "50-100", label: "50 - 100 rupees" },
    { value: "100-500", label: "100 - 500 rupees" },
    { value: ">500", label: "> 500 rupees" },
    { value: "free", label: "Free" },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  const searchControlsRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchControlsRef.current?.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getSelectedLabel = (options, value) => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption?.label || options[0].label;
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Search:", { location, category, budget });
  };

  const renderDropdown = ({
    type,
    value,
    onChange,
    options,
    placeholder,
    iconName,
  }) => {
    const isOpen = openDropdown === type;

    return (
      <div className="w-full lg:w-[20%] relative">
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : type)}
          className="w-full px-3 lg:px-[14px] py-2 lg:py-[10px] pr-10 lg:pr-[32px] rounded-[10px] border-2 border-[var(--text-grey-1)] bg-white text-[13px] lg:text-[15px] font-semibold leading-[21px] text-left text-[var(--text-grey-4)] font-['Nunito'] outline-none focus:outline-none focus:ring-0 focus:ring-transparent"
        >
          {value ? getSelectedLabel(options, value) : placeholder}
        </button>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <Icon
            name={iconName}
            className="w-[18px] h-[16px] object-contain mr-2"
          />
          <Icon
            name="arrow_down_grey"
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-20 mt-2 w-full min-w-[150px] lg:min-w-[170px] rounded-[8px] bg-white shadow-[0px_8px_24px_#00000024] border border-[#F2EBE5] overflow-hidden p-3">
            {options.map((option, index) => {
              const isSelected =
                value === option.value || (!value && index === 0);

              return (
                <button
                  key={option.value || `${type}-all`}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                  className={`w-full px-4 py-3 text-left text-[13px] rounded-[5px] font-semibold font-['Nunito'] hover:bg-[#F2F4EA] border-b border-[#F2EBE5] last:border-b-0 ${
                    isSelected
                      ? "bg-[var(--primary-green-50)] text-[#595957]"
                      : "bg-white text-[var(--text-grey-4)] hover:bg-[#F2F4EA]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="w-full relative">
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="relative -mt-8 lg:-mt-[62px] z-10">
          <div className="bg-white rounded-[5px] shadow-[0px_4px_25px_#00000019] p-4 lg:p-[22px_56px_22px_74px]">
            {/* Section Title */}
            <h2 className="text-base font-semibold leading-[22px] text-left text-black font-['Nunito'] mb-4 lg:mb-[24px]">
              Find Food Nearby
            </h2>

            {/* Search Form */}
            <div
              ref={searchControlsRef}
              className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 w-full"
            >
              {/* Location Input */}
              <div className="w-full lg:w-[20%] relative">
                <EditText
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e?.target?.value)}
                  className="w-full px-3 lg:px-[14px] py-2 lg:py-[10px] pr-10 lg:pr-[28px] rounded-[10px] border-2 border-[var(--text-grey-1)] bg-white text-[15px] font-semibold leading-[21px] text-left text-[var(--text-grey-4)] font-['Nunito'] outline-none focus:outline-none focus:ring-0 focus:ring-transparent"
                />
                <Icon
                  name="location_icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[16px] object-contain"
                />
              </div>

              {/* Category Dropdown
              <div className="w-full lg:w-[20%] relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e?.target?.value)}
                  className="w-full px-3 lg:px-[14px] py-2 lg:py-[10px] pr-10 lg:pr-[32px] rounded-[10px] border-2 border-[#f2ebe5] bg-white text-[15px] font-semibold leading-[21px] text-left text-[#595957] font-['Nunito'] outline-none focus:outline-none focus:ring-0 focus:ring-transparent appearance-none"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Icon
                  name="category_icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[16px] object-contain"
                />
              </div> */}

              {/* Category Dropdown */}
              {renderDropdown({
                type: "category",
                value: category,
                onChange: setCategory,
                options: categoryOptions,
                placeholder: "Category",
                iconName: "category_icon",
              })}

              {/* Budget Input
              <div className="w-full lg:w-[20%] relative">
                <EditText
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(e?.target?.value)}
                  className="w-full px-3 lg:px-[14px] py-2 lg:py-[10px] pr-10 lg:pr-[32px] rounded-[10px] border-2 border-[#f2ebe5] bg-white text-[15px] font-semibold leading-[21px] text-left text-[#595957] font-['Nunito'] outline-none focus:outline-none focus:ring-0 focus:ring-transparent"
                />
                <Icon
                  name="budget_icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[16px] object-contain"
                  />
              </div> */}

              {/* Budget Input */}
              {renderDropdown({
                type: "budget",
                value: budget,
                onChange: setBudget,
                options: budgetOptions,
                placeholder: "Budget",
                iconName: "budget_icon",
              })}

              {/* Search Button */}
              <div className="w-full lg:w-[16%]">
                <Button1
                  variant="filled"
                  color="green"
                  size="md"
                  className="font-normal leading-[30px] py-3 px-[50px] text-sm"
                  onClick={handleSearch}
                >
                  SEARCH
                </Button1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;

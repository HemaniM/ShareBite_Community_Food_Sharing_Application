import React from "react";
import Button1 from "./Button1";
import { Icon } from "../Icons/Icons";

const DropdownField = ({
  name,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
  buttonClassName = "",
  buttonColorClass = "",
  menuClassName = "",
  optionClassName = "",
  iconName = ""
}) => {


// const iconName = buttonColorClass.includes("text-white")
//   ? "arrow_down_white"
//   : "arrow_down_grey";


  return (
    <div className="relative">
      <Button1
        type="button"
        variant="filled"
        color="orange"
        size="sm"
        onClick={onToggle}
        className={`mt-2 flex h-[42px] w-full items-center justify-between rounded-[8px] px-4 text-left text-[12px] font-semibold tracking-[0.2px] ${buttonColorClass} ${buttonClassName}`}
      >
        <span>{value || placeholder}</span>
        <Icon
          name={iconName}
          className={`scale-[0.7] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button1>

      {isOpen && (
        <div
          className={`absolute left-0 z-20 mt-2 w-full rounded-[8px] border border-[#F2EBE5] bg-white p-2 shadow-[0px_8px_24px_#00000024] ${menuClassName}`}
        >
          {options.map((option) => {
            const isSelected = value?.toLowerCase() === option.toLowerCase();

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`w-full rounded-[6px] px-3 py-2 text-left text-[12px] font-semibold ${
                  isSelected
                    ? "bg-[var(--primary-green-50)] text-[#595957]"
                    : "text-[var(--text-grey-4)] hover:bg-[#F2F4EA]"
                } ${optionClassName}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default DropdownField;

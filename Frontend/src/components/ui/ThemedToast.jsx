import React from "react";

const toastTypeStyles = {
  success: {
    container: "bg-[var(--primary-green-50)] text-[var(--primary-green-600)]",
    msg: "text-[var(--primary-green-800)]",
    icon: "pt-2 pb-1 px-3 bg-[var(--primary-green)] text-white",
    symbol: "✓",
    title: "Success",
  },
  error: {
    container: "bg-[var(--primary-orange-50)] text-[var(--primary-orange-600)]",
    msg: "text-[var(--primary-orange-800)]",
    icon: "pt-2 pb-1 px-3 bg-[var(--primary-orange)] text-white",
    symbol: "!",
    title: "Something went wrong",
  },
  info: {
    container: "bg-[var(--primary-cream-50)] text-[var(--text-grey-5)]",
    msg: "text-[var(--text-grey-4)]",
    icon: "pt-2 pb-1 px-3 bg-[var(--text-grey-4)] text-white",
    symbol: "i",
    title: "Note",
  },
};

const ThemedToast = ({ type = "info", message = "" }) => {
  const selectedStyle = toastTypeStyles[type] || toastTypeStyles.info;

  return (
    <div
      className={`w-full min-w-[400px] rounded-[12px] px-[20px] py-[20px] font-['Nunito'] shadow-[0_8px_20px_rgba(0,0,0,0.08)] ${selectedStyle.container}`}
    >
      <div className="flex items-start gap-[25px]">
        <span
          className={`mt-[1px] flex flex-shrink-0 items-center justify-center rounded-full text-[16px] font-extrabold ${selectedStyle.icon}`}
          aria-hidden="true"
        >
          {selectedStyle.symbol}
        </span>
        <div className="flex-1">
          <p className="text-[16px] font-bold uppercase leading-[16px] tracking-[0.5px]">
            {selectedStyle.title}
          </p>
          <p
            className={`mt-[10px] text-[15px] font-semibold leading-[18px] tracking-[1px] ${selectedStyle.msg}`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemedToast;

import React from "react";

const profileTabs = ["PROFILE", "REVIEWS", "REQUESTS", "FOOD POSTS", "HISTORY"];

const ProfileNavBar = ({ activeTab = "PROFILE" }) => {
  return (
    <div className="w-full max-w-[780px] mx-auto my-5">
      <div className="border-b border-[#d8d7d1]">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[11px] font-semibold text-[#5d5b55]">
          {profileTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`pb-5 tracking-[0.5px] ${
                activeTab === tab
                  ? "text-[#7f8f2f] border-b-4 border-[#9dad4a]"
                  : "hover:text-[#efa13d]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileNavBar;

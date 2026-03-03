import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const profileTabs = [
  { label: "PROFILE", path: "/profile/overview" },
  { label: "REVIEWS", path: "/profile/reviews" },
  { label: "REQUESTS", path: "/profile/requests" },
  { label: "FOOD POSTS", path: "/profile/food-posts" },
  { label: "HISTORY", path: "/profile/history" },
];

const ProfileNavBar = () => {
  const location = useLocation();

  const isNavItemActive = (path) => {
    console.log(path);
    console.log(location.pathname);
    console.log(location.pathname.startsWith(path));
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-full max-w-[780px] mx-auto my-5">
      <div className="border-b border-[#d8d7d1]">
        <div className="flex flex-wrap  justify-center gap-8 md:gap-[70px] text-[12px] font-semibold text-[var(--primary-cream-900)]">
          {profileTabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.path}
              className={`pb-5 tracking-[0.5px] ${
                isNavItemActive(tab.path)
                  ? "text-green font-bold border-b-4 border-green"
                  : "hover:text-green hover:font-bold"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileNavBar;

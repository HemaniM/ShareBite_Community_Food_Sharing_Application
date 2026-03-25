import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "../Icons/Icons";

// const navItems = ["HOME", "ABOUT", "CONTACT", "DONATION"];

const navItems = [
  { label: "HOME", path: "/home" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT", path: "/contact" },
  { label: "DONATION", path: "/donation", disabled: true },
];

const HomepageNavBar = ({ showBorder = false }) => {
  const location = useLocation();

  const isNavItemActive = (path) => {
    if (path === "/home") {
      return location.pathname === "/home";
    }

    return location.pathname.startsWith(path);
  };

  // const HomepageNavBar = ({ activePage = "home", showBorder = false }) => {

  return (
    <div className="w-full">
      <div className="w-full max-w-[1100px] mx-auto pt-[35px] py-[15px] sm:px-6 lg:px-8">
        <div
          className={`${showBorder ? "pb-5 border-b border-[#d8d7d1]" : ""}`}
        >
          <div className="flex flex-row justify-between items-center">
            <Link to="/home" aria-label="Go to home">
              <Icon name="shareBite_logo_header" />
            </Link>

            <div className="flex flex-row gap-[50px] items-center mr-[50px]">
              {navItems.map((item) => {
                const isDisabled = item.disabled;
                return isDisabled ? (
                  <span
                    key={item.label}
                    className="text-[14px] leading-5 font-semibold text-[var(--primary-cream-900)] cursor-not-allowed opacity-80"
                  >
                    {item.label}
                  </span>
                ) : (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={`text-[14px] leading-5 text-left font-['Nunito'] cursor-pointer transition-colors ${isNavItemActive(item.path)
                          ? "font-[var(--font-weight-bold)] text-orange"
                          : "font-[var(--font-weight-semibold)] text-[var(--primary-cream-900)] hover:text-orange hover:font-bold"
                        }`}
                    >
                      {item.label}
                    </NavLink>
                  );
              })}
            </div>

            <div className="flex flex-row items-center gap-[12px] lg:gap-[12px]">
              {/* <Link
                to="/cart"
                className="hover:opacity-90 transition-opacity"
                aria-label="Open cart"
              >
                <Icon name="cart_big_header" />
              </Link> */}

              <Link
                to="/profile"
                className="hover:opacity-90 transition-opacity"
                aria-label="Open profile"
              >
                <Icon name="profile_icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageNavBar;

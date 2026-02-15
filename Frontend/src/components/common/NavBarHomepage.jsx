import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../Icons/Icons";

const navItems = ["HOME", "ABOUT", "CONTACT", "DONATION"];

const HomepageNavBar = ({ activePage = "home", showBorder = false }) => {
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

            <div className="flex flex-row gap-[50px] items-center">
              {navItems.map((item) => (
                <span
                  key={item}
                  className={`text-[14px] leading-5 text-left font-['Nunito'] cursor-pointer transition-colors ${
                    item === "HOME" && activePage === "home"
                      ? "font-[var(--font-weight-bold)] text-[#efa13d]"
                      : "font-[var(--font-weight-semibold)] text-[#6b6961] hover:text-[#efa13d]"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-row items-center gap-[12px] lg:gap-[12px]">
              <button
                type="button"
                className="hover:opacity-90 transition-opacity"
                aria-label="Open cart"
              >
                <Icon name="cart_big_header" />
              </button>

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

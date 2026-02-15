import React from 'react';
import Button1 from '../ui/Button1';
import EditText from '../ui/EditText';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icons/Icons';

const Footer = ({ className, ...props }) => {
  return (
    <footer
      className={twMerge(
        'w-full bg-[#f9f7f8] mt-[48px] md:mt-[72px] pt-5 pb-5 px-5',
        className
      )}
      {...props}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[34px] justify-start items-start mt-4 lg:mt-[28px] mb-8 lg:mb-12">

          {/* Brand Section */}
          <div className="w-full lg:flex-1 mt-2">
            {/* Logo and Navigation Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-2 lg:mb-[20px]">
              {/* Brand Logo */}
              <div className="mb-4 sm:mb-0">
                <Icon name="shareBite_logo_footer" />
              </div>
            </div>

            {/* Brand Description and Navigation */}
            <div className="flex flex-col lg:flex-row justify-between items-start">
              {/* Left Content */}
              <div className="w-full lg:flex-1 mb-6 lg:mb-0">
                {/* Brand Description */}
                <div className="mb-6">
                  {/* Green Line */}
                  <div className="w-[200px] md:w-[300px] h-[1px] bg-[#a8b370] mb-2"></div>

                  {/* Description Text */}
                  <p className="text-sm font-normal leading-[19px] text-left text-[#40403e] font-['Nunito'] min-w-[376px] max-w-[400px]">
                    ShareBite helps people and restaurants share surplus food with others nearby. It is an easy way to reduce food waste and support your local community.
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex flex-row gap-3 lg:gap-[14px] items-center">
                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <Icon name="mail_footer" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] hover:opacity-80 transition-opacity"
                    aria-label="Twitter"
                  >
                    <Icon name="facebook_footer" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] bg-[#a8b370] p-2 hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Icon name="instagram_footer" />

                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-auto lg:w-[10%]">
            <div className="flex flex-col gap-4 lg:gap-[24px] mt-2 lg:mt-[10px]">

              <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito']">
                Navigation
              </h3>

              <div className="flex flex-col gap-2 lg:gap-[10px]">
                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Home
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    About
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Contact
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Donation
                  </span>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto lg:w-[14%]">
            <div className="flex flex-col gap-4 lg:gap-[24px] mt-2 lg:mt-[10px]">
              <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito']">
                Quick Links
              </h3>

              <div className="flex flex-col gap-2 lg:gap-[10px]">
                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Profile
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    requests
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Food Posts
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Most trusted sources
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Food near you
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Recently uploaded
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Search on map
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-auto lg:w-[18%]">
            <div className="flex flex-col gap-4 lg:gap-[26px] mt-2">
              <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito']">
                Contact
              </h3>

              <div className="flex flex-col gap-3 lg:gap-[12px]">
                <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#595957] font-['Nunito']">
                  +91 90224 42156
                </span>

                <span className="text-xs font-semibold leading-[17px] text-left lowercase text-[#595957] font-['Nunito']">
                  example@gmail.com
                </span>

                <p className="text-xs font-medium leading-4 text-left text-[#595957] font-['Nunito'] max-w-[200px]">
                  Flat 302, Shree Ganesh Apartments, Link road, Andheri west, Mumbai, Maharashtra – 400053
                </p>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="w-full sm:w-auto lg:w-[18%]">
            <div className="flex flex-col gap-2 lg:gap-[10px] items-end">
              <EditText
                placeholder="Message"
                className="w-full rounded-[5px] border-none outline-none focus:outline-none focus:ring-0 px-3 py-2 text-xs font-semibold leading-[17px] text-left capitalize text-[#8c8c8a] bg-white font-['Nunito']"
              />

              <Button1
                variant="filled"
                color="orange"
                size="sm"
                className="font-medium"
              >
                SEND MESSAGE
              </Button1>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-4 items-center">
          {/* Divider Line */}
          <div className="w-full h-[1px] bg-[#d4d4d4]"></div>

          {/* Copyright */}
          <p className="text-xs font-semibold leading-[17px] tracking-[1px] text-center capitalize text-[#8c8c8a] font-['Nunito']">
            @2026, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
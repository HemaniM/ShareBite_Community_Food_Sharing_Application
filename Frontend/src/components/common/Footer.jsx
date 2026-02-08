import React from 'react';
import Button from '../ui/Button';
import EditText from '../ui/EditText';
import { twMerge } from 'tailwind-merge';

const Footer = ({ className, ...props }) => {
  return (
    <footer
      className={twMerge(
        'w-full bg-[#f9f7f8] mt-[48px] md:mt-[72px] pt-5 pb-5 px-5',
        className
      )}
      {...props}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[34px] justify-start items-start mt-4 lg:mt-[28px] mb-8 lg:mb-12">

          {/* Brand Section */}
          <div className="w-full lg:flex-1">
            {/* Logo and Navigation Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 lg:mb-[58px]">
              {/* Brand Logo */}
              <div className="mb-4 sm:mb-0">
                <h2 className="text-[18px] sm:text-[25px] lg:text-[36px] font-bold leading-[50px] tracking-[1px] text-left text-black font-['Nunito']">
                  <span className="text-[#59641e] font-['Archivo'] text-[14px] sm:text-[20px]">Share</span>
                  <span className="text-[#efa13d] font-['Alkatra'] text-[16px] sm:text-[25px]">Bite</span>
                </h2>
              </div>

              {/* Navigation Header - Desktop */}
              <div className="hidden lg:block">
                <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito'] mt-2">
                  Navigation
                </h3>
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
                  <p className="text-sm font-normal leading-[19px] text-left text-[#40403e] font-['Nunito'] max-w-[400px]">
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
                    <img
                      src="/images/img_frame_101_light_green_400.svg"
                      alt="Facebook"
                      className="w-full h-full object-contain"
                    />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] hover:opacity-80 transition-opacity"
                    aria-label="Twitter"
                  >
                    <img
                      src="/images/img_frame_99_light_green_400.svg"
                      alt="Twitter"
                      className="w-full h-full object-contain"
                    />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] bg-[#a8b370] p-2 hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <img
                      src="/images/img_frame_100.svg"
                      alt="Instagram"
                      className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] object-contain"
                    />
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="w-full sm:w-auto lg:w-auto">
                <div className="flex flex-col gap-2 lg:gap-[10px]">
                  {/* Navigation Items with Arrows */}
                  <div className="flex items-center gap-2 lg:gap-[10px]">
                    <img
                      src="/images/img_vector_orange_a200.svg"
                      alt="arrow"
                      className="w-[5px] h-[8px] object-contain"
                    />
                    <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                      Home
                    </span>
                  </div>

                  <div className="flex items-center gap-2 lg:gap-[10px]">
                    <img
                      src="/images/img_vector_orange_a200.svg"
                      alt="arrow"
                      className="w-[5px] h-[8px] object-contain"
                    />
                    <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                      about
                    </span>
                  </div>

                  <div className="flex items-center gap-2 lg:gap-[10px]">
                    <img
                      src="/images/img_vector_orange_a200.svg"
                      alt="arrow"
                      className="w-[5px] h-[8px] object-contain"
                    />
                    <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nutono']">
                      Contact
                    </span>
                  </div>

                  <div className="flex items-center gap-2 lg:gap-[10px]">
                    <img
                      src="/images/img_vector_orange_a200.svg"
                      alt="arrow"
                      className="w-[5px] h-[8px] object-contain"
                    />
                    <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                      donation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-auto lg:w-[14%]">
            <div className="flex flex-col gap-4 lg:gap-[24px] mt-2 lg:mt-[10px]">
              <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito']">
                Quick Links
              </h3>

              <div className="flex flex-col gap-2 lg:gap-[10px]">
                <div className="flex items-center gap-2 lg:gap-[10px]">
                  <img
                    src="/images/img_vector_orange_a200.svg"
                    alt="arrow"
                    className="w-[5px] h-[8px] object-contain"
                  />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Profile
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px]">
                  <img
                    src="/images/img_vector_orange_a200.svg"
                    alt="arrow"
                    className="w-[5px] h-[8px] object-contain"
                  />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    requests
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px]">
                  <img
                    src="/images/img_vector_orange_a200.svg"
                    alt="arrow"
                    className="w-[5px] h-[8px] object-contain"
                  />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Food Posts
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px]">
                  <img
                    src="/images/img_vector_orange_a200.svg"
                    alt="arrow"
                    className="w-[5px] h-[8px] object-contain"
                  />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Most trusted sources
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px]">
                  <img
                    src="/images/img_vector_orange_a200.svg"
                    alt="arrow"
                    className="w-[5px] h-[8px] object-contain"
                  />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Food near you
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px]">
                  <img
                    src="/images/img_vector_orange_a200.svg"
                    alt="arrow"
                    className="w-[5px] h-[8px] object-contain"
                  />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Recently uploaded
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px]">
                  <img
                    src="/images/img_vector_orange_a200.svg"
                    alt="arrow"
                    className="w-[5px] h-[8px] object-contain"
                  />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Search on map
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-auto lg:w-[20%]">
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
                className="w-full rounded-[5px] px-2 py-2 text-xs font-semibold leading-[17px] text-left capitalize text-[#8c8c8a] bg-white font-['Nunito']"
              />

              <Button
                text="send message"
                className="px-2 py-2 rounded-[10px] mb-[100px] lg:mb-[164px] text-xs font-semibold leading-[17px] text-left uppercase text-white bg-[#efa13d] font-['Nunito']"
              />
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
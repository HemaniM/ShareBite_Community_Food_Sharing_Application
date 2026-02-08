import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icons/Icons';

const ContactBar = ({ className, ...props }) => {
  return (
    <div
      className={twMerge('w-full', className)}
      {...props}
    >
      {/* Top Contact Bar */}
      <div className="w-full bg-[linear-gradient(90deg,#f9f7f8_0%,#f0eeef_50%,#f3f1f2_100%)]">
        <div className="w-full max-w-[1100px] mx-auto">
          <div className="flex flex-row justify-between items-center py-2 md:py-[10px]">
            {/* Email */}
            <div className="">
              <span className="text-[10px] md:text-[13px] font-semibold leading-[18px] text-left lowercase text-[#8c8c8a] font-['Nunito']">
                farmgate@gmail.com
              </span>
            </div>

            {/* Phone Number */}
            <div className="">
              <span className="text-[10px] md:text-[13px] font-semibold leading-[18px] text-left uppercase text-[#8c8c8a] font-['Nunito']">
                +91 90224 42156
              </span>
            </div>

            {/* Social Icons */}
            <div className="min-w-[90px] flex flex-row justify-between mt-[5px] items-center">
              {/* Email Icon */}
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Email"
              >
                <Icon name="mail_header" />
              </a>

              {/* Facebook Icon */}
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Icon name="facebook_header" />
              </a>

              {/* Instagram Icon */}
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Icon name="instagram_header" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
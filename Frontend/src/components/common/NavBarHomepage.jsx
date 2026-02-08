import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icons/Icons';

const NavBarHomepage = ({ className, ...props }) => {
    return (
        <div className="w-full">
            <div className="w-full max-w-[1100px] mx-auto pt-[35px] py-[15px]">
                <div className="flex flex-row justify-between items-center">
                    {/* Logo */}
                    <div className="">
                        <Icon name="shareBite_logo_header" />
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex flex-row gap-[50px] items-center">
                        <span className="text-[14px] font-[var(--font-weight-bold)] leading-5 text-left text-[#efa13d] font-['Nunito'] cursor-pointer hover:opacity-80">
                            HOME
                        </span>
                        <span className="text-[14px] font-[var(--font-weight-semibold)] leading-5 text-left text-[#6b6961] font-['Nunito'] cursor-pointer hover:text-[#efa13d] transition-colors">
                            ABOUT
                        </span>
                        <span className="text-[14px] font-[var(--font-weight-semibold)] leading-5 text-left text-[#6b6961] font-['Nunito'] cursor-pointer hover:text-[#efa13d] transition-colors">
                            CONTACT
                        </span>
                        <span className="text-[14px] font-[var(--font-weight-semibold)] leading-5 text-left text-[#6b6961] font-['Nunito'] cursor-pointer hover:text-[#efa13d] transition-colors">
                            DONATION
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row items-center gap-[12px] lg:gap-[12px]">
                        {/* Cart Button */}
                        <div className="hover:opacity-90 transition-opacity">
                            <Icon name="cart_big_header" />
                        </div>
                        {/* Profile Button */}
                        <div className="hover:opacity-90 transition-opacity">
                            <Icon name="profile_icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarHomepage;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import PagerIndicator from '../../components/ui/PagerIndicator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e?.target?.value);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login clicked', { email, password });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log('Google sign in clicked');
  };

  const handleLearnMore = () => {
    // Handle learn more logic here
    console.log('Learn more clicked');
  };

  return (
    <>
      <Helmet>
        <title>Login | ShareBite Food Sharing Platform - Access Your Account</title>
        <meta
          name="description"
          content="Sign in to ShareBite to share surplus food, discover nearby meals, and join our community reducing food waste. Secure login with email or Google authentication."
        />
        <meta property="og:title" content="Login | ShareBite Food Sharing Platform - Access Your Account" />
        <meta property="og:description" content="Sign in to ShareBite to share surplus food, discover nearby meals, and join our community reducing food waste. Secure login with email or Google authentication." />
      </Helmet>

      <main className="w-full min-h-screen bg-[#e8e8e8] flex items-center justify-start">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-[80px] sm:mt-[120px] lg:mt-[160px] mx-[81px] sm:mx-[120px] lg:mx-[162px]">
            <div className="flex flex-col lg:flex-row items-center justify-start w-full bg-white rounded-sm p-[5px] sm:p-[8px] lg:p-[10px]">

              {/* Left Side - Image Slider */}
              <div className="w-full lg:w-[42%] relative">
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[684px] rounded-sm overflow-hidden bg-[#0000000c] shadow-[0px_4px_1px_#888888ff]">
                  {/* Main Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src="/images/img_drool_worthy_content.png"
                      alt="Delicious food sharing community"
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 lg:p-[12px]">
                    {/* Top Navigation Buttons */}
                    <div className="flex justify-end items-center gap-2 sm:gap-3 lg:gap-5 mr-1 lg:mr-[4px]">
                      <Button
                        text="Sign Up"
                        text_font_size="text-sm sm:text-base lg:text-lg"
                        text_font_family="Nunito"
                        text_font_weight="font-bold"
                        text_color="text-white"
                        fill_background_color="bg-[#ffffff26]"
                        border_border_radius="rounded-lg"
                        border_border="2px solid #ffffff"
                        padding="t=10px,r=10px,b=10px,l=10px"
                        className="text-xs sm:text-sm lg:text-base"
                      />
                      <div className="bg-primary-orange text-white font-bold text-sm sm:text-base lg:text-lg px-[12px] sm:px-[15px] lg:px-[18px] py-[8px] sm:py-[9px] lg:py-[10px] rounded-lg ml-[15px] sm:ml-[18px] lg:ml-[20px]">
                        Login
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="flex flex-col gap-[20px] sm:gap-[25px] lg:gap-[30px] mr-[12px] sm:mr-[15px] lg:mr-[18px] mb-[8px] sm:mb-[12px] lg:mb-[10px]">
                      {/* Welcome Message */}
                      <div className="bg-[#ffffff26] shadow-[0px_4px_4px_#888888ff] px-[8px] sm:px-[9px] lg:px-[10px] py-[8px] sm:py-[9px] lg:py-[10px] rounded">
                        <p className="text-white font-bold text-base sm:text-lg lg:text-2xl leading-tight">
                          "Welcome to a community where food gets a second chance."
                        </p>
                      </div>

                      {/* Learn More Section */}
                      <div className="flex justify-between items-center mr-[12px] sm:mr-[14px] lg:mr-[16px]">
                        <Button
                          text="Learn More"
                          text_font_size="text-sm sm:text-base lg:text-lg"
                          text_font_family="Nunito"
                          text_font_weight="font-bold"
                          text_color="text-white"
                          fill_background_color="bg-[#ffffff26]"
                          border_border_radius="rounded-lg"
                          border_border="2px solid #ffffff"
                          padding="t=10px,r=10px,b=10px,l=10px"
                          onClick={handleLearnMore}
                          className="text-xs sm:text-sm lg:text-base"
                        />
                        <div className="w-[8px] sm:w-[9px] lg:w-[10px] h-[8px] sm:h-[9px] lg:h-[10px] bg-[#e2e2e27f] rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pager Indicator */}
                <div className="mt-[12px] sm:mt-[15px] lg:mt-[18px] mr-[31px] sm:mr-[46px] lg:mr-[62px] mb-[12px] sm:mb-[15px] lg:mb-[18px]">
                  <PagerIndicator
                    layout_width="12%"
                    totalPages={3}
                    currentPage={currentSlide}
                    onPageChange={setCurrentSlide}
                    variant="dots"
                    size="small"
                    className="justify-end"
                    margin=""
                    position="relative"
                  />
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="w-full lg:w-[58%] flex justify-center items-center">
                <div className="w-full max-w-[500px] lg:w-[92%] bg-white rounded-[0px_5px_0px_5px] p-[12px] sm:p-[15px] lg:p-[18px] mb-[27px] sm:mb-[40px] lg:mb-[54px]">

                  {/* Brand Logo */}
                  <div className="mb-[30px] sm:mb-[35px] lg:mb-[40px]">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight tracking-wide">
                      <span className="text-[#59641e] font-bold text-lg sm:text-xl lg:text-[22px] font-[Archivo]">Share</span>
                      <span className="text-primary-orange font-bold text-xl sm:text-2xl lg:text-[25px] font-[Alkatra]">Bite</span>
                    </h1>
                  </div>

                  {/* Login Section */}
                  <div className="flex flex-col gap-[6px] sm:gap-[7px] lg:gap-[8px] mb-[32px] sm:mb-[37px] lg:mb-[42px]">

                    {/* Welcome Text */}
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-[30px] font-extrabold leading-tight uppercase text-[#080403] mb-[6px] sm:mb-[7px] lg:mb-[8px]">
                        Good to see you again
                      </h2>
                      <p className="text-base sm:text-lg lg:text-xl font-medium leading-normal text-[#454e17]">
                        Ready to share and care?
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-[20px] sm:gap-[23px] lg:gap-[26px] w-full lg:w-[92%]">

                      {/* Email Field */}
                      <div className="flex flex-col gap-[2px]">
                        <label className="text-sm sm:text-base lg:text-[15px] font-medium leading-normal text-[#595957]">
                          Email Address
                        </label>
                        <EditText
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          fill_background_color="bg-[#f8f8f8]"
                          border_border_radius="rounded-md"
                          padding="t=8px,r=8px,b=8px,l=8px"
                          className="w-full"
                          required
                          placeholder=""
                          text_font_size="text-base"
                          text_font_family="Nunito"
                          text_font_weight="font-normal"
                          text_line_height="normal"
                          text_text_align="left"
                          text_color="text-black"
                          border_border=""
                          text_text_transform="none"
                          layout_width="100%"
                          position="relative"
                          layout_gap="0px"
                          variant="default"
                          size="medium"
                          onFocus={() => { }}
                          onBlur={() => { }}
                          id="email"
                          name="email"
                          maxLength={undefined}
                          minLength={undefined}
                          pattern=""
                          autoComplete="email"
                        />
                      </div>

                      {/* Password Field */}
                      <div className="flex flex-col gap-[2px]">
                        <label className="text-sm sm:text-base lg:text-[15px] font-medium leading-normal text-[#595957]">
                          Password
                        </label>
                        <EditText
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          fill_background_color="bg-[#f8f8f8]"
                          border_border_radius="rounded-md"
                          padding="t=8px,r=8px,b=8px,l=8px"
                          className="w-full"
                          required
                          placeholder=""
                          text_font_size="text-base"
                          text_font_family="Nunito"
                          text_font_weight="font-normal"
                          text_line_height="normal"
                          text_text_align="left"
                          text_color="text-black"
                          border_border=""
                          text_text_transform="none"
                          layout_width="100%"
                          position="relative"
                          layout_gap="0px"
                          variant="default"
                          size="medium"
                          onFocus={() => { }}
                          onBlur={() => { }}
                          id="password"
                          name="password"
                          maxLength={undefined}
                          minLength={undefined}
                          pattern=""
                          autoComplete="current-password"
                        />
                      </div>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-end mt-[20px] sm:mt-[25px] lg:mt-[30px]">
                      <Button
                        text="LOGIN"
                        text_font_size="text-sm sm:text-base lg:text-lg"
                        text_font_family="Nunito"
                        text_font_weight="font-bold"
                        text_color="text-white"
                        text_text_transform="uppercase"
                        fill_background_color="bg-primary-orange"
                        border_border_radius="rounded-[14px]"
                        padding="t=6px,r=34px,b=6px,l=34px"
                        margin="l=190px"
                        onClick={handleLogin}
                        className="ml-auto"
                      />
                    </div>

                    {/* Or Divider */}
                    <div className="text-center mt-[20px] sm:mt-[25px] lg:mt-[30px]">
                      <span className="text-sm sm:text-base lg:text-lg font-bold capitalize text-[#bfbfbd]">
                        Or
                      </span>
                    </div>

                    {/* Google Sign In */}
                    <div className="flex justify-center mt-[15px] sm:mt-[20px] lg:mt-[25px]">
                      <Button
                        text="Sign in with Google"
                        text_font_size="text-xs sm:text-sm lg:text-md"
                        text_font_family="Nunito"
                        text_font_weight="font-medium"
                        text_color="text-[#40403e]"
                        fill_background_color="bg-[#fffbec]"
                        border_border_radius="rounded-sm"
                        padding="t=6px,r=34px,b=6px,l=82px"
                        margin="l=100px"
                        layout_gap="34px"
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-[10px] sm:gap-[15px] lg:gap-[34px] mx-auto"
                      >
                        <img
                          src="/images/img_google_icon.svg"
                          alt="Google"
                          className="w-[12px] sm:w-[13px] lg:w-[14px] h-[12px] sm:h-[13px] lg:h-[14px]"
                        />
                        Sign in with Google
                      </Button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;

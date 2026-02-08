import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "../../components/Icons/Icons";

const carouselData = [
  {
    image: "/images/log1.jpg",
    text: "Welcome to a community where food gets a second chance.",
  },
  {
    image: "/images/log2.jpg",
    text: "Post leftover and near-expiry food in just a few taps.",
  },
  {
    image: "/images/log3.jpg",
    text: "Discover free or low-cost meals available around you.",
  },
  {
    image: "/images/log4.jpg",
    text: "From restaurants to individuals, everyone can share.",
  },
  {
    image: "/images/log5.jpg",
    text: "Your extra food could fill someone's empty stomach.",
  },
];

const AuthLayout = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div className="bg-white w-full max-w-[1000px] h-[670px] flex rounded-xl overflow-hidden shadow-2xl">

        {/* LEFT: Image Carousel */}
        <div className="w-[45%] relative overflow-hidden m-3 rounded-lg">

          {/* Sign Up & Login buttons */}
          <div className="absolute top-6 right-6 flex gap-3 z-20">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#efa13d] text-white shadow-md"
                    : "bg-white/20 backdrop-blur-sm text-white border border-white hover:bg-white hover:text-gray-600"
                }`
              }
            >
              Sign Up
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#efa13d] text-white shadow-md"
                    : "bg-white/20 backdrop-blur-sm text-white border border-white hover:bg-white hover:text-gray-600"
                }`
              }
            >
              Login
            </NavLink>
          </div>

          {/* Slides */}
          {carouselData.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={item.image}
                alt="Food sharing"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-20 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3">
                  <p className="text-white text-sm leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </div>

              {/* Learn More Button (PAUSE ON HOVER) */}
              <button
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="absolute bottom-6 left-8 px-5 py-2 border-2 border-white 
                           text-white rounded-md hover:bg-white hover:text-gray-900 
                           transition-all duration-300 font-medium text-sm"
              >
                Learn More
              </button>
            </div>
          ))}

          {/* Carousel Dots */}
          <div className="absolute bottom-6 right-8 flex gap-2 z-10">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Auth Forms */}
        <div className="w-[55%] p-10 flex flex-col bg-white">
          {/* Logo */}
          <div className="mb-10">
            <Icon name="shareBite_logo_header" />
          </div>

          {/* Forms */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;

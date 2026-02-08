import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const carouselData = [
  {
    image: "/images/log1.jpg",
    text: "Welcome to a community where food gets a second chance."
  },
  {
    image: "/images/log2.jpg",
    text: "Post leftover and near-expiry food in just a few taps."
  },
  {
    image: "/images/log3.jpg",
    text: "Discover free or low-cost meals available around you."
  },
  {
    image: "/images/log4.jpg",
    text: "From restaurants to individuals, everyone can share."
  },
  {
    image: "/images/log5.jpg",
    text: "Your extra food could fill someone's empty stomach."
  }
];

const AuthLayout = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-[1100px] h-[600px] flex rounded-2xl overflow-hidden shadow-2xl">
        
        {/* LEFT: Image Carousel */}
        <div className="w-[45%] relative overflow-hidden">
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
              
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Overlay Text */}
              <div className="absolute bottom-20 left-8 right-8">
                <p className="text-white text-lg font-medium leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Learn More Button */}
              <button className="absolute bottom-8 left-8 px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium">
                Learn More
              </button>
            </div>
          ))}

          {/* Carousel Dots */}
          <div className="absolute bottom-8 right-8 flex gap-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-white w-6" 
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Auth Forms */}
        <div className="w-[55%] p-12 flex flex-col">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              <span className="text-gray-700">Share</span>
              <span className="text-orange-500">Bite</span>
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-3 mb-8">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-transparent text-gray-600 border border-gray-300 hover:border-gray-400"
                }`
              }
            >
              Sign Up
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-transparent text-gray-600 border border-gray-300 hover:border-gray-400"
                }`
              }
            >
              Login
            </NavLink>
          </div>

          {/* Form Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavBarHomepage from "../../components/common/NavbarHomepage";
import NavbarProfile from "../../components/common/NavbarProfile";
import PasswordModal from "../../components/common/PasswordModal";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "Name",
    gender: "Prefer not to say",
    phone: "+91 34456 98356",
    email: "priyasingh@gmail.com",
    about:
      "Hi, I'm Member of the ShareBite community, passionate about sharing food, reducing waste, and helping others.",
    address: "Address line here...",
    city: "Bhayander",
    district: "Thane",
    state: "Maharashtra",
    pincode: "401105",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Profile Data:", formData);

    // future API call here

    navigate("/profile/overview");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[975px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-[50px]"
      >
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14">
          <img
            src="../images/profile_cover_image.jpg"
            alt="Profile"
            className="w-[260px] h-[260px] object-cover rounded-[12px]"
          />

          <div className="w-full space-y-4">
            <div>
              <label className="block text-[14px] font-semibold text-[#383733] mb-2">
                User Name
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[14px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#383733] mb-2">
                Password
              </label>
              <input
                type="password"
                value="........"
                readOnly
                className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-1.5 rounded-[8px] border border-[#efa13d] text-[10px] font-bold tracking-[0.6px] text-[#efa13d] hover:bg-[#efa13d] hover:text-white transition-colors"
            >
              CHANGE PASSWORD
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-10">
          <div>
            <label className="block text-[12px] font-semibold text-[#383733] mb-2">
              Gender
            </label>
            <input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#383733] mb-2">
              Contact Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#383733] mb-2">
              Email Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#383733] mb-2">
              About Me
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-[5px] bg-[var(--primary-green-50)] px-3 py-2 text-[11px] leading-[16px] text-[#7d7d77] resize-none outline-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#383733] mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-[5px] bg-[var(--primary-green-50)] px-3 py-2 text-[11px] leading-[16px] text-[#7d7d77] resize-none outline-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                District
              </label>
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full h-[34px] rounded-[5px] bg-[var(--primary-green-50)] px-3 text-[11px] text-[#7d7d77] outline-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="mt-5 px-12 py-2.5 rounded-[9px] bg-[#efa13d] text-white text-[11px] font-bold tracking-[0.7px] hover:opacity-90"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}

      <Footer />
    </>
  );
};

export default EditProfilePage;

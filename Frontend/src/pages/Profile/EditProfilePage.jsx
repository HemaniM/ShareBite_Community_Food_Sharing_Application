import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMyProfile,
  updateMyProfile,
  uploadMyProfileImage,
} from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const defaultFormData = {
  name: "Name",
  gender: "Prefer not to say",
  phone: "",
  email: "",
  about:
    "Hi, I'm Member of the ShareBite community, passionate about sharing food, reducing waste, and helping others.",
  address: "Address line here...",
  city: "",
  district: "",
  state: "",
  pincode: "",
  profileImage: "",
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      const commaIndex = result.indexOf(",");
      resolve(commaIndex > -1 ? result.slice(commaIndex + 1) : "");
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const DefaultProfileIcon = () => (
  <div className="flex h-full w-full items-center justify-center rounded-[12px] bg-[#d9d9d9] text-[#f2f2f2]">
    <svg
      viewBox="0 0 120 120"
      className="h-[170px] w-[170px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="60" cy="40" r="18" />
      <rect x="26" y="66" width="68" height="34" rx="17" />
    </svg>
  </div>
);

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null);

  const { profileData, updateLoading, imageUploading } = useAppSelector(
    (state) => state.profile,
  );

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!profileData) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      ...profileData,
    }));
  }, [profileData]);

  const previewImage = useMemo(
    () => formData.profileImage || profileData?.profileImage || "",
    [formData.profileImage, profileData?.profileImage],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageData = await fileToBase64(file);
    const imageUrl = await dispatch(
      uploadMyProfileImage({ imageData, mimeType: file.type }),
    ).unwrap();

    setFormData((previous) => ({ ...previous, profileImage: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    if (!payload.profileImage) {
      delete payload.profileImage;
    }

    await dispatch(updateMyProfile(payload)).unwrap();
    navigate("/profile/overview");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[975px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-[50px]"
      >
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14">
          <button
            type="button"
            onClick={handleUploadClick}
            className="w-[260px] h-[260px] rounded-[12px] overflow-hidden"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-[260px] h-[260px] object-cover rounded-[12px]"
              />
            ) : (
              <DefaultProfileIcon />
            )}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="w-full space-y-4">
            <div>
              <label className="block text-[14px] font-semibold text-[#383733] mb-2">
                User Name
              </label>
              <input
                name="name"
                value={formData.name}
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
            {/* 
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-1.5 rounded-[8px] border border-[#efa13d] text-[10px] font-bold tracking-[0.6px] text-[#efa13d] hover:bg-[#efa13d] hover:text-white transition-colors"
            >
              CHANGE PASSWORD
            </button> */}
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
              value={formData.gender || ""}
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
              value={formData.phone || ""}
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
              value={formData.email || ""}
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
              value={formData.about || ""}
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
              value={formData.address || ""}
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
                value={formData.city || ""}
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
                value={formData.district || ""}
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
                value={formData.state || ""}
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
                value={formData.pincode || ""}
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
            disabled={updateLoading || imageUploading}
            className="mt-5 px-12 py-2.5 rounded-[9px] bg-[#efa13d] text-white text-[11px] font-bold tracking-[0.7px] hover:opacity-90 disabled:opacity-50"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>

      {/* Password Modal */}
      {/* {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )} */}

      {/* <Footer /> */}
    </>
  );
};

export default EditProfilePage;

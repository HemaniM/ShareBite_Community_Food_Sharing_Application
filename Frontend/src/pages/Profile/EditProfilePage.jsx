import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavBarHomepage from "../../components/common/NavBarHomepage";
import NavbarProfile from "../../components/common/NavbarProfile";
import PasswordModal from "../../components/common/PasswordModal";

const EditProfilePage = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSaveChanges = () => {
    // here you will later add API call
    // redirect to profile page
    navigate("/profile");
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile | ShareBite</title>
        <meta
          name="description"
          content="Edit your ShareBite profile information."
        />
      </Helmet>

      <main className="w-full bg-white">
        <ContactBar />
        <section className="w-full">
          <NavBarHomepage activePage="home" showBorder={true} />
          <NavbarProfile activeTab="PROFILE" />

          <div className="w-full max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-8">
            <div className="pt-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14">
              <img
                src="/images/log1.jpg"
                alt="Priya Singh"
                className="w-[260px] h-[260px] object-cover rounded-[12px]"
              />

              <div className="w-full space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                    User Name
                  </label>
                  <input
                    defaultValue="Priya_Singh"
                    className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value="........"
                    readOnly
                    className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-10">
              <div>
                <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                  Name
                </label>
                <input
                  defaultValue="priyasingh@gmail.com"
                  className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                  Contact Number
                </label>
                <input
                  defaultValue="+91 34456 98356"
                  className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                  Email Address
                </label>
                <input
                  defaultValue="priyasingh@gmail.com"
                  className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                  About Me
                </label>
                <textarea
                  defaultValue="Hi, I'm Priya Singh, a friendly and community-minded individual who believes in sharing kindness through small actions. I enjoy contributing positively to my surroundings and supporting initiatives that bring people together."
                  rows={3}
                  className="w-full rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 py-2 text-[11px] leading-[16px] text-[#7d7d77] resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                    Area
                  </label>
                  <input
                    defaultValue="Bhayander"
                    className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                    City
                  </label>
                  <input
                    defaultValue="Bhayander"
                    className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                    District
                  </label>
                  <input
                    defaultValue="Thane"
                    className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                    State
                  </label>
                  <input
                    defaultValue="Bhayander"
                    className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                    Pincode
                  </label>
                  <input
                    defaultValue="401105"
                    className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[11px] text-[#7d7d77]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="mt-5 px-12 py-2.5 rounded-[9px] bg-[#efa13d] text-white text-[11px] font-bold tracking-[0.7px] hover:opacity-90"
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </section>

        <Footer className="mt-0" />

        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      </main>
    </>
  );
};

export default EditProfilePage;

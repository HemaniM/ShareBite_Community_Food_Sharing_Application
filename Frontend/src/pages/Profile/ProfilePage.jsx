import React from "react";
import { Helmet } from "react-helmet";
import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavbarHomepage from "../../components/common/NavbarHomepage";
import NavbarProfile from "../../components/common/NavbarProfile";

const profileTabs = ["PROFILE", "REVIEWS", "REQUESTS", "FOOD POSTS", "HISTORY"];

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>My Profile | ShareBite</title>
        <meta
          name="description"
          content="Manage your ShareBite profile, account details, and activity history."
        />
      </Helmet>

      <main className="w-full bg-white">
        <ContactBar />
        <section className="w-full">
          <NavbarHomepage activePage="home" showBorder={true} />
          <NavbarProfile activeTab="PROFILE" />

          <div className="w-full max-w-[975px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-8">
            <div className="pt-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14">
              <div>
                <img
                  src="/images/log1.jpg"
                  alt="Priya Singh"
                  className="w-[260px] h-[260px] object-cover rounded-[12px]"
                />

                <div className="mt-8 space-y-5 max-w-[280px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                      User Name
                    </label>
                    <input
                      value="Priya_Singh"
                      readOnly
                      className="w-full h-[38px] rounded-[6px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[12px] text-[#7d7d77]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#383733] mb-2">
                      Password
                    </label>
                    <input
                      value="234********"
                      readOnly
                      className="w-full h-[38px] rounded-[6px] border border-[#eceade] bg-[#f5f5ee] px-3 text-[12px] text-[#7d7d77]"
                    />
                  </div>

                  <button
                    type="button"
                    className="px-5 py-2 rounded-[8px] border border-[#90a046] text-[11px] font-bold tracking-[0.7px] text-[#7f8f2f] hover:bg-[#90a046] hover:text-white transition-colors"
                  >
                    EDIT PROFILE
                  </button>
                </div>
              </div>

              <div>
                <h1 className="text-[31px] font-bold text-[#222120]">
                  PRIYA SINGH
                </h1>
                <p className="text-[14px] text-[#76746d] mt-1">
                  Priyasingh@GMail.Com
                </p>

                <div className="mt-6">
                  <h2 className="text-[12px] font-bold text-[#312f2d] mb-2">
                    About Me
                  </h2>
                  <p className="max-w-[520px] text-[12px] leading-[20px] text-[#79766d]">
                    Hi, I&apos;m Priya Singh, a friendly and community-minded
                    individual who believes in sharing kindness through small
                    actions. I enjoy contributing positively to my surroundings
                    and supporting initiatives that bring people together.
                  </p>
                </div>

                <div className="mt-6 space-y-2 text-[12px] text-[#504e49]">
                  <p>
                    <span className="font-bold mr-4">Location</span>
                    Bhayander
                  </p>
                  <p>
                    <span className="font-bold mr-5">Contact</span>
                    +91 34456 98356
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 max-w-[520px]">
              <h3 className="text-[18px] font-semibold text-[#e2902e]">
                Delete Your Account
              </h3>
              <p className="text-[11px] leading-[18px] text-[#7c7a72] mt-3">
                Deleting your account is permanent and cannot be undone. All
                your data, posts, and activity will be permanently removed.
                Please make sure you want to continue before proceeding.
              </p>

              <button
                type="button"
                className="mt-5 px-6 py-2.5 rounded-[9px] bg-[#efa13d] text-white text-[11px] font-bold tracking-[0.7px] hover:opacity-90"
              >
                DELETE ACCOUNT
              </button>
            </div>
          </div>
        </section>
        <Footer className="mt-0" />
      </main>
    </>
  );
};

export default ProfilePage;

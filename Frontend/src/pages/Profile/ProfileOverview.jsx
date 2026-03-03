import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../features/auth/authSlice";
import Button1 from "../../components/ui/Button1";

const ProfileOverview = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full max-w-[975px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-[80px]">
      <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] gap-10">
        {/* IMAGE */}
        <div>
          <img
            src="../images/profile_image.jpg"
            alt="Priya Singh"
            className="w-[260px] h-[260px] object-cover rounded-[12px]"
          />
        </div>

        {/* USER DETAILS */}
        <div>
          <h1 className="text-[31px] font-bold text-black">PRIYA SINGH</h1>

          <p className="text-[16px] text-[var(--text-grey-3)] mt-1 font-semibold">
            Priyasingh@GMail.Com
          </p>

          <div className="mt-6">
            <h2 className="text-[14px] font-bold text-[#312f2d] mb-2">
              About Me
            </h2>

            <p className="max-w-[520px] text-[12px] leading-[20px] text-[var(--text-grey-4)]">
              Hi, I'm Priya Singh, a friendly and community-minded individual
              who believes in sharing kindness through small actions.
            </p>
          </div>

          <div className="mt-6 space-y-2 text-[13px] text-[#504e49]">
            <p className="text-[var(--text-grey-3)]">
              <span className="font-bold mr-4 text-[var(--text-grey-5)]">
                Location
              </span>
              Bhayander
            </p>

            <p className="text-[var(--text-grey-3)]">
              <span className="font-bold mr-5 text-[var(--text-grey-5)]">
                Contact
              </span>
              +91 34456 98356
            </p>
          </div>
        </div>

        {/* USERNAME & PASSWORD */}
        <div>
          <div className="space-y-5 max-w-[280px]">
            <div>
              <label className="block text-[14px] font-semibold text-[var(--text-grey-5)] mb-2">
                User Name
              </label>

              <input
                value="Priya_Singh"
                readOnly
                className="w-full h-[38px] rounded-[6px] border border-[var(--primary-green-50)] bg-[var(--primary-green-50)] px-3 text-[14px] text-[var(--text-grey-3)] focus:outline-none focus:ring-0 focus:ring-transparent"
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
                className="w-full h-[38px] rounded-[6px] border border-[var(--primary-green-50)] bg-[var(--primary-green-50)] px-3 text-[12px] text-[var(--text-grey-3)] focus:outline-none focus:ring-0 focus:ring-transparent"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Link
                to="/profile/edit"
                // className="w-[130px] inline-block px-5 py-2 rounded-[8px] border border-[#90a046] text-[11px] text-center font-bold tracking-[0.7px] text-[#7f8f2f] hover:bg-[#90a046] hover:text-white transition-colors"
              >
                <Button1
                  variant="outline"
                  color="green"
                  size="sm"
                  className="px-5 py-2 font-bold rounded-[8px] tracking-[0.7px] hover:bg-[var(--primary-green-400)] hover:border-[var(--primary-green-400)]"
                >
                  EDIT PROFILE
                </Button1>
              </Link>

              <Button1
                variant="filled"
                color="orange"
                size="sm"
                onClick={handleLogout}
                className="w-[130px] px-5 py-2.5 font-bold rounded-[8px] tracking-[0.7px]"
              >
                LOGOUT
              </Button1>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE ACCOUNT */}

      <div className="mt-16 max-w-[520px] order-4">
        <h3 className="text-[16px] font-bold text-[var(--primary-orange-600)]">
          Delete Your Account
        </h3>

        <p className="text-[12px] leading-[18px] text-[var(--text-grey-4)] mt-3">
          Deleting your account is permanent and cannot be undone. All your
          data, posts, and activity will be permanently removed. Please make
          sure you want to continue before proceeding.
        </p>

        <Button1
          variant="filled"
          color="orange"
          size="sm"
          onClick={handleLogout}
          className="mt-5 px-6 py-2.5 font-bold rounded-[8px] tracking-[0.7px]"
        >
          DELETE ACCOUNT
        </Button1>
      </div>
    </div>
  );
};

export default ProfileOverview;

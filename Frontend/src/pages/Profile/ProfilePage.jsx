import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavbarHomepage from "../../components/common/NavbarHomepage";
import NavbarProfile from "../../components/common/NavbarProfile";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

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

          {/* Main Container */}
          <Outlet />
        </section>

        <Footer className="mt-0" />
      </main>
    </>
  );
};

export default ProfilePage;

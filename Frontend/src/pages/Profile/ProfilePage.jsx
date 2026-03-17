import React from "react";
import { Helmet } from "react-helmet";
import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavbarHomepage from "../../components/common/NavbarHomepage";
import NavbarProfile from "../../components/common/NavbarProfile";

import { Outlet } from "react-router-dom";

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

      <main className="min-h-screen flex flex-col w-full bg-white">
        <ContactBar />

        <section className="w-full flex-grow">
          <NavbarHomepage activePage="home" showBorder={true} />

          <NavbarProfile />

          {/* Main Container */}
          <Outlet />
        </section>

        <Footer className="mt-0" />
      </main>
    </>
  );
};

export default ProfilePage;

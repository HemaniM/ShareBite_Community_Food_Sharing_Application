import React from 'react';
import { Helmet } from 'react-helmet';
import ContactBar from '../../components/common/ContactBar';
import Footer from '../../components/common/Footer';
import HeroSection from './HeroSection';
import SearchSection from './SearchSection';
import CategoriesSection from './CategoriesSection';
import TrustedDonorsSection from './TrustedDonorsSection';
import FoodNearYouSection from './FoodNearYouSection';
import RecentlyUploadedSection from './RecentlyUploadedSection';
import AllProductsSection from './AllProductsSection';
import MapSection from './MapSection';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>ShareBite Food Sharing Platform | Reduce Waste, Feed Community</title>
        <meta name="description" content="Join ShareBite's mission to reduce food waste by sharing surplus meals with your community. Discover nearby food, connect with trusted donors, and make a difference." />
        <meta property="og:title" content="ShareBite Food Sharing Platform | Reduce Waste, Feed Community" />
        <meta property="og:description" content="Join ShareBite's mission to reduce food waste by sharing surplus meals with your community. Discover nearby food, connect with trusted donors, and make a difference." />
      </Helmet>

      <main className="w-full bg-[#ffffff]">
        <ContactBar />
        <HeroSection />
        <SearchSection />
        <CategoriesSection />
        <TrustedDonorsSection />
        <FoodNearYouSection />
        <RecentlyUploadedSection />
        <AllProductsSection />
        <MapSection />
        <Footer />
      </main>
    </>
  );
};

export default Homepage;

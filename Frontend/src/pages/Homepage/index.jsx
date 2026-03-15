import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import CategoriesSection from "./CategoriesSection";
import TrustedDonorsSection from "./TrustedDonorsSection";
import FoodNearYouSection from "./FoodNearYouSection";
import RecentlyUploadedSection from "./RecentlyUploadedSection";
import AllProductsSection from "./AllProductsSection";
import MapSection from "./MapSection";

const slugifyProductName = (name = "") =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const Homepage = () => {
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    if (!item?.id) {
      return;
    }
    console.log(item);
    const productSlug = slugifyProductName(
      item?.title || item?.name || "product",
    );

    navigate(`/product/${item.id}/${productSlug}`, {
      state: {
        product: item,
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>
          ShareBite Food Sharing Platform | Reduce Waste, Feed Community
        </title>
        <meta
          name="description"
          content="Join ShareBite's mission to reduce food waste by sharing surplus meals with your community. Discover nearby food, connect with trusted donors, and make a difference."
        />
        <meta
          property="og:title"
          content="ShareBite Food Sharing Platform | Reduce Waste, Feed Community"
        />
        <meta
          property="og:description"
          content="Join ShareBite's mission to reduce food waste by sharing surplus meals with your community. Discover nearby food, connect with trusted donors, and make a difference."
        />
      </Helmet>

      <main className="w-full bg-[#ffffff]">
        <ContactBar />
        <HeroSection />
        <SearchSection />
        <CategoriesSection />
        <TrustedDonorsSection onProductClick={handleProductClick} />
        <FoodNearYouSection onProductClick={handleProductClick} />
        <RecentlyUploadedSection onProductClick={handleProductClick} />
        <AllProductsSection onProductClick={handleProductClick} />
        <MapSection />
        <Footer />
      </main>
    </>
  );
};

export default Homepage;

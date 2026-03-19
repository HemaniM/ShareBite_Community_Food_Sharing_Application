import React, { useEffect, useMemo } from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchActiveListings } from "../../features/listings/listingsSlice";

const slugifyProductName = (name = "") =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const isDisplayableListing = (listing = {}) => {
  const expiresAtTime = new Date(listing.expiresAt).getTime();
  const hasFutureExpiry = Number.isFinite(expiresAtTime)
    ? expiresAtTime > Date.now()
    : false;

  return (
    listing.status === "available" &&
    hasFutureExpiry &&
    Number(listing?.stock?.quantity || 0) > 0
  );
};

const mapListingToProduct = (listing) => ({
  id: listing._id,
  title: listing.title,
  image: listing.images?.[0] || "/images/Meals_image.jpg",
  location: [listing.location?.city, listing.location?.state]
    .filter(Boolean)
    .join(", ")
    .toUpperCase(),
  price: listing.price?.isFree ? 0 : listing.price?.amount || 0,
  priceColor: listing.price?.isFree ? "#7d8d2a" : "#d99338",
  status: listing.status,
  expiresAt: listing.expiresAt,
  stock: listing.stock,
  rawListing: listing,
});

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeListings, activeListingsLoading, activeListingsError } =
    useAppSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchActiveListings());
  }, [dispatch]);

  const allProducts = useMemo(
    () => activeListings.filter(isDisplayableListing).map(mapListingToProduct),
    [activeListings],
  );

  const navigateToBrowsePage = (filters = {}) => {
    const browseFilters = {
      sourceSection: "",
      category: "",
      location: "",
      budget: "",
      ...filters,
    };

    const queryParams = new URLSearchParams();
    queryParams.set("sourceSection", browseFilters.sourceSection);
    queryParams.set("category", browseFilters.category);
    queryParams.set("location", browseFilters.location);
    queryParams.set("budget", browseFilters.budget);

    navigate(`/products?${queryParams.toString()}`, {
      state: browseFilters,
    });
  };

  const handleProductClick = (item) => {
    if (!item?.id) {
      return;
    }

    const productSlug = slugifyProductName(
      item?.title || item?.name || "product",
    );

    navigate(`/product/${item.id}/${productSlug}`, {
      state: {
        product: item,
      },
    });
  };

  const handleViewMoreClick = (sectionName) => {
    navigateToBrowsePage({
      sourceSection: sectionName,
    });
  };

  const handleCategoryClick = (categoryName) => {
    navigateToBrowsePage({
      category: categoryName,
    });
  };

  const handleSearch = ({ location = "", category = "", budget = "" }) => {
    navigateToBrowsePage({
      location,
      category,
      budget,
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
        <SearchSection onSearch={handleSearch} />
        <CategoriesSection onCategoryClick={handleCategoryClick} />
        <TrustedDonorsSection
          onProductClick={handleProductClick}
          onViewMoreClick={() =>
            handleViewMoreClick("from_most_trusted_donors")
          }
        />
        <FoodNearYouSection
          onProductClick={handleProductClick}
          onViewMoreClick={() => handleViewMoreClick("food_near_you")}
        />
        <RecentlyUploadedSection
          onProductClick={handleProductClick}
          onViewMoreClick={() => handleViewMoreClick("recently_uploaded")}
        />
        <AllProductsSection
          products={allProducts}
          loading={activeListingsLoading}
          error={activeListingsError}
          onProductClick={handleProductClick}
          onViewMoreClick={() => handleViewMoreClick("all_products")}
        />
        <MapSection />
        <Footer />
      </main>
    </>
  );
};

export default Homepage;

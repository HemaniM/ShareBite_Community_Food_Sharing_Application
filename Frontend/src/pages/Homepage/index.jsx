import React, { useEffect, useMemo, useRef } from "react";
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
import {
  fetchActiveListings,
  fetchFoodNearYouListings,
  fetchMostTrustedDonorListings,
  fetchRecentlyUploadedListings,
} from "../../features/listings/listingsSlice";
import {
  isDisplayableListing,
  mapListingToProduct,
  slugifyProductName,
} from "../../utils/listingTransforms";
import { resolveUserLocationContext } from "../../utils/locationContext";

const Homepage = () => {
  const foodNearYouRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    activeListings,
    activeListingsLoading,
    activeListingsError,
    foodNearYouListings,
    foodNearYouLoading,
    foodNearYouError,
    recentlyUploadedListings,
    recentlyUploadedLoading,
    recentlyUploadedError,
    mostTrustedDonorListings,
    mostTrustedDonorLoading,
    mostTrustedDonorError,
  } = useAppSelector((state) => state.listings);

  // Get Started Button code *****************
  const scrollToFoodNearYou = () => {
  foodNearYouRef.current?.scrollIntoView({
    behavior: "smooth",
  });
};

  useEffect(() => {
    dispatch(fetchActiveListings());
  }, [dispatch]);

  // Recently Uploaded code **************
  useEffect(() => {
    dispatch(
      fetchRecentlyUploadedListings({
        hours: 24,
      }),
    );
  }, [dispatch]);


  // Most Trusted Donor code **************
  useEffect(() => {
    dispatch(
      fetchMostTrustedDonorListings({
        minRating: 4,
      }),
    );
  }, [dispatch]);


  // Food near you code **************
  useEffect(() => {
    let isMounted = true;

    const loadFoodNearYouListings = async () => {
      const locationContext = await resolveUserLocationContext();

      if (!isMounted) {
        return;
      }

      dispatch(
        fetchFoodNearYouListings({
          ...locationContext,
          limit: 8,
        }),
      );
    };

    loadFoodNearYouListings();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const foodNearYouProducts = useMemo(
    () =>
      foodNearYouListings
        .filter(isDisplayableListing)
        .map(mapListingToProduct)
        .slice(0, 8),
    [foodNearYouListings],
  );
  //**************


  // All Products code **************
  const allProducts = useMemo(
    () => activeListings.filter(isDisplayableListing).map(mapListingToProduct),
    [activeListings],
  );


  // Recently Uploaded code **************
  const recentlyUploadedProducts = useMemo(
    () =>
      recentlyUploadedListings
        .filter(isDisplayableListing)
        .map(mapListingToProduct)
        .slice(0, 8),
    [recentlyUploadedListings],
  );


  // Most Trusted Donor code **************
  const trustedDonorProducts = useMemo(
    () =>
      mostTrustedDonorListings
        .filter(isDisplayableListing)
        .map(mapListingToProduct)
        .slice(0, 13),
    [mostTrustedDonorListings],
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
        <HeroSection onGetStartedClick={scrollToFoodNearYou} />
        <SearchSection onSearch={handleSearch} />
        <CategoriesSection onCategoryClick={handleCategoryClick} />
        <TrustedDonorsSection
          products={trustedDonorProducts}
          loading={mostTrustedDonorLoading}
          error={mostTrustedDonorError}
          onProductClick={handleProductClick}
          onViewMoreClick={() =>
            handleViewMoreClick("from_most_trusted_donors")
          }
        />
        <div ref={foodNearYouRef}>
        <FoodNearYouSection
          products={foodNearYouProducts}
          loading={foodNearYouLoading}
          error={foodNearYouError}
          onProductClick={handleProductClick}
          onViewMoreClick={() => handleViewMoreClick("food_near_you")}
          />
        </div>
        <RecentlyUploadedSection
          products={recentlyUploadedProducts}
          loading={recentlyUploadedLoading}
          error={recentlyUploadedError}
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
        {/* <MapSection /> */}
        <Footer />
      </main>
    </>
  );
};

export default Homepage;

import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Button1 from "../../components/ui/Button1";
import ProductCard from "../../components/common/ProductCard";
import ContactBar from "../../components/common/ContactBar";
import HeroSection from "../Homepage/HeroSection";
import CategoriesSection from "../Homepage/CategoriesSection";
import SearchSection from "../Homepage/SearchSection";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchActiveListings,
  fetchFoodNearYouListings,
  fetchHomepageFilteredListings,
  fetchMostTrustedDonorListings,
  fetchRecentlyUploadedListings,
} from "../../features/listings/listingsSlice";
import {
  isDisplayableListing,
  mapListingToProduct,
  slugifyProductName,
} from "../../utils/listingTransforms";
import { resolveUserLocationContext } from "../../utils/locationContext";

// const normalizeCategory = (value = "") =>
//   value.toString().trim().toLowerCase().replace(/\s+/g, "-");

// const isWithinBudget = (price, budget) => {
//   if (!budget) return true;

//   if (budget === "free") {
//     return price === 0;
//   }

//   if (budget === ">500") {
//     return price > 500;
//   }

//   if (budget.includes("-")) {
//     const [min, max] = budget.split("-").map(Number);
//     return price >= min && price <= max;
//   }

//   return true;
// };

/* ---------- HEADING HELPER FUNCTION ---------- */
const formatHeading = (text = "") => {
  if (!text) return "";

  return text
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
/* ----------------------------------------- */

const SUPPORTED_SOURCE_SECTIONS = {
  all_products: {
    mode: "active_listings",
    heading: "All Food Posts",
  },
  food_near_you: {
    mode: "food_near_you",
    heading: "Food Near You",
  },
  recently_uploaded: {
    mode: "recently_uploaded",
    heading: "Recently Uploaded",
  },
  from_most_trusted_donors: {
    mode: "most_trusted_donors",
    heading: "From Most Trusted Donors",
  },
};

const ProductListingPage = () => {
  const locationHook = useLocation();
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
    homepageFilteredListings,
    homepageFilteredLoading,
    homepageFilteredError,
  } = useAppSelector((state) => state.listings);

  // useEffect(() => {
  //   dispatch(fetchActiveListings());
  // }, [dispatch]);

  const routeQuery = new URLSearchParams(locationHook.search);
  const routeState = locationHook.state || {};

  const sourceSection =
    routeQuery.get("sourceSection") ?? routeState.sourceSection ?? "";
  const category = routeQuery.get("category") ?? routeState.category ?? "";
  const location = routeQuery.get("location") ?? routeState.location ?? "";
  const budget = routeQuery.get("budget") ?? routeState.budget ?? "";

  // DATA FETCHING PLAN ***************
  const fetchPlan = useMemo(() => {
    const sourceConfig = SUPPORTED_SOURCE_SECTIONS[sourceSection];

    const hasSearchFilters =
      Boolean(category?.trim()) || Boolean(location?.trim()) || Boolean(budget);

      
    if (sourceConfig) {
      return {
        ...sourceConfig,
      };
    }

    // Initial setup for upcoming route-driven APIs:
    // - Category specific feed (case 2)
    // - Search filter feed (case 3)
    // Until dedicated backend endpoints are ready, these flows use active listings
    // and apply client-side filtering below.
    if (hasSearchFilters) {
      return {
        mode: "homepage_filtered",
        heading: "Food Results",
      };
    }

    return {
      mode: "active_listings",
      heading: formatHeading(category) || "Food Results",
    };
  }, [budget, category, location, sourceSection]);

  useEffect(() => {
    let isMounted = true;

    const loadListings = async () => {
      if (fetchPlan.mode === "food_near_you") {
        let locationContext = {};

        if (location) {
          locationContext = { city: location.trim() };
        } else {
          locationContext = await resolveUserLocationContext();
        }

        if (!isMounted) {
          return;
        }

        dispatch(fetchFoodNearYouListings(locationContext));
        return;
      }
      if (fetchPlan.mode === "recently_uploaded") {
        dispatch(
          fetchRecentlyUploadedListings({
            hours: 12,
          }),
        );
        return;
      }
      if (fetchPlan.mode === "homepage_filtered") {
        dispatch(
          fetchHomepageFilteredListings({
            location,
            category,
            budget,
          }),
        );
        return;
      }
      if (fetchPlan.mode === "most_trusted_donors") {
        dispatch(
          fetchMostTrustedDonorListings({
            minRating: 4,
          }),
        );
        return;
      }

      dispatch(fetchActiveListings());
    };

    loadListings();

    return () => {
      isMounted = false;
    };
  }, [budget, category, dispatch, fetchPlan.mode, location]);

  // const normalizedCategory = normalizeCategory(category);

  const selectedListings = useMemo(() => {
    if (fetchPlan.mode === "food_near_you") {
      return foodNearYouListings;
    }
    if (fetchPlan.mode === "recently_uploaded") {
      return recentlyUploadedListings;
    }
    if (fetchPlan.mode === "homepage_filtered") {
      return homepageFilteredListings;
    }
    if (fetchPlan.mode === "most_trusted_donors") {
      return mostTrustedDonorListings;
    }
    return activeListings;
  }, [
    activeListings,
    fetchPlan.mode,
    foodNearYouListings,
    homepageFilteredListings,
    mostTrustedDonorListings,
    recentlyUploadedListings,
  ]);

  const selectedLoading = useMemo(() => {
    if (fetchPlan.mode === "food_near_you") {
      return foodNearYouLoading;
    }

    if (fetchPlan.mode === "recently_uploaded") {
      return recentlyUploadedLoading;
    }

    if (fetchPlan.mode === "homepage_filtered") {
      return homepageFilteredLoading;
    }
    if (fetchPlan.mode === "most_trusted_donors") {
      return mostTrustedDonorLoading;
    }

    return activeListingsLoading;
  }, [
    activeListingsLoading,
    fetchPlan.mode,
    foodNearYouLoading,
    homepageFilteredLoading,
    mostTrustedDonorLoading,
    recentlyUploadedLoading,
  ]);

  const selectedError = useMemo(() => {
    if (fetchPlan.mode === "food_near_you") {
      return foodNearYouError;
    }
    if (fetchPlan.mode === "recently_uploaded") {
      return recentlyUploadedError;
    }
    if (fetchPlan.mode === "homepage_filtered") {
      return homepageFilteredError;
    }
    if (fetchPlan.mode === "most_trusted_donors") {
      return mostTrustedDonorError;
    }
    return activeListingsError;
  }, [
    activeListingsError,
    fetchPlan.mode,
    foodNearYouError,
    homepageFilteredError,
    mostTrustedDonorError,
    recentlyUploadedError,
  ]);

  const allProducts = useMemo(
    () =>
      selectedListings.filter(isDisplayableListing).map(mapListingToProduct),
    [selectedListings],
  );

  const filteredProducts = allProducts;
  
  // const selectedListings =
  //   fetchPlan.mode === "food_near_you" ? foodNearYouListings : activeListings;
  // const selectedLoading =
  //   fetchPlan.mode === "food_near_you"
  //     ? foodNearYouLoading
  //     : activeListingsLoading;
  // const selectedError =
  //   fetchPlan.mode === "food_near_you" ? foodNearYouError : activeListingsError;

  // const allProducts = useMemo(
  //   () =>
  //     selectedListings.filter(isDisplayableListing).map(mapListingToProduct),
  //   [selectedListings],
  // );

  // const filteredProducts = useMemo(
  //   () =>
  //     allProducts.filter((product) => {
  //       const productCategory = normalizeCategory(product.category);
  //       const productLocation = `${product.location} ${product.fullLocation}`
  //         .toLowerCase()
  //         .trim();

  //       const matchCategory = normalizedCategory
  //         ? productCategory === normalizedCategory
  //         : true;

  //       const matchLocation = location
  //         ? productLocation.includes(location.toLowerCase().trim())
  //         : true;

  //       const matchBudget = isWithinBudget(product.price, budget);

  //       return matchCategory && matchLocation && matchBudget;
  //     }),
  //   [allProducts, budget, location, normalizedCategory],
  // );

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

  const handleCategoryClick = (categoryName) => {
    navigateToBrowsePage({
      category: categoryName,
    });
  };

  const handleSearch = ({
    location: nextLocation = "",
    category = "",
    budget = "",
  }) => {
    navigateToBrowsePage({
      location: nextLocation,
      category,
      budget,
    });
  };

  const handleProductClick = (product) => {
    if (!product?.id) {
      return;
    }

    const productSlug = slugifyProductName(product.title || "product");

    navigate(`/product/${product.id}/${productSlug}`, {
      state: {
        product,
      },
    });
  };

  const heading =
    fetchPlan.heading ||
    formatHeading(sourceSection) ||
    formatHeading(category) ||
    "Food Results";

  const isUnsupportedSourceSection =
    Boolean(sourceSection) && !SUPPORTED_SOURCE_SECTIONS[sourceSection];

  return (
    <main className="min-h-screen flex flex-col w-full bg-white">
      <ContactBar />
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      <CategoriesSection onCategoryClick={handleCategoryClick} />

      <section className="w-full py-[80px] px-5 bg-[#fffaef]">
        <div className="w-full max-w-[975px] mx-auto">
          <h1 className="mb-[40px] text-[22px] font-bold text-black tracking-[0.5px]">
            {heading}
          </h1>

          {isUnsupportedSourceSection ? (
            <div className="mb-6 rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent p-4 text-[14px] text-[var(--text-grey-4)]">
              API mapping for <strong>{formatHeading(sourceSection)}</strong> is
              not available yet. Showing default product listing for now.
            </div>
          ) : null}

          {selectedLoading ? (
            <div className="rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent p-6 text-[var(--text-grey-4)]">
              Loading available food posts...
            </div>
          ) : selectedError ? (
            <div className="rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent p-6 text-[var(--text-grey-4)]">
              {selectedError}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex items-center justify-between rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent p-6">
              <p className="text-[var(--text-grey-4)] text-[16px] mb-4">
                No products found for selected filters.
              </p>
              <Button1
                variant="filled"
                color="green"
                size="md"
                className="py-3 px-8 font-semibold tracking-[0.5px] uppercase"
                onClick={() => navigate("/home")}
              >
                Go to Homepage
              </Button1>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priceColor={product.priceColor}
                  onProductClick={() => handleProductClick(product)}
                  onRequest={() => handleProductClick(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProductListingPage;

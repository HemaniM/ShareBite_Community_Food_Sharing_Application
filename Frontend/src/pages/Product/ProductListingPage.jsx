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
import { fetchActiveListings } from "../../features/listings/listingsSlice";
import {
  isDisplayableListing,
  mapListingToProduct,
  slugifyProductName,
} from "../../utils/listingTransforms";

const normalizeCategory = (value = "") =>
  value.toString().trim().toLowerCase().replace(/\s+/g, "-");

const isWithinBudget = (price, budget) => {
  if (!budget) return true;

  if (budget === "free") {
    return price === 0;
  }

  if (budget === ">500") {
    return price > 500;
  }

  if (budget.includes("-")) {
    const [min, max] = budget.split("-").map(Number);
    return price >= min && price <= max;
  }

  return true;
};

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

const ProductListingPage = () => {
  const locationHook = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeListings, activeListingsLoading, activeListingsError } =
    useAppSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchActiveListings());
  }, [dispatch]);

  const routeQuery = new URLSearchParams(locationHook.search);
  const routeState = locationHook.state || {};

  const sourceSection =
    routeQuery.get("sourceSection") ?? routeState.sourceSection ?? "";
  const category = routeQuery.get("category") ?? routeState.category ?? "";
  const location = routeQuery.get("location") ?? routeState.location ?? "";
  const budget = routeQuery.get("budget") ?? routeState.budget ?? "";

  const normalizedCategory = normalizeCategory(category);

  const allProducts = useMemo(
    () => activeListings.filter(isDisplayableListing).map(mapListingToProduct),
    [activeListings],
  );

  const filteredProducts = useMemo(
    () =>
      allProducts.filter((product) => {
        const productCategory = normalizeCategory(product.category);
        const productLocation = `${product.location} ${product.fullLocation}`
          .toLowerCase()
          .trim();

        const matchCategory = normalizedCategory
          ? productCategory === normalizedCategory
          : true;

        const matchLocation = location
          ? productLocation.includes(location.toLowerCase().trim())
          : true;

        const matchBudget = isWithinBudget(product.price, budget);

        return matchCategory && matchLocation && matchBudget;
      }),
    [allProducts, budget, location, normalizedCategory],
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
    sourceSection === "all_products"
      ? "All Food Posts"
      : formatHeading(sourceSection) ||
        formatHeading(category) ||
        "Food Results";

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

          {activeListingsLoading ? (
            <div className="rounded-xl border border-[#f2ebe5] bg-[#fffaef] p-6 text-[#595957]">
              Loading available food posts...
            </div>
          ) : activeListingsError ? (
            <div className="rounded-xl border border-[#f4c7c3] bg-[#fffaef] p-6 text-[#b45309]">
              {activeListingsError}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-[#f2ebe5] bg-[#fffaef] p-6">
              <p className="text-[#595957] mb-4">
                No products found for selected filters.
              </p>
              <Button1
                variant="filled"
                color="green"
                size="md"
                className="w-[180px]"
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

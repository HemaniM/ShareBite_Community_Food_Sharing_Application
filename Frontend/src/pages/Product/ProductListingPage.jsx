import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarHomepage from "../../components/common/NavBarHomepage";
import Footer from "../../components/common/Footer";
import Button1 from "../../components/ui/Button1";
import ProductCard from "../../components/common/ProductCard";
import ContactBar from "../../components/common/ContactBar";
import HeroSection from "../Homepage/HeroSection";
import CategoriesSection from "../Homepage/CategoriesSection";
import SearchSection from "../Homepage/SearchSection";

const PRODUCTS = [
  {
    id: 1,
    title: "Poha",
    image: "/images/Poha.jpg",
    location: "BHAYANDER",
    price: 20,
    category: "snacks",
    sections: ["food_near_you", "recently_uploaded"],
  },
  {
    id: 2,
    title: "Lunch Box",
    image: "/images/Lunch_Box.jpg",
    location: "BHAYANDER",
    price: 40,
    category: "meals",
    sections: ["food_near_you", "from_most_trusted_donors"],
  },
  {
    id: 3,
    title: "Rajama Chaval",
    image: "/images/Rajama_Chawal.jpg",
    location: "MALAD",
    price: 0,
    category: "meals",
    sections: ["from_most_trusted_donors", "recently_uploaded"],
  },
  {
    id: 4,
    title: "Dry Fruits Pack",
    image: "/images/Dry_Fruits_Pack.jpg",
    location: "BHAYANDER",
    price: 100,
    category: "groceries",
    sections: ["food_near_you"],
  },
  {
    id: 5,
    title: "Pineapple Juice",
    image: "/images/Pineapple_Juice.jpg",
    location: "MIRA ROAD",
    price: 0,
    category: "drinks",
    sections: ["recently_uploaded"],
  },
  {
    id: 6,
    title: "Spring Rolls",
    image: "/images/Spring_Rolls.jpg",
    location: "ANDHERI",
    price: 15,
    category: "fast-food",
    sections: ["recently_uploaded", "food_near_you"],
  },
];

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

  const routeQuery = new URLSearchParams(locationHook.search);
  const routeState = locationHook.state || {};

  const sourceSection =
    routeQuery.get("sourceSection") ?? routeState.sourceSection ?? "";
  const category = routeQuery.get("category") ?? routeState.category ?? "";
  const location = routeQuery.get("location") ?? routeState.location ?? "";
  const budget = routeQuery.get("budget") ?? routeState.budget ?? "";

  const normalizedCategory = normalizeCategory(category);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchSection = sourceSection
      ? product.sections.includes(sourceSection)
      : true;

    const matchCategory = normalizedCategory
      ? normalizeCategory(product.category) === normalizedCategory
      : true;

    const matchLocation = location
      ? product.location.toLowerCase().includes(location.toLowerCase().trim())
      : true;

    const matchBudget = isWithinBudget(product.price, budget);

    return matchSection && matchCategory && matchLocation && matchBudget;
  });

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

  /* ---------- DYNAMIC HEADING ---------- */
  const heading =
    formatHeading(sourceSection) || formatHeading(category) || "Food Results";
  /* ------------------------------------- */

  console.log(routeState);

  return (
    <main className="min-h-screen flex flex-col w-full bg-white">
      <ContactBar />
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      <CategoriesSection onCategoryClick={handleCategoryClick} />

      <section className="w-full py-[80px] px-5 bg-[#fffaef]">
        <div className="w-full max-w-[1100px] mx-auto">
          <h1 className="mb-[40px] text-[22px] font-bold text-black tracking-[0.5px]">
            {heading}
          </h1>

          {filteredProducts.length === 0 ? (
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
                <ProductCard key={product.id} product={product} />
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

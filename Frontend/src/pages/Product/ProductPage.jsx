import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavbarHomepage from "../../components/common/NavBarHomepage";
import ProductCard from "../../components/common/ProductCard";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { fetchActiveListings } from "../../features/listings/listingsSlice";
import {
  isDisplayableListing,
  mapListingToProduct,
  slugifyProductName,
} from "../../utils/listingTransforms";

const reviewData = [
  {
    id: 1,
    userId: "1",
    name: "Aanya Mishra",
    image: "/images/Ananya_Mishra.jpg",
    date: "4/10/2025",
    rating: 4.5,
    location: "Bhayander (E)",
    comment:
      "Great initiative by the Share-Fresh. Hygiene for dry mix was rich then. Shared thoughtful food for the community in need.",
  },
  {
    id: 2,
    userId: "2",
    name: "Aarav Shah",
    image: "/images/Aarav_Shah.jpg",
    date: "15/8/2025",
    rating: 4,
    location: "Bhayander (E)",
    comment:
      "Fresh and well-packed vegetable pulao. Nicely packed and safe to consume. Really appreciate the care taken while sharing.",
  },
  {
    id: 3,
    userId: "3",
    name: "Kavya Malkiye",
    image: "/images/Kavya_Melviya.jpg",
    date: "20/12/2025",
    rating: 3.5,
    location: "Bhayander (E)",
    comment:
      "Soft, flavorful homemade chapatis shared in perfect condition. Serving great hygiene and thoughtfulness.",
  },
];

const formatExpiryText = (expiresAt) => {
  if (!expiresAt) {
    return "Not specified";
  }

  const expiryDate = new Date(expiresAt);

  if (Number.isNaN(expiryDate.getTime())) {
    return "Not specified";
  }

  return expiryDate.toLocaleString();
};

const ProductPage = () => {
  const { productId, productName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const { activeListings, activeListingsLoading } = useAppSelector(
    (state) => state.listings,
  );

  useEffect(() => {
    dispatch(fetchActiveListings());
  }, [dispatch]);

  const allProducts = useMemo(
    () => activeListings.filter(isDisplayableListing).map(mapListingToProduct),
    [activeListings],
  );

  const productFromNavigation = location.state?.product;
  const product = useMemo(() => {
    if (productFromNavigation?.id === productId) {
      return productFromNavigation;
    }

    return allProducts.find((item) => item.id === productId) || null;
  }, [allProducts, productFromNavigation, productId]);

  const relatedProducts = useMemo(
    () => allProducts.filter((item) => item.id !== productId).slice(0, 8),
    [allProducts, productId],
  );

  const readableProductName = productName?.split("-").join(" ");
  const stockQuantity = Number(product?.stock?.quantity || 0);
  const stockUnit = product?.stock?.unit || "Plates";
  const stockLabel = product
    ? `${stockQuantity} ${stockUnit}`
    : "Not available";
  const maxQuantity = Math.max(1, stockQuantity || 1);
  const productDescription =
    product?.description ||
    "No description has been shared for this food post yet.";
  const productIngredients = Array.isArray(product?.ingredients)
    ? product.ingredients.filter(Boolean).join(", ")
    : product?.ingredients || "Not specified";
  const productContact = [
    product?.contactInfo?.phoneNumber,
    product?.contactInfo?.alternatePhoneNumber,
    product?.contactInfo?.email,
  ]
    .filter(Boolean)
    .join(", ");

  const handleProductClick = (item) => {
    if (!item?.id) {
      return;
    }

    const productSlug = slugifyProductName(item.title || "product");

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
          {product?.title || readableProductName || "Product"} | ShareBite
        </title>
      </Helmet>

      <main className="w-full bg-white">
        <ContactBar />
        <section className="w-full">
          <NavbarHomepage showBorder={true} />

          <div className="mx-auto w-full max-w-[975px] py-2 mt-[50px] mb-[100px]">
            {!product && activeListingsLoading ? (
              <p className="text-[16px] text-[var(--text-grey-4)]">
                Loading product details...
              </p>
            ) : !product ? (
              <div className="rounded-[12px] border border-[#f2ebe5] bg-[#fffaef] p-6 text-center">
                <p className="text-[16px] text-[var(--text-grey-4)]">
                  This food post is no longer available.
                </p>
                <Button1
                  variant="filled"
                  color="green"
                  className="mt-4 rounded-[8px] px-6 py-3 text-[13px] font-bold"
                  onClick={() =>
                    navigate(
                      "/products?sourceSection=all_products&category=&location=&budget=",
                    )
                  }
                >
                  Browse all food posts
                </Button1>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-[50px] md:grid-cols-[360px_1fr]">
                  <div className="h-[420px] w-[350px] overflow-hidden rounded-[12px]">
                    <img
                      src={product?.image || "/images/Tandoori_Paneer.jpg"}
                      alt={product?.title || "Product"}
                      className="h-[420px] w-[350px] object-cover"
                    />
                  </div>

                  <div>
                    <div className="mb-[15px] inline-flex rounded-full border border-[var(--primary-orange-200)] px-[20px] py-[5px] text-[12px] font-semibold text-[var(--text-grey-4)]">
                      {product?.category || "Meal"}
                    </div>
                    <h1 className="text-[22px] font-bold uppercase text-black">
                      {product?.title || readableProductName || "Product"}
                    </h1>
                    <p className="mt-[10px] text-[18px] font-bold uppercase text-[var(--primary-green-700)]">
                      {product?.price === 0
                        ? "FREE /-"
                        : `${product?.price || 0} ₹/-`}
                    </p>

                    <div className="mt-[35px] flex flex-wrap items-center gap-[14px] text-[14px] font-bold text-[var(--text-grey-5)]">
                      <span>
                        {stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                      <span className="rounded-[8px] bg-[var(--primary-green-50)] px-[10px] py-[4px] font-semibold text-[var(--primary-green-700)]">
                        {stockLabel}
                      </span>
                    </div>

                    <div className="mt-[25px] text-[12px] leading-5 text-[var(--text-grey-4)]">
                      {product?.donorId ? (
                        <Link
                          to={`/user/${product.donorId}`}
                          className="mb-[5px] inline-block text-14 font-bold text-[var(--text-grey-5)] transition hover:text-orange"
                        >
                          {product?.donorName || "ShareBite Donor"}
                        </Link>
                      ) : (
                        <p className="mb-[5px] text-14 font-bold text-[var(--text-grey-5)]">
                          {product?.donorName || "ShareBite Donor"}
                        </p>
                      )}

                      <p>{productDescription}</p>
                    </div>

                    <div className="mt-[25px]">
                      <div className="h-[34px] w-[96px] flex items-center rounded-[8px]">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((previous) => Math.max(1, previous - 1))
                          }
                          className="h-[34px] w-[32px] text-[16px] border border-[var(--text-grey-2)] font-bold text-[var(--text-grey-4)] rounded-tl-[8px] rounded-bl-[8px] hover:bg-[var(--primary-green-200)] hover:border-[var(--primary-green-200)]"
                        >
                          -
                        </button>
                        <span className="h-[34px] w-[32px] border-t border-b border-[var(--text-grey-2)] text-center text-[14px] font-semibold text-[var(--text-grey-4)] p-2">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((previous) =>
                              Math.min(maxQuantity, previous + 1),
                            )
                          }
                          className="h-[34px] w-[32px] border border-[var(--text-grey-2)] rounded-tr-[8px] rounded-br-[8px] text-[16px] font-bold text-[var(--text-grey-4)] hover:bg-[var(--primary-green-200)] hover:border-[var(--primary-green-200)]"
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-[15px] flex items-center gap-[20px]">
                        <Button1
                          variant="filled"
                          color="orange"
                          className="rounded-[8px] px-[25px] py-[10px] font-bold text-[13px]"
                        >
                          REQUEST
                        </Button1>
                      </div>
                    </div>
                    <div className="mt-[35px] rounded-[8px] border border-[var(--white-600)] text-[12px] text-[var(--text-grey-4)]">
                      <p className="border-b p-4 border-[var(--white-600)] text-[14px] font-bold text-[var(--text-grey-5)]">
                        Description
                      </p>

                      <div className="p-4 flex flex-col gap-[12px]">
                        <p>
                          <span className="font-semibold text-[var(--text-grey-5)] mr-[52px]">
                            Expiry Date
                          </span>
                          {formatExpiryText(product?.expiresAt)}
                        </p>
                        <p className="md:row-span-3 flex items-start">
                          <span className="font-semibold text-[var(--text-grey-5)] mr-[55px]">
                            Ingredients
                          </span>
                          {productIngredients}
                        </p>
                        <p className="md:row-span-2 flex items-start">
                          <span className="font-semibold text-[var(--text-grey-5)] mr-[70px]">
                            Location
                          </span>
                          {product?.fullLocation ||
                            product?.location ||
                            "Not specified"}
                        </p>
                        <p>
                          <span className="font-semibold text-[var(--text-grey-5)] mr-[8px]">
                            Contact Information
                          </span>
                          {productContact || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[70px] rounded-[12px] border border-[#eceae4] bg-white p-6">
                  <h2 className="text-[22px] font-bold text-black">
                    Ratings & Reviews Of{" "}
                    {product?.donorName || "ShareBite Donor"}
                  </h2>

                  <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="min-w-[160px] shrink-0">
                      <div className="flex items-end gap-2">
                        <p className="text-[44px] font-bold leading-none text-[#2e2c27]">
                          4/5
                        </p>
                        <Icon name="star_icon_md" />
                      </div>
                      <p className="mt-4 text-[16px] text-[var(--text-grey-4)]">
                        50 Reviews
                      </p>

                      <Button1
                        type="button"
                        variant="filled"
                        color="green"
                        size="sm"
                        className="mt-6 rounded-full bg-[var(--primary-green-50)] px-[20px] py-[6px] text-[14px] font-medium normal-case text-[var(--text-grey-4)]"
                      >
                        <span className="mr-[10px]">
                          <Icon name="green_tick_icon" />
                        </span>
                        Trusted
                      </Button1>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                      <div className="flex min-w-max gap-4 pb-2">
                        {reviewData.map((review) => (
                          <article
                            key={review.id}
                            className="w-[320px] shrink-0 rounded-[14px] border border-[#eceae4] bg-[#fffdf9] p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                {review.userId ? (
                                  <Link
                                    to={`/user/${review.userId}`}
                                    className="flex items-center gap-3"
                                  >
                                    <img
                                      src={review.image}
                                      alt={review.name}
                                      className="h-12 w-12 rounded-full object-cover transition hover:opacity-90"
                                    />
                                    <p className="text-[14px] font-bold tracking-[0.2px] text-[var(--text-grey-5)] transition hover:text-orange">
                                      {review.name}
                                    </p>
                                  </Link>
                                ) : (
                                  <>
                                    <img
                                      src={review.image}
                                      alt={review.name}
                                      className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <p className="text-[14px] font-bold tracking-[0.2px] text-[var(--text-grey-5)]">
                                      {review.name}
                                    </p>
                                  </>
                                )}
                              </div>
                              <p className="text-[12px] text-[var(--text-grey-4)]">
                                {review.date}
                              </p>
                            </div>
                            <p className="mt-5 text-[13px] leading-7 text-[var(--text-grey-4)]">
                              “{review.comment}”
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[70px]">
                  <div className="mb-[35px] flex items-center justify-between">
                    <h2 className="text-[20px] font-bold uppercase text-black">
                      Browse More Food Posts
                    </h2>
                    <Button1
                      variant="filled"
                      color="green"
                      size="sm"
                      className="h-[34px] w-[47px] rounded-[10px]"
                      onClick={() =>
                        navigate(
                          "/products?sourceSection=all_products&category=&location=&budget=",
                        )
                      }
                      aria-label="Show all food posts"
                    >
                      <Icon name="right_arrow" />
                    </Button1>
                  </div>

                  {relatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {relatedProducts.map((relatedProduct) => (
                        <ProductCard
                          key={relatedProduct.id}
                          product={relatedProduct}
                          priceColor={relatedProduct.priceColor}
                          onProductClick={() =>
                            handleProductClick(relatedProduct)
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[12px] border border-[#f2ebe5] bg-[#fffaef] px-6 py-8 text-center text-[#6b6961]">
                      No additional food posts are available right now.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default ProductPage;

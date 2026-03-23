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
  clearRequestFeedback,
  createRequest,
  fetchMyRequests,
} from "../../features/requests/requestsSlice";
import { fetchDonorReviews } from "../../features/reviews/reviewsSlice";
import {
  isDisplayableListing,
  mapListingToProduct,
  slugifyProductName,
} from "../../utils/listingTransforms";

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

const formatReviewDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
};

const ProductPage = () => {
  const { productId, productName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [requestMessage, setRequestMessage] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const { activeListings, activeListingsLoading } = useAppSelector(
    (state) => state.listings,
  );
  const { createLoading } = useAppSelector((state) => state.requests);
  const {
    donorReviews,
    donorReviewsLoading,
    donorAverageRating,
    donorTotalReviews,
  } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchActiveListings());
  }, [dispatch]);

  useEffect(() => {
    if (!toast.message) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setToast({ message: "", type: "success" });
      dispatch(clearRequestFeedback());
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, toast]);

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

  useEffect(() => {
    if (product?.donorId) {
      dispatch(fetchDonorReviews({ donorId: product.donorId }));
    }
  }, [dispatch, product?.donorId, product?.id]);

  const showTrustedBadge =
    donorAverageRating >= 4 || Boolean(product?.rawListing?.donor?.isTrusted);

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

  const handleCreateRequest = async () => {
    if (!product?.id) {
      setToast({ message: "Food post not found", type: "error" });
      return;
    }

    const action = await dispatch(
      createRequest({
        listingId: product.id,
        requestedQuantity: quantity,
        message: requestMessage.trim() || undefined,
      }),
    );

    if (createRequest.fulfilled.match(action)) {
      setToast({
        message: action.payload.message || "Request placed successfully",
        type: "success",
      });
      setRequestMessage("");
      dispatch(fetchMyRequests());
    } else {
      setToast({
        message: action.payload || "Unable to place request",
        type: "error",
      });
    }
  };

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
        {toast.message && (
          <div
            className={`fixed top-5 right-5 z-50 rounded-lg px-4 py-3 text-white shadow-lg ${
              toast.type === "error" ? "bg-orange-500" : "bg-green-500"
            }`}
          >
            {toast.message}
          </div>
        )}
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

                      <label className="mt-4 block text-[12px] font-semibold text-[var(--text-grey-5)]">
                        Request message (optional)
                        <textarea
                          rows="3"
                          value={requestMessage}
                          onChange={(event) =>
                            setRequestMessage(event.target.value)
                          }
                          placeholder="Add a short note for the donor"
                          className="mt-2 w-full max-w-[420px] rounded-[8px] border border-[#e5e4df] px-3 py-2 text-[12px] font-normal text-[var(--text-grey-4)]"
                        />
                      </label>

                      <div className="mt-[15px] flex items-center gap-[20px]">
                        <Button1
                          variant="filled"
                          color="orange"
                          className="rounded-[8px] px-[25px] py-[10px] font-bold text-[13px]"
                          onClick={handleCreateRequest}
                          disabled={createLoading || stockQuantity <= 0}
                        >
                          {createLoading ? "REQUESTING..." : "REQUEST"}
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

                <div className="mt-[70px] rounded-[12px] bg-white">
                  <h2 className="text-[22px] font-bold text-black">
                    Ratings & Reviews Of{" "}
                    {product?.donorName || "ShareBite Donor"}
                  </h2>

                  <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="min-w-[160px] shrink-0">
                      <div className="flex gap-2 items-center">
                        <p className="text-[44px] font-bold leading-none text-[#2e2c27]">
                          {donorTotalReviews
                            ? donorAverageRating.toFixed(1)
                            : "0.0"}
                          /5
                        </p>
                        <Icon name="star_icon_md" />
                      </div>
                      <p className="mt-4 text-[16px] text-[var(--text-grey-4)]">
                        {donorTotalReviews} Reviews
                      </p>

                      {showTrustedBadge ? (
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
                      ) : null}
                    </div>

                    <div className="flex-1 overflow-x-auto no-scrollbar">
                      {donorReviewsLoading ? (
                        <p className="text-[13px] text-[var(--text-grey-4)]">
                          Loading reviews...
                        </p>
                      ) : donorReviews.length === 0 ? (
                        <div className="rounded-[14px] border border-[#eceae4] bg-[#fffdf9] p-4 text-[13px] text-[var(--text-grey-4)]">
                          No reviews have been shared for this donor yet.
                        </div>
                      ) : (
                        <div className="flex min-w-max gap-4 pb-2">
                          {donorReviews.map((review) => {
                            const reviewerId = review.reviewer?._id;
                            const reviewerName =
                              review.reviewer?.name || "Anonymous";
                            const reviewerImage =
                              review.reviewer?.profileImage ||
                              "/images/profile_image.jpg";

                            return (
                              <article
                                key={review._id}
                                className="w-[320px] shrink-0 rounded-[14px] border border-[#eceae4] bg-[#fffdf9] p-4"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    {reviewerId ? (
                                      <Link
                                        to={`/user/${reviewerId}`}
                                        className="flex items-center gap-3"
                                      >
                                        <img
                                          src={reviewerImage}
                                          alt={reviewerName}
                                          className="h-12 w-12 rounded-full object-cover transition hover:opacity-90"
                                        />
                                        <p className="text-[14px] font-bold tracking-[0.2px] text-[var(--text-grey-5)] transition hover:text-orange">
                                          {reviewerName}
                                        </p>
                                      </Link>
                                    ) : null}
                                  </div>
                                  <p className="text-[12px] text-[var(--text-grey-4)]">
                                    {formatReviewDate(review.createdAt)}
                                  </p>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-[var(--text-grey-5)]">
                                  <span>
                                    {Number(review.rating || 0).toFixed(1)}/5
                                  </span>
                                  <Icon name="star_icon_review_page_small" />
                                </div>
                                <p className="mt-5 text-[13px] leading-7 text-[var(--text-grey-4)]">
                                  “{review.comment}”
                                </p>
                              </article>
                            );
                          })}
                        </div>
                      )}
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

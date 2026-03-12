import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";

import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavbarHomepage from "../../components/common/NavBarHomepage";
import ProductCard from "../../components/common/ProductCard";
import Button1 from "../../components/ui/Button1";
import DropdownField from "../../components/ui/DropdownField";
import { Icon } from "../../components/Icons/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { fetchProductById } from "../../features/products/productSlice";

const requestOptions = ["Pickup Today", "Pickup Tomorrow", "Home Delivery"];

const browseMoreItems = [
  {
    id: "lunch-box-1",
    image: "/images/Lunch_Box_1.jpg",
    location: "BHAYANDER",
    title: "Lunch Box",
    price: "40 ₹ /-",
    priceColor: "#d99338",
  },
  {
    id: "kathi-roll-1",
    image: "/images/Kathi_Roll.jpg",
    location: "VASAI",
    title: "Kathi Roll",
    price: "55 ₹ /-",
    priceColor: "#d99338",
  },
  {
    id: "dry-fruits-pack-1",
    image: "/images/Dry_Fruits_Pack.jpg",
    location: "MIRA ROAD",
    title: "Dry Fruits Pack",
    price: "100 ₹ /-",
    priceColor: "#d99338",
  },
  {
    id: "watermelon-juice-1",
    image: "/images/Watermelon_Juice.jpg",
    location: "BORIVALI",
    title: "Watermelon Juice",
    price: "Free",
    priceColor: "#7d8d2a",
  },
];

const ProductPage = () => {
  const { productId, productName } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [requestType, setRequestType] = useState(requestOptions[0]);
  const [isRequestTypeOpen, setIsRequestTypeOpen] = useState(false);

  //   const productFromNavigation = location.state?.product;
  //   const productFromStore = useAppSelector(
  //     (state) => state.products.byId[productId],
  //   );
  //   const requestStatus = useAppSelector(
  //     (state) => state.products.statusById[productId],
  //   );

  //   useEffect(() => {
  //     if (!productId) {
  //       return;
  //     }

  //     if (!productFromStore) {
  //       dispatch(fetchProductById(productId));
  //     }
  //   }, [dispatch, productId, productFromStore]);

  //   const product = useMemo(
  //     () => productFromStore || productFromNavigation,
  //     [productFromStore, productFromNavigation],
  //   );

  const product = {};

  const displayPrice = product?.price || `${product?.priceValue || 0} ₹ /-`;
  const readableProductName = productName?.split("-").join(" ");

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

          <div className="mx-auto w-full max-w-[975px] py-14">
            {!product && requestStatus === "loading" ? (
              <p className="text-[16px] text-[var(--text-grey-4)]">
                Loading product details...
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[360px_1fr]">
                  <div className="overflow-hidden rounded-[12px] border border-[#eceae4]">
                    <img
                      src={product?.image || "/images/Pav_Bhaji.jpg"}
                      alt={product?.title || "Product"}
                      className="h-[360px] w-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="mb-4 inline-flex rounded-full border border-[#e5d7bd] px-4 py-1 text-[11px] font-semibold text-[var(--primary-orange-800)]">
                      Meal
                    </div>
                    <h1 className="text-[32px] font-bold uppercase text-[var(--text-grey-5)]">
                      {product?.title || readableProductName || "Pav Bhaji"}
                    </h1>
                    <p className="mt-1 text-[18px] font-bold text-[var(--primary-green-700)]">
                      {displayPrice}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-4 text-[13px] text-[var(--text-grey-4)]">
                      <span>In Stock</span>
                      <span className="rounded-[6px] bg-[var(--primary-green-50)] px-2 py-1 font-semibold text-[var(--primary-green-700)]">
                        {product?.stockLabel || "3 Plates"}
                      </span>
                    </div>

                    <div className="mt-5 rounded-[10px] border border-[#eceae4] p-4 text-[13px] leading-6 text-[var(--text-grey-4)]">
                      <p>
                        <span className="font-semibold text-[var(--text-grey-5)]">
                          From:
                        </span>{" "}
                        {product?.donor || "Priya Singh"}
                      </p>
                      <p>
                        <span className="font-semibold text-[var(--text-grey-5)]">
                          Location:
                        </span>{" "}
                        {product?.location || "Bhayander"}
                      </p>
                      <p>
                        <span className="font-semibold text-[var(--text-grey-5)]">
                          Description:
                        </span>{" "}
                        {product?.description ||
                          "Freshly cooked meal ready for pickup."}
                      </p>
                    </div>

                    <div className="mt-5 w-full max-w-[260px]">
                      <DropdownField
                        name="requestType"
                        value={requestType}
                        placeholder="Select request type"
                        options={requestOptions}
                        isOpen={isRequestTypeOpen}
                        onToggle={() =>
                          setIsRequestTypeOpen(
                            (previousState) => !previousState,
                          )
                        }
                        onSelect={(option) => {
                          setRequestType(option);
                          setIsRequestTypeOpen(false);
                        }}
                        iconName="arrow_down_white"
                        buttonClassName="mt-0"
                      />
                    </div>

                    <div className="mt-6 flex items-center gap-4">
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
                            setQuantity((previous) => previous + 1)
                          }
                          className="h-[34px] w-[32px] border border-[var(--text-grey-2)] rounded-tr-[8px] rounded-br-[8px] text-[16px] font-bold text-[var(--text-grey-4)] hover:bg-[var(--primary-green-200)] hover:border-[var(--primary-green-200)]"
                        >
                          +
                        </button>
                      </div>

                      <Button1
                        variant="filled"
                        color="orange"
                        className="rounded-[8px] px-6 py-[10px] text-[12px]"
                      >
                        REQUEST
                      </Button1>
                      <Button1
                        variant="outline"
                        color="orange"
                        className="rounded-[8px] px-6 py-[10px] text-[12px]"
                      >
                        ADD TO CART
                        <Icon name="cart_small" className="ml-2 scale-75" />
                      </Button1>
                    </div>
                  </div>
                </div>

                <section className="mt-16">
                  <h2 className="text-[20px] font-bold text-[var(--text-grey-5)]">
                    Ratings & Reviews
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      {
                        name: "Ananya Mishra",
                        date: "4/20/2026",
                        review: "Very tasty and hygienic.",
                      },
                      {
                        name: "Aarav Shah",
                        date: "1/18/2026",
                        review: "Perfect for quick meal pickup.",
                      },
                      {
                        name: "Kavya Melviya",
                        date: "11/10/2025",
                        review: "Loved the freshness and taste.",
                      },
                    ].map((review) => (
                      <article
                        key={review.name}
                        className="rounded-[10px] border border-[#eceae4] p-4"
                      >
                        <p className="text-[14px] font-semibold text-[var(--text-grey-5)]">
                          {review.name}
                        </p>
                        <p className="text-[11px] text-[var(--text-grey-3)]">
                          {review.date}
                        </p>
                        <p className="mt-2 text-[13px] text-[var(--text-grey-4)]">
                          {review.review}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="mt-16">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[20px] font-bold uppercase text-[var(--text-grey-5)]">
                      Browse For More
                    </h2>
                    <Button1
                      variant="filled"
                      color="green"
                      size="sm"
                      className="h-[30px] w-[47px] rounded-[10px]"
                    >
                      <Icon name="right_arrow" />
                    </Button1>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                    {browseMoreItems.map((item) => (
                      <ProductCard
                        key={item.id}
                        image={item.image}
                        location={item.location}
                        title={item.title}
                        price={item.price}
                        priceColor={item.priceColor}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </section>

        <Footer className="mt-0" />
      </main>
    </>
  );
};

export default ProductPage;

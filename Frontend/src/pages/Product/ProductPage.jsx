import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";

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

const browseMoreProducts = [
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

const reviewData = [
  {
    id: 1,
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
    name: "Kavya Malkiye",
    image: "/images/Kavya_Melviya.jpg",
    date: "20/12/2025",
    rating: 3.5,
    location: "Bhayander (E)",
    comment:
      "Soft, flavorful homemade chapatis shared in perfect condition. Serving great hygiene and thoughtfulness.",
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

          <div className="mx-auto w-full max-w-[975px] py-2 mt-[50px] mb-[100px]">
            {!product && requestStatus === "loading" ? (
              <p className="text-[16px] text-[var(--text-grey-4)]">
                Loading product details...
              </p>
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
                      Meal
                    </div>
                    <h1 className="text-[22px] font-bold uppercase text-black">
                      {product?.title || readableProductName || "Pav Bhaji"}
                    </h1>
                    <p className="mt-[10px] text-[18px] font-bold uppercase text-[var(--primary-green-700)]">
                      {product?.price === 0
                        ? "FREE /-"
                        : `${product.price} ₹/-`}
                    </p>

                    <div className="mt-[35px] flex flex-wrap items-center gap-[14px] text-[14px] font-bold text-[var(--text-grey-5)]">
                      <span>In Stock</span>
                      <span className="rounded-[8px] bg-[var(--primary-green-50)] px-[10px] py-[4px] font-semibold text-[var(--primary-green-700)]">
                        {product?.stockLabel || "3 Plates"}
                      </span>
                    </div>

                    <div className="mt-[25px] text-[12px] leading-5 text-[var(--text-grey-4)]">
                      <Link to={`/user/${product?.donorId}`}>
                        <p className="mb-[5px] text-14 font-bold text-[var(--text-grey-5)] hover:text-orange">
                          {product?.donorName || "Priya Singh"}
                        </p>
                      </Link>
                      <p>
                        {product?.description ||
                          "Freshly prepared Pav Bhaji made with clean, high-quality vegetables and hygienic cooking practices. Stored properly and safe to consume within 6–8 hours if kept covered at room temperature"}
                      </p>
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
                            setQuantity((previous) => previous + 1)
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
                        <Button1
                          variant="outline"
                          color="orange"
                          className="rounded-[10px] px-6 py-[9px] text-[12px]"
                        >
                          ADD TO CART
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
                          {product?.expiryDate || "10 Hours"}
                        </p>
                        <p className="md:row-span-3 flex items-start">
                          <span className="font-semibold text-[var(--text-grey-5)] mr-[55px]">
                            Ingredients
                          </span>
                          {product?.ingredients ||
                            "Potatoes, cauliflower, green peas, tomatoes, onions, capsicum, butter, pav bhaji masala, red chili powder, turmeric powder, ginger-garlic paste, salt, lemon, fresh coriander leaves, pav"}
                        </p>
                        <p className="md:row-span-2 flex items-start">
                          <span className="font-semibold text-[var(--text-grey-5)] mr-[70px]">
                            Location
                          </span>
                          {product?.location || "Bhayander East, Navghar Road"}
                        </p>
                        <p>
                          <span className="font-semibold text-[var(--text-grey-5)] mr-[8px]">
                            Contact Information
                          </span>
                          {product?.location ||
                            "+91 23876 73663, priyasingh@gmail.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="mt-16">
                  <h2 className="text-[22px] font-bold text-black">
                    Ratings & Reviews For{" "}
                    {product?.donor || (
                      <Link to={`/user/${product?.donorId}`}>
                        <span className="text-orange hover:text-[var(--primary-orange-300)]">
                          Priya Singh
                        </span>
                      </Link>
                    )}
                  </h2>
                  <div className="flex items-end gap-[25px] mt-10">
                    <div className="flex items-start gap-[18px]">
                      <p className="text-[38px] leading-none font-bold text-[#2e2c27]">
                        4/5
                      </p>
                      <Icon name="star_icon_md" />
                    </div>
                    <p className="text-[16px] text-[var(--text-grey-4)]">
                      50 Reviews
                    </p>
                  </div>
                  <div className="mt-3">
                    <Button1
                      type="button"
                      variant="filled"
                      color="green"
                      size="sm"
                      className="bg-[var(--primary-green-50)] py-[6px] rounded-full px-[20px] text-[14px] font-medium text-[var(--text-grey-4)] normal-case mt-3"
                    >
                      <span className="mr-[10px]">
                        <Icon name="green_tick_icon" />
                      </span>
                      Trusted
                    </Button1>
                  </div>
                  <div className="mt-[50px] grid grid-cols-1 gap-4 md:grid-cols-3">
                    {reviewData.map((review) => (
                      <article
                        key={review.id}
                        className="rounded-[10px] border border-[#eceae4] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[10px]">
                            <img
                              src={review.image}
                              alt={review.name}
                              className="h-10 w-10 rounded-full object-cover rounded-[12px]"
                            />
                            <p className="text-[14px] font-semibold text-[var(--text-grey-5)]">
                              {review.name}
                            </p>
                          </div>
                          <p className="text-[12px] text-[var(--text-grey-3)]">
                            {review.date}
                          </p>
                        </div>

                        <p className="mt-[20px] text-[13px] text-[var(--text-grey-4)]">
                          "{review.comment}"
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
                    {browseMoreProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        priceColor={product.priceColor}
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

import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";

import ContactBar from "../../components/common/ContactBar";
import Footer from "../../components/common/Footer";
import NavbarHomepage from "../../components/common/NavbarHomepage";
import Button1 from "../../components/ui/Button1";
import DropdownField from "../../components/ui/DropdownField";
import { Icon } from "../../components/Icons/Icons";

const initialCartItems = [
  {
    id: "kathi-roll",
    name: "Kathi Roll",
    donor: "Riya Mehata",
    image: "/images/Kathi_Roll.jpg",
    price: 20,
    quantity: 1,
    stockLabel: "3 Rolls",
  },
  {
    id: "noodles",
    name: "Noodles",
    donor: "Nira Sharma",
    image: "/images/Noodles.jpg",
    price: 30,
    quantity: 1,
    stockLabel: "3 Plates",
  },
  {
    id: "watermelon-juice",
    name: "Watermelon Juice",
    donor: "Aman Kadam",
    image: "/images/Watermelon_Juice.jpg",
    price: 0,
    quantity: 1,
    stockLabel: "3 Bottles",
  },
];

const requestTypeOptions = ["Pickup Today", "Pickup Tomorrow", "Home Delivery"];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [requestType, setRequestType] = useState(requestTypeOptions[0]);
  const [isRequestTypeOpen, setIsRequestTypeOpen] = useState(false);

  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const updateQuantity = (id, value) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, item.quantity + value),
        };
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id),
    );
  };

  return (
    <>
      <Helmet>
        <title>Cart | ShareBite</title>
      </Helmet>

      <main className="w-full bg-white">
        <ContactBar />
        <section className="w-full">
          <NavbarHomepage activePage="home" showBorder={true} />

          <div className="mx-auto w-full max-w-[1100px] pb-16 mt-[80px]">
            <div className="mb-[50px] flex items-center justify-between gap-4">
              <h1 className="text-[22px] font-bold tracking-[0.5px] text-black">
                YOUR CART
              </h1>

              <div className="w-full max-w-[250px]">
                <DropdownField
                  name="requestType"
                  value={requestType}
                  placeholder="Select request type"
                  options={requestTypeOptions}
                  isOpen={isRequestTypeOpen}
                  onToggle={() =>
                    setIsRequestTypeOpen((previousState) => !previousState)
                  }
                  onSelect={(option) => {
                    setRequestType(option);
                    setIsRequestTypeOpen(false);
                  }}
                  iconName="arrow_down_white"
                  buttonClassName="mt-0"
                />
              </div>
            </div>

            <div className="flex gap-[20px]">
              <div className="space-y-4 max-w-[750px]">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[10px] border border-[#e4e2dc] bg-white px-[30px] py-[25px] shadow-[0px_4px_14px_#00000008]"
                  >
                    <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
                      <div className="flex flex-wrap items-center gap-[30px] md:flex-nowrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-[150px] w-[125px] rounded-[8px] object-cover"
                        />
                        <div className="flex items-center min-w-[380px] max-w-[414px] justify-between">
                          <div className="min-w-[150px]">
                            <div className="flex flex-col gap-[6px] mb-[20px]">
                              <h2 className="text-[20px] font-bold text-[var(--text-grey-5)]">
                                {item.name}
                              </h2>
                              <p className="text-[14px] text-[var(--text-grey-4)]">
                                From, {item.donor}
                              </p>
                            </div>
                            <div className="text-[12px] leading-[18px] text-[var(--text-grey-4)]">
                              <p>
                                <span className="font-semibold mr-[30px] text-[var(--text-grey-5)]">
                                  Price
                                </span>
                                {item.price} ₹/-
                              </p>
                              <p>
                                <span className="font-semibold mr-[10px] text-[var(--text-grey-5)]">
                                  In Stock
                                </span>{" "}
                                {item.stockLabel}
                              </p>
                            </div>
                          </div>

                          <div className="h-[34px] w-[96px] flex items-center rounded-[8px]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-[34px] w-[32px] text-[16px] border border-[var(--text-grey-2)] font-bold text-[var(--text-grey-4)] rounded-tl-[8px] rounded-bl-[8px] hover:bg-[var(--primary-green-200)] hover:border-[var(--primary-green-200)]"
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              -
                            </button>
                            <span className="h-[34px] w-[32px] border-t border-b border-[var(--text-grey-2)] text-center text-[14px] font-semibold text-[var(--text-grey-4)] p-2">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-[34px] w-[32px] border border-[var(--text-grey-2)] rounded-tr-[8px] rounded-br-[8px] text-[16px] font-bold text-[var(--text-grey-4)] hover:bg-[var(--primary-green-200)] hover:border-[var(--primary-green-200)]"
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              +
                            </button>
                          </div>

                          <p className="min-w-[80px] text-[20px] font-bold text-[var(--primary-orange-800)]">
                            {item.price * item.quantity} ₹/-
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-[8px] ml-[15px] p-[20px] transition bg-[var(--primary-cream-100)] hover:bg-[#fff7ef]"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Icon name="delete_icon_orange" className="scale-75" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="w-px bg-gray-300"></div>

              <aside className="h-fit rounded-[10px] p-6">
                <h3 className="border-b border-[#eceae4] pb-3 text-[20px] font-bold text-black">
                  CART TOTALS
                </h3>

                <div className="mt-10 space-y-[15px] text-[16px] text-[var(--text-grey-3)]">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-summary`}
                      className="flex items-center justify-between gap-3"
                    >
                      <span>{item.name}</span>
                      <span className="text-[var(--text-grey-4)]">
                        {item.price * item.quantity} ₹/-
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#eceae4] pt-4 text-[18px] font-bold text-[var(--text-grey-5)]">
                  <span>Total</span>
                  <span>{totalAmount} ₹/-</span>
                </div>

                <Button1
                  type="button"
                  variant="filled"
                  color="orange"
                  className="mt-[60px] w-full rounded-[8px] py-[12px] text-[14px]"
                >
                  SEND REQUEST
                </Button1>

                <Button1
                  type="button"
                  variant="outline"
                  color="orange"
                  className="mt-[40px] w-full rounded-[8px] py-[10px] text-[13px] text-[var(--text-grey-4)] border-[var(--text-grey-2)] hover:!bg-transparent hover:!text-[var(--text-grey-4)] hover:scale-105 transition-all duration-200"
                >
                  CONTINUE EXPLORING
                  <Icon name="right_arrow_grey" className="ml-[20px]" />
                </Button1>
              </aside>
            </div>
          </div>
        </section>

        <Footer className="mt-0" />
      </main>
    </>
  );
};

export default CartPage;

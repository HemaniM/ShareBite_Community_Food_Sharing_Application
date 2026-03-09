import React from "react";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";

const inputClassName =
  "mt-2 w-full rounded-[6px] border border-[#eceae4] bg-[#f7f7f2] px-3 py-[10px] text-[11px] text-[#9a978d] outline-none placeholder:text-[#b0aea6]";

const labelClassName =
  "text-[11px] font-semibold uppercase tracking-[0.2px] text-[#4a4944]";

const CreateFoodPost = () => {
  return (
    <section className="mx-auto mt-[80px] w-full max-w-[975px] pb-20">
      <h1 className="mb-8 text-[22px] font-bold text-[#2f2e2b]">
        CREATE NEW FOOD POST
      </h1>

      <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5 rounded-[8px] border border-[#ebe9e3] p-4">
            <div>
              <label className={labelClassName}>Food Name</label>
              <input className={inputClassName} placeholder="Name" />
            </div>
            <div>
              <label className={labelClassName}>Description</label>
              <textarea
                className={`${inputClassName} min-h-[118px] resize-none`}
                placeholder="Write description here..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.4px] text-[#4a4944]">
              Food Images
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex h-[112px] w-[112px] flex-col items-center justify-center rounded-[8px] border border-dashed border-[#ddd9cc] bg-[#faf9f4] text-[#9f9b91]"
              >
                <Icon
                  name="plus_icon_create_post_btn"
                  className="scale-75 opacity-70"
                />
                <span className="mt-2 text-center text-[10px] leading-[13px]">
                  Click to upload or drag and drop
                </span>
              </button>

              <img
                src="/images/Lunch_Box.jpg"
                alt="Food preview 1"
                className="h-[112px] w-[112px] rounded-[8px] object-cover"
              />
              <img
                src="/images/Noodles.jpg"
                alt="Food preview 2"
                className="h-[112px] w-[112px] rounded-[8px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5 rounded-[8px] border border-[#ebe9e3] p-4">
            <div>
              <label className={labelClassName}>Food Category</label>
              <select className={inputClassName} defaultValue="">
                <option value="" disabled>
                  Category
                </option>
              </select>
            </div>

            <div>
              <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.4px] text-[#4a4944]">
                Location
              </h2>
              <label className={labelClassName}>Address Line One</label>
              <input className={inputClassName} placeholder="Category" />
              <label className={`${labelClassName} mt-3 block`}>
                Address Line Two
              </label>
              <input className={inputClassName} placeholder="Category" />

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClassName}>City</label>
                  <input className={inputClassName} placeholder="Category" />
                </div>
                <div>
                  <label className={labelClassName}>District</label>
                  <input className={inputClassName} placeholder="Category" />
                </div>
                <div>
                  <label className={labelClassName}>State</label>
                  <input className={inputClassName} placeholder="Category" />
                </div>
                <div>
                  <label className={labelClassName}>Country</label>
                  <input className={inputClassName} placeholder="Category" />
                </div>
              </div>

              <label className={`${labelClassName} mt-3 block`}>Pincode</label>
              <input className={inputClassName} placeholder="Category" />
            </div>
          </div>

          <div className="space-y-5 rounded-[8px] border border-[#ebe9e3] p-4">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.4px] text-[#4a4944]">
              Food Information
            </h2>
            <div>
              <label className={labelClassName}>Expiry Date/Time</label>
              <input className={inputClassName} placeholder="Date" />
            </div>
            <div>
              <label className={labelClassName}>Ingredients</label>
              <textarea
                className={`${inputClassName} min-h-[80px] resize-none`}
                placeholder="Type Here..."
              />
            </div>
            <div>
              <label className={labelClassName}>Food Stock</label>
              <input className={inputClassName} placeholder="Type Here..." />
            </div>
            <div>
              <label className={labelClassName}>Stock Measure</label>
              <select className={inputClassName} defaultValue="">
                <option value="" disabled>
                  Measure
                </option>
              </select>
            </div>

            <div>
              <h3 className="mb-2 text-[12px] font-bold uppercase tracking-[0.4px] text-[#4a4944]">
                Price
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClassName}>Price Amount</label>
                  <input className={inputClassName} placeholder="Amount ₹" />
                </div>
                <div>
                  <label className={labelClassName}>Free</label>
                  <select className={inputClassName} defaultValue="No">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[470px] rounded-[8px] border border-[#ebe9e3] p-4">
          <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.4px] text-[#4a4944]">
            Contact Information
          </h2>
          <label className={labelClassName}>Phone Number</label>
          <input className={inputClassName} placeholder="Phone Number" />
          <label className={`${labelClassName} mt-3 block`}>
            Alternate Phone Number
          </label>
          <input className={inputClassName} placeholder="Phone Number" />
          <label className={`${labelClassName} mt-3 block`}>
            Email Address
          </label>
          <input className={inputClassName} placeholder="example@gmail.com" />
        </div>

        <div className="flex justify-center pt-1">
          <Button1
            type="submit"
            variant="filled"
            color="orange"
            size="sm"
            className="rounded-[8px] px-[30px] py-[10px] text-[11px] tracking-[0.7px]"
          >
            CREATE POST
          </Button1>
        </div>
      </form>
    </section>
  );
};

export default CreateFoodPost;

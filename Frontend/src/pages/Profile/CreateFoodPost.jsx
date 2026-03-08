import React, { useEffect, useRef, useState } from "react";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";
import DropdownField from "../../components/ui/DropdownField";

const inputClassName =
  "mt-2 w-full rounded-[6px] border-none bg-[var(--primary-green-50)] px-3 py-[10px] text-[14px] text-[var(--text-grey-4)] outline-none placeholder:text-[var(text-grey-3)]";

const labelClassName =
  "text-[14px] font-semibold tracking-[0.2px] text-[var(--text-grey-5)]";

const sectionLableClassName =
  "text-[18px] font-bold text-[var(--text-grey-5)] tracking-[0.4px]";

const categoryOptions = [
  "Groceries",
  "Vegetable",
  "Fruits",
  "Snacks",
  "Meals",
  "Fast Food",
  "Drinks",
];

const freeOptions = ["Yes", "No"];

const stockMeasureOptions = [
  "Plates",
  "Pieces",
  "Kg",
  "Grams",
  "Litres",
  "Packets",
];

const CreateFoodPost = () => {
  const [images, setImages] = useState([]);
  const [openDropdown, setOpenDropdown] = useState("");
  const [category, setCategory] = useState("");
  const [free, setFree] = useState("No");
  const [stockMeasure, setStockMeasure] = useState("");

  const fileInputRef = useRef(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpenDropdown("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const imageUrls = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="mx-auto mt-[80px] w-full max-w-[975px] pb-20">
      <h1 className="mb-[50px] text-[22px] font-bold tracking-[0.4px] text-black">
        CREATE NEW FOOD POST
      </h1>

      <form
        className="space-y-6"
        onSubmit={(event) => event.preventDefault()}
        ref={dropdownRef}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className={sectionLableClassName}>Description</h2>
            <div className="space-y-5 rounded-[8px] border border-[var(--white-600)] p-4">
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
          </div>

          <div className="space-y-3">
            <h2 className={sectionLableClassName}>Food Images</h2>
            <div className="flex gap-3 rounded-[8px] border border-[var(--white-600)] p-4">
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex flex-shrink-0 h-[240px] w-[200px] flex-col items-center justify-center rounded-[8px] border border-dashed border-[var(--text-grey-3)] bg-white text-[var(--text-grey-4)]"
              >
                <Icon
                  name="upload_image_icon"
                  className="scale-75 opacity-70"
                />
                <span className="mt-2 text-center text-[14px] leading-[13px]">
                  Click to upload
                </span>
              </button>

              {/* Hidden input */}
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Preview Images */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {images.map((img, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={img.preview}
                      className="h-[240px] w-[200px] rounded-[8px] object-cover"
                    />

                    <Button1
                      variant="outline"
                      color="orange"
                      size="md"
                      onClick={() => removeImage(index)}
                      className="absolute top-[100px] right-[50px] bg-white/20 backdrop-blur-sm text-white text-[12px] font-bold px-[20px] py-[10px] rounded-[8px] border-white hover:bg-white hover:text-[var(--text-grey-5)]"
                    >
                      Remove
                    </Button1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* left column */}
          <div className="space-y-6">
            {/* Category */}
            <div className="space-y-3">
              <h2 className={sectionLableClassName}>Category</h2>
              <div className="space-y-5 rounded-[8px] border border-[#ebe9e3] p-4">
                <label className={labelClassName}>Food Category</label>
                <DropdownField
                  label="category"
                  value={category}
                  placeholder="Category"
                  options={categoryOptions}
                  isOpen={openDropdown === "category"}
                  onToggle={() =>
                    setOpenDropdown((previous) =>
                      previous === "category" ? "" : "category",
                    )
                  }
                  onSelect={(option) => {
                    setCategory(option);
                    setOpenDropdown("");
                  }}
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <h2 className={sectionLableClassName}>Location</h2>
              <div className="space-y-5 rounded-[8px] border border-[#ebe9e3] p-4">
                <label className={labelClassName}>Address Line One</label>
                <input
                  className={inputClassName}
                  placeholder="Address line 1"
                />
                <label className={`${labelClassName} mt-3 block`}>
                  Address Line Two
                </label>
                <input
                  className={inputClassName}
                  placeholder="Address line 2"
                />

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClassName}>City</label>
                    <input className={inputClassName} placeholder="City" />
                  </div>
                  <div>
                    <label className={labelClassName}>District</label>
                    <input className={inputClassName} placeholder="District" />
                  </div>
                  <div>
                    <label className={labelClassName}>State</label>
                    <input className={inputClassName} placeholder="State" />
                  </div>
                  <div>
                    <label className={labelClassName}>Country</label>
                    <input className={inputClassName} placeholder="Country" />
                  </div>
                </div>

                <label className={`${labelClassName} mt-3 block`}>
                  Pincode
                </label>
                <input className={inputClassName} placeholder="Pincode" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className={sectionLableClassName}>Food Information</h2>
              <div className="space-y-5 rounded-[8px] border border-[#ebe9e3] p-4">
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
                  <input
                    className={inputClassName}
                    placeholder="Type Here..."
                  />
                </div>
                <div>
                  <label className={labelClassName}>Stock Measure</label>
                  <DropdownField
                    label="stockMeasure"
                    value={stockMeasure}
                    placeholder="Measure"
                    options={stockMeasureOptions}
                    isOpen={openDropdown === "stockMeasure"}
                    onToggle={() =>
                      setOpenDropdown((previous) =>
                        previous === "stockMeasure" ? "" : "stockMeasure",
                      )
                    }
                    onSelect={(option) => {
                      setStockMeasure(option);
                      setOpenDropdown("");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className={sectionLableClassName}>Price</h3>
              <div className="rounded-[8px] border border-[#ebe9e3] p-4 grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClassName}>Price Amount</label>
                  <input className={inputClassName} placeholder="Amount ₹" />
                </div>
                <div>
                  <label className={labelClassName}>Free</label>
                  <DropdownField
                    label="free"
                    value={free}
                    placeholder="Free"
                    options={freeOptions}
                    isOpen={openDropdown === "free"}
                    onToggle={() =>
                      setOpenDropdown((previous) =>
                        previous === "free" ? "" : "free",
                      )
                    }
                    onSelect={(option) => {
                      setFree(option);
                      setOpenDropdown("");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className={sectionLableClassName}>Contact Information</h2>
          <div className="space-y-5 w-full max-w-[470px] rounded-[8px] border border-[#ebe9e3] p-4">
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
        </div>
        <div className="flex justify-center pt-3">
          <Button1
            type="submit"
            variant="filled"
            color="orange"
            size="md"
            className="rounded-[10px] px-[30px] py-[12px] text-[16px] font-bold tracking-[0.5px]"
          >
            CREATE POST
          </Button1>
        </div>
      </form>
    </section>
  );
};

export default CreateFoodPost;

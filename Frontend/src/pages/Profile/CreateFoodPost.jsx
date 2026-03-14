import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";
import DropdownField from "../../components/ui/DropdownField";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { uploadImageToCloudinary } from "../../utils/cloudinaryAPI";
import {
  createListing,
  resetCreateListingState,
} from "../../features/listings/listingsSlice";

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

const initialFormState = {
  title: "",
  description: "",
  addressLineOne: "",
  addressLineTwo: "",
  city: "",
  district: "",
  state: "",
  country: "",
  pincode: "",
  expiresAt: "",
  ingredients: "",
  stockQuantity: "",
  priceAmount: "",
  phoneNumber: "",
  alternatePhoneNumber: "",
  email: "",
};

const CreateFoodPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { createLoading } = useAppSelector((state) => state.listings);

  const [images, setImages] = useState([]);
  const [openDropdown, setOpenDropdown] = useState("");
  const [category, setCategory] = useState("");
  const [free, setFree] = useState("No");
  const [stockMeasure, setStockMeasure] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [toast, setToast] = useState({ message: "", type: "success" });

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

  useEffect(() => {
    if (!toast.message) {
      return undefined;
    }

    const timeoutId = setTimeout(
      () => setToast({ message: "", type: "success" }),
      3000,
    );

    return () => clearTimeout(timeoutId);
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFormData = () => {
    const missingFields = [];
    const requiredFields = [
      ["Food Name", formData.title],
      ["Category", category],
      ["Address Line One", formData.addressLineOne],
      ["City", formData.city],
      ["District", formData.district],
      ["State", formData.state],
      ["Country", formData.country],
      ["Pincode", formData.pincode],
      ["Expiry Date/Time", formData.expiresAt],
      ["Food Stock", formData.stockQuantity],
      ["Stock Measure", stockMeasure],
      ["Phone Number", formData.phoneNumber],
      ["Email Address", formData.email],
    ];

    requiredFields.forEach(([label, value]) => {
      if (!String(value || "").trim()) {
        missingFields.push(label);
      }
    });

    if (images.length === 0) {
      missingFields.push("Food Image");
    }

    if (missingFields.length > 0) {
      const imageMissing = missingFields.includes("Food Image");
      const fieldMessages = missingFields.filter(
        (field) => field !== "Food Image",
      );
      const messages = [];

      if (fieldMessages.length > 0) {
        messages.push(`Please fill these fields: ${fieldMessages.join(", ")}`);
      }

      if (imageMissing) {
        messages.push("Image should be uploaded");
      }

      return messages;
    }

    const validationErrors = [];

    if (free !== "Yes" && Number(formData.priceAmount || 0) <= 0) {
      validationErrors.push(
        "Price Amount must be greater than 0 for paid listings",
      );
    }

    if (Number(formData.stockQuantity || 0) <= 0) {
      validationErrors.push("Food Stock must be greater than 0");
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateFormData();

    if (validationErrors.length) {
      showToast(validationErrors[0], "error");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        images.map((image) => uploadImageToCloudinary(image.file)),
      );

      const payload = {
        title: formData.title,
        description: formData.description,
        category,
        ingredients: formData.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        images: imageUrls,
        stock: {
          quantity: Number(formData.stockQuantity || 0),
          unit: stockMeasure,
        },
        price: {
          isFree: free === "Yes",
          amount: free === "Yes" ? 0 : Number(formData.priceAmount || 0),
        },
        contactInfo: {
          phoneNumber: formData.phoneNumber,
          alternatePhoneNumber: formData.alternatePhoneNumber || undefined,
          email: formData.email,
        },
        location: {
          addressLineOne: formData.addressLineOne,
          addressLineTwo: formData.addressLineTwo,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
        },
        expiresAt: formData.expiresAt,
      };

      await dispatch(createListing(payload)).unwrap();
      setFormData(initialFormState);
      setImages([]);
      setCategory("");
      setFree("No");
      setStockMeasure("");
      dispatch(resetCreateListingState());
      navigate("/profile/food-posts", {
        state: { toastMessage: "Post created successfully" },
      });
    } catch (uploadErr) {
      console.error("Create post failed:", uploadErr);
      showToast("Not able to create post", "error");
    }
  };

  return (
    <section className="mx-auto mt-[80px] w-full max-w-[975px] pb-20">
      {toast.message && (
        <div
          className={`fixed top-5 right-5 z-50 rounded-lg px-4 py-3 text-white shadow-lg ${
            toast.type === "error"
              ? "bg-[var(--orange-500)]"
              : "bg-[var(--primary-green-500)]"
          }`}
        >
          {toast.message}
        </div>
      )}
      <h1 className="mb-[50px] text-[22px] font-bold tracking-[0.4px] text-black">
        CREATE NEW FOOD POST
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit} ref={dropdownRef}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className={sectionLableClassName}>Description</h2>
            <div className="space-y-5 rounded-[8px] border border-[var(--white-600)] p-4">
              <div>
                <label className={labelClassName}>Food Name</label>
                <input
                  className={inputClassName}
                  placeholder="Name"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className={labelClassName}>Description</label>
                <textarea
                  className={`${inputClassName} min-h-[118px] resize-none`}
                  placeholder="Write description here..."
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
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
                  buttonColorClass="bg-[var(--primary-green-50)] text-[var(--text-grey-4)]"
                  iconName="arrow_down_grey"
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
                  name="addressLineOne"
                  value={formData.addressLineOne}
                  onChange={handleInputChange}
                  required
                />
                <label className={`${labelClassName} mt-3 block`}>
                  Address Line Two
                </label>
                <input
                  className={inputClassName}
                  placeholder="Address line 2"
                  name="addressLineTwo"
                  value={formData.addressLineTwo}
                  onChange={handleInputChange}
                />

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClassName}>City</label>
                    <input
                      className={inputClassName}
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>District</label>
                    <input
                      className={inputClassName}
                      placeholder="District"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>State</label>
                    <input
                      className={inputClassName}
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Country</label>
                    <input
                      className={inputClassName}
                      placeholder="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <label className={`${labelClassName} mt-3 block`}>
                  Pincode
                </label>
                <input
                  className={inputClassName}
                  placeholder="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
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
                  <input
                    className={inputClassName}
                    name="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelClassName}>Ingredients</label>
                  <textarea
                    className={`${inputClassName} min-h-[80px] resize-none`}
                    placeholder="Type Here..."
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className={labelClassName}>Food Stock</label>
                  <input
                    className={inputClassName}
                    placeholder="Type Here..."
                    name="stockQuantity"
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelClassName}>Stock Measure</label>
                  <DropdownField
                    label="stockMeasure"
                    value={stockMeasure}
                    placeholder="Measure"
                    buttonColorClass="bg-[var(--primary-green-50)] text-[var(--text-grey-4)]"
                    iconName="arrow_down_grey"
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
                  <input
                    className={inputClassName}
                    placeholder="Amount ₹"
                    name="priceAmount"
                    type="number"
                    min="0"
                    value={formData.priceAmount}
                    onChange={handleInputChange}
                    disabled={free === "Yes"}
                  />
                </div>
                <div>
                  <label className={labelClassName}>Free</label>
                  <DropdownField
                    label="free"
                    value={free}
                    placeholder="Free"
                    buttonColorClass="bg-[var(--primary-green-50)] text-[var(--text-grey-4)]"
                    iconName="arrow_down_grey"
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
            <input
              className={inputClassName}
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <label className={`${labelClassName} mt-3 block`}>
              Alternate Phone Number
            </label>
            <input
              className={inputClassName}
              placeholder="Phone Number"
              name="alternatePhoneNumber"
              value={formData.alternatePhoneNumber}
              onChange={handleInputChange}
            />
            <label className={`${labelClassName} mt-3 block`}>
              Email Address
            </label>
            <input
              className={inputClassName}
              placeholder="example@gmail.com"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-center pt-3">
          <Button1
            type="submit"
            variant="filled"
            color="orange"
            size="md"
            className="rounded-[10px] px-[30px] py-[12px] text-[16px] font-bold tracking-[0.5px]"
            disabled={createLoading}
          >
            {createLoading ? "CREATING..." : "CREATE POST"}
          </Button1>
        </div>
      </form>
    </section>
  );
};

export default CreateFoodPost;

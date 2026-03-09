import React from "react";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";
import { Link, NavLink, useLocation } from "react-router-dom";

const foodPosts = [
  {
    id: 1,
    title: "PAV BHAJI",
    category: "Meals",
    price: "FREE",
    inStock: "3 Plates",
    expiryDate: "10 Hrs",
    ingredients:
      "Potatoes, Cauliflower, Green Peas, Tomatoes, Onion, Capsicum, Butter, Pav, Bhaji Masala, Red Chili Powder, Coriander.",
    description:
      "Freshly prepared Pav Bhaji made with classic high-quality ingredients and hygienic cooking practices.",
    contact: "+91 82242 43156",
    email: "priyasingh@gmail.com",
    address: "Bhayander (E), Newyork Road, Sakhar Nagar",
    image: "/images/Pav_Bhaji.jpg",
  },
  {
    id: 2,
    title: "KULFI",
    category: "Snacks",
    price: "10 ₹/-",
    inStock: "4 Kulfis",
    expiryDate: "24 Hrs",
    ingredients: "Milk, Sugar, Cardamom, Saffron, Chopped Nuts.",
    description:
      "Freshly prepared kulfi made using desi ingredients and hygienic conditions. Perfect sweet snack for every weather.",
    contact: "+91 22471 75462",
    email: "priyasingh@gmail.com",
    address: "Bhayander (E), Newyork Road, Sakhar Nagar",
    image: "/images/Kulfi.jpg",
  },
  {
    id: 3,
    title: "TOAST SANDWITCH",
    category: "Fast Food",
    price: "FREE",
    inStock: "3 Plates",
    expiryDate: "3-4 Hrs",
    ingredients:
      "Bread, butter, vegetables (potato, onion, tomato, cucumber), spices and cheese.",
    description:
      "Freshly made sandwich prepared from quality ingredients under hygienic conditions. Best consumed within 3-4 hours.",
    contact: "+91 22342 73656",
    email: "priyasingh@gmail.com",
    address: "Bhayander (E), Newyork Road, Sakhar Nagar",
    image: "/images/Toast_Sandwitch.jpg",
  },
];

const FoodPostsPage = () => {
  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
      <div className="flex justify-center">
        <Link
          to="/profile/food-posts/create-post"
          className=""
          aria-label="Open Create Post"
        >
          <Button1
            variant="filled"
            color="orange"
            size="md"
            className="px-[25px] py-[14px] rounded-[10px]"
          >
            <Icon name="plus_icon_create_post_btn" />
            <p className="text-[14px] tracking-[0.7px] ml-[18px]">
              CREATE NEW FOOD POST
            </p>
          </Button1>
        </Link>
      </div>

      <h2 className="mt-12 mb-[50px] text-[22px] font-bold tracking-[0.4px] text-black">
        ALL FOOD POSTS
      </h2>

      <div className="space-y-[30px]">
        {foodPosts.map((post) => (
          <article
            key={post.id}
            className="border border-[#e5e4df] rounded-[9px] p-4 sm:p-5"
          >
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="w-[200px] h-[240px] rounded-[8px] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="hover:scale-105 transition-transform duration-300 w-[200px] h-[240px] object-cover rounded-[8px]"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[18px] font-bold text-black pl-1">
                    {post.title}
                  </h3>
                  <Link
                    to={`/profile/food-posts/${post.id}/requests`}
                    state={{ postTitle: post.title }}
                    aria-label={`View requests for ${post.title}`}>
                    <Button1
                      variant="outline"
                      color="green"
                      size="sm"
                      className="group w-[47px] h-[30px] rounded-[10px]"
                    >
                      <Icon
                        name="right_arrow_green"
                        className="group-hover:hidden"
                      />
                      <Icon
                        name="right_arrow"
                        className="hidden group-hover:block"
                      />
                    </Button1>
                  </Link>
                </div>

                <div className="mt-4 p-1 grid md:grid-cols-2 gap-x-8 gap-y-2 text-[13px] text-[var(--text-grey-4)]">
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[30px]">
                      Category
                    </span>
                    {post.category}
                  </p>
                  <p className="md:row-span-4 flex items-start">
                    <span className="font-bold text-[var(--text-grey-5)] mr-[30px]">
                      Description
                    </span>
                    {post.description}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[55px]">
                      Price
                    </span>
                    {post.price}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[35px]">
                      In Stock
                    </span>
                    {post.inStock}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[12px]">
                      Expiry Date
                    </span>
                    {post.expiryDate}
                  </p>
                  <p className="md:row-span-2 flex items-start">
                    <span className="font-bold text-[#40403e] mr-[16px]">
                      Ingredients
                    </span>
                    {post.ingredients}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[50px]">
                      Contact
                    </span>
                    {post.contact}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[11px]">
                      Email Address
                    </span>
                    {post.email}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-text-[var(--text-grey-5)] mr-[26px]">
                      Address
                    </span>
                    {post.address}
                  </p>
                </div>

                <Button1
                  variant="outline"
                  color="orange"
                  size="sm"
                  className="mt-4 font-bold rounded-[10px] text-[12px] px-[18px] py-[10px]"
                >
                  DELETE POST
                </Button1>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FoodPostsPage;

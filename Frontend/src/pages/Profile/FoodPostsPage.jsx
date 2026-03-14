import React, { useEffect, useState } from "react";
import Button1 from "../../components/ui/Button1";
import { Icon } from "../../components/Icons/Icons";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deleteMyListing,
  fetchMyListings,
} from "../../features/listings/listingsSlice";

const FoodPostsPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { myListings, loading, error, deleteLoading } = useAppSelector(
    (state) => state.listings,
  );

  const [toast, setToast] = useState(() => ({
    message: location.state?.toastMessage || "",
    type: "success",
  }));

  useEffect(() => {
    dispatch(fetchMyListings());
  }, [dispatch]);

  useEffect(() => {
    if (!toast.message) {
      return undefined;
    }

    window.history.replaceState({}, document.title);
    const timeoutId = setTimeout(
      () => setToast({ message: "", type: "success" }),
      3000,
    );
    return () => clearTimeout(timeoutId);
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleDeletePost = async (postId) => {
    try {
      const action = await dispatch(deleteMyListing(postId));
      if (deleteMyListing.fulfilled.match(action)) {
        showToast("Post deleted successfully", "success");
      } else {
        console.error("Delete post failed:", action.payload);
        showToast("Not able to delete post", "error");
      }
    } catch (deleteError) {
      console.error("Delete post failed:", deleteError);
      showToast("Not able to delete post", "error");
    }
  };

  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
      {toast.message && (
        <div
          className={`fixed top-5 right-5 z-50 rounded-lg px-4 py-3 text-white shadow-lg ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {toast.message}
        </div>
      )}
      <div className="flex justify-center">
        <Link
          to="/profile/food-posts/create-post"
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

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !myListings.length && (
        <p className="text-[var(--text-grey-4)]">
          No food post yet. Create your first one.
        </p>
      )}

      <div className="space-y-[30px]">
        {myListings.map((post) => (
          <article
            key={post._id}
            className="border border-[#e5e4df] rounded-[9px] p-4 sm:p-5"
          >
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="w-[200px] h-[240px] rounded-[8px] overflow-hidden bg-[#f2f2f2] flex items-center justify-center">
                {post.images?.[0] ? (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="hover:scale-105 transition-transform duration-300 w-[200px] h-[240px] object-cover rounded-[8px]"
                  />
                ) : (
                  <p className="text-sm text-[var(--text-grey-4)]">No image</p>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[18px] font-bold text-black pl-1">
                    {post.title}
                  </h3>
                  <Link
                    to={`/profile/food-posts/${post._id}/requests`}
                    state={{ postTitle: post.title }}
                    aria-label={`View requests for ${post.title}`}
                  >
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
                    {post.price?.isFree ? "FREE" : `${post.price?.amount} ₹`}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[35px]">
                      In Stock
                    </span>
                    {post.stock?.quantity} {post.stock?.unit}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[12px]">
                      Expiry Date
                    </span>
                    {new Date(post.expiresAt).toLocaleString()}
                  </p>
                  <p className="md:row-span-2 flex items-start">
                    <span className="font-bold text-[#40403e] mr-[16px]">
                      Ingredients
                    </span>
                    {post.ingredients?.join(", ") || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[50px]">
                      Contact
                    </span>
                    {post.contactInfo?.phoneNumber}
                  </p>
                  <p>
                    <span className="font-bold text-[var(--text-grey-5)] mr-[11px]">
                      Email Address
                    </span>
                    {post.contactInfo?.email}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-text-[var(--text-grey-5)] mr-[26px]">
                      Address
                    </span>
                    {post.location?.addressLineOne}, {post.location?.city},{" "}
                    {post.location?.state}
                  </p>
                </div>

                <Button1
                  variant="outline"
                  color="orange"
                  size="sm"
                  className="mt-4 font-bold rounded-[10px] text-[12px] px-[18px] py-[10px]"
                  onClick={() => handleDeletePost(post._id)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "DELETING..." : "DELETE POST"}
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

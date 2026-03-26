import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deleteMyListing,
  fetchMyListings,
} from "../../features/listings/listingsSlice";
import { fetchHistoryOverview } from "../../features/history/historySlice";

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString();
};

const HistoryFoodPostsPage = () => {
  const dispatch = useAppDispatch();
  const { historyFoodPosts, overviewLoading, overviewError } = useAppSelector(
    (state) => state.history,
  );
  const { deleteLoading } = useAppSelector((state) => state.listings);

  const handleDeletePost = async (postId) => {
    const action = await dispatch(deleteMyListing(postId));
    if (deleteMyListing.fulfilled.match(action)) {
      dispatch(fetchHistoryOverview());
      dispatch(fetchMyListings());
    }
  };

  return (
    <div className="space-y-[30px]">
      {overviewLoading && <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--text-grey-4)] px-6 py-10 text-center text-[15px]">
                Loading history...
            </div>}
      {overviewError && <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--primary-orange-600)] px-6 py-10 text-center text-[15px]">
                {overviewError}
            </div>}

      {!overviewLoading && !historyFoodPosts.length && (
        <div className="w-full rounded-xl border border-dashed border-[var(--text-grey-2)] bg-transparent text-[var(--text-grey-4)] px-6 py-10 text-center text-[15px]">
          No expired or unavailable food posts in your history.
        </div>
      )}

      {historyFoodPosts.map((post) => (
        <article
          key={post._id}
          className="rounded-[9px] border border-[var(--white-600)] bg-white px-[28px] py-[20px]"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="max-w-[450px] flex items-center gap-[30px]">
              <img
                src={post.images?.[0] || "/images/Meals_image.jpg"}
                alt={post.title}
                className="h-[150px] w-[125px] rounded-[10px] object-cover"
              />

              <div className="text-[14px] text-[var(--text-grey-4)] leading-[26px]">
                <h3 className="text-[18px] leading-[1.1] tracking-[0.5px] font-bold text-[var(--text-grey-5)] mb-[20px]">
                  {post.title}
                </h3>
                <p>
                  <span className="font-semibold text-[var(--text-grey-5)] mr-[40px]">
                    Category
                  </span>
                  {post.category}
                </p>
                <p>
                  <span className="font-semibold text-[var(--text-grey-5)] mr-[68px]">
                    Price
                  </span>
                  {post.price?.isFree ? "FREE /-" : `${post.price?.amount || 0} ₹/-`}
                </p>
                <p>
                  <span className="font-semibold text-[var(--text-grey-5)] mr-[49px]">
                    In Stock
                  </span>
                  {post.stock?.quantity || 0} {post.stock?.unit || "items"}
                </p>
              </div>
            </div>

            <p className="text-[14px] text-[var(--text-grey-4)] min-w-[180px]">
              <span className="font-semibold text-[var(--text-grey-5)] mr-3">
                Created On
              </span>
              {formatDate(post.createdAt)}
            </p>

            <Button1
              variant="outline"
                color="orange"
                size="sm"
                className="group !border-none p-[16px] bg-[var(--primary-cream-100)] rounded-[8px]"
              aria-label="Delete food post history"
              onClick={() => handleDeletePost(post._id)}
              disabled={deleteLoading}
            >
              <Icon name="delete_icon_orange" className="group-hover:hidden"/>
              <Icon name="delete_icon_white" className="hidden group-hover:block"/>
            </Button1>

            <Link
              to={`/profile/history/food-posts/${post._id}/requests`}
              state={{ postTitle: post.title }}
              aria-label={`View history requests for ${post.title}`}
            >
              <Button1
                variant="outline"
                color="green"
                size="sm"
                className="group px-[14px] py-[15px] rounded-[10px]"
              >
                <Icon name="right_arrow_grey" className="group-hover:hidden" />
                <Icon name="right_arrow" className="hidden group-hover:block" />
              </Button1>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default HistoryFoodPostsPage;
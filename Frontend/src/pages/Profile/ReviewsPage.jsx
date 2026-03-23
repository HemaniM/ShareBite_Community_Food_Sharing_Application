import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchMyProfile } from "../../features/profile/profileSlice";

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
};

const ReviewsPage = () => {
  const dispatch = useAppDispatch();
  const { profileData, loading, error } = useAppSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  const reviews = Array.isArray(profileData?.reviews)
    ? profileData.reviews
    : [];
  const averageRating = Number(profileData?.averageRating || 0);
  const totalReviews = Number(profileData?.totalReviews || reviews.length || 0);

  const formattedRating = useMemo(() => {
    if (!totalReviews) {
      return "0.0";
    }

    return averageRating.toFixed(1);
  }, [averageRating, totalReviews]);

  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
      <div className="max-w-[700px]">
        <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-[50px]">
          RATINGS & REVIEWS
        </h2>

        <div className="flex items-end gap-[25px] mt-5">
          <div className="flex items-end gap-[15px]">
            <p className="text-[44px] leading-none font-bold text-[#2e2c27]">
              {formattedRating}/5
            </p>
            <Icon name="star_icon_review_page" />
          </div>
          <p className="text-[16px] text-[var(--text-grey-4)]">
            {totalReviews} Reviews
          </p>
        </div>

        {profileData?.isTrusted ? (
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
        ) : null}

        <div className="mt-[50px] space-y-4">
          {loading ? <p>Loading reviews...</p> : null}
          {error ? <p className="text-red-500">{error}</p> : null}
          {!loading && !reviews.length ? (
            <article className="rounded-[8px] border border-[var(--white-600)] bg-white py-[20px] px-[30px] shadow-[0_1px_0_0_rgba(0,0,0,0.02)] text-[13px] text-[var(--text-grey-4)]">
              No one has reviewed your donations yet.
            </article>
          ) : null}

          {reviews.map((review) => {
            const reviewerId = review.reviewer?._id;
            const reviewerName = review.reviewer?.name || "Anonymous";
            const reviewerLocation = [
              review.reviewer?.city,
              review.reviewer?.district,
              review.reviewer?.state,
            ]
              .filter(Boolean)
              .join(", ");
            const reviewerImage =
              review.reviewer?.profileImage || "/images/profile_image.jpg";

            return (
              <article
                key={review._id}
                className="rounded-[8px] border border-[var(--white-600)] bg-white py-[20px] px-[30px] shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-[20px]">
                    {reviewerId ? (
                      <Link
                        to={`/user/${reviewerId}`}
                        className="flex items-center gap-[20px]"
                      >
                        <img
                          src={reviewerImage}
                          alt={reviewerName}
                          className="h-10 w-10 rounded-[12px] object-cover transition hover:opacity-90"
                        />
                        <h3 className="text-[13px] font-semibold text-[#2e2c27] transition hover:text-orange">
                          {reviewerName}
                        </h3>
                      </Link>
                    ) : (
                      <>
                        <img
                          src={reviewerImage}
                          alt={reviewerName}
                          className="h-10 w-10 rounded-[12px] object-cover"
                        />
                        <h3 className="text-[13px] font-semibold text-[#2e2c27]">
                          {reviewerName}
                        </h3>
                      </>
                    )}
                  </div>

                  <p className="text-[12px] text-[var(--text-grey-5)]">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <div className="mt-3">
                  <div className="flex flex-row items-center">
                    <p className="text-[14px] font-semibold text-[var(--text-grey-5)] mr-1">
                      {Number(review.rating || 0).toFixed(1)}/5
                    </p>
                    <Icon name="star_icon_review_page_small" />
                  </div>
                  <p className="text-[13px] text-[var(--text-grey-5)] mt-0.5 flex items-center gap-1">
                    {reviewerLocation || "Location not provided"}
                  </p>
                </div>

                <p className="mt-2 text-[11px] leading-[18px] text-[var(--text-grey-4)]">
                  "{review.comment}"
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;

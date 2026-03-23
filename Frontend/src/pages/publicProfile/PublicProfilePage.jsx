import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import ContactBar from "../../components/common/ContactBar";
import NavbarHomepage from "../../components/common/NavBarHomepage";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";
import Footer from "../../components/common/Footer";
import {
  clearUserProfile,
  fetchPublicProfileById,
} from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB");
};

const PublicProfilePage = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const { userProfile, userProfileLoading, userProfileError } = useAppSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchPublicProfileById(userId));
    }

    return () => {
      dispatch(clearUserProfile());
    };
  }, [dispatch, userId]);

  const mappedUser = useMemo(() => {
    if (!userProfile) {
      return null;
    }

    const reviews = Array.isArray(userProfile.reviews)
      ? userProfile.reviews
      : [];

    const totalReviews = Number(
      userProfile.totalReviews ||
        userProfile.reviewsCount ||
        reviews.length ||
        0,
    );

    const averageRating = Number(
      userProfile.averageRating ||
        userProfile.rating ||
        userProfile.avgRating ||
        0,
    );

    return {
      fullName:
        userProfile.fullName ||
        userProfile.name ||
        userProfile.username ||
        "Unknown User",
      email: userProfile.email || "",
      about:
        userProfile.about ||
        userProfile.bio ||
        "This user has not added an about section yet.",
      location:
        [userProfile.city, userProfile.district, userProfile.state]
          .filter(Boolean)
          .join(", ") ||
        userProfile.location ||
        "Not provided",
      contact: userProfile.phone || userProfile.contact || "Not provided",
      profileImage:
        userProfile.avatar ||
        userProfile.profileImage ||
        "/images/profile_image.jpg",
      rating: totalReviews ? averageRating : 0,
      totalReviews,
      isTrusted: Boolean(userProfile.isTrusted) || averageRating >= 4,
      reviews,
    };
  }, [userProfile]);

  return (
    <>
      <Helmet>
        <title>
          {mappedUser?.fullName
            ? `${mappedUser.fullName} | ShareBite`
            : "User Profile | ShareBite"}
        </title>
      </Helmet>

      <main className="w-full bg-white">
        <ContactBar />
        <section className="w-full">
          <NavbarHomepage showBorder={true} />

          <div className="mx-auto mt-[50px] mb-[100px] w-full max-w-[975px] px-4 py-2 sm:px-0">
            {userProfileLoading ? (
              <p className="text-[15px] text-[var(--text-grey-4)]">
                Loading user profile...
              </p>
            ) : userProfileError ? (
              <p className="text-[15px] text-[var(--primary-orange-700)]">
                {userProfileError}
              </p>
            ) : !mappedUser ? (
              <p className="text-[15px] text-[var(--text-grey-4)]">
                No user data found...
              </p>
            ) : (
              <>
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
                  <div>
                    <img
                      src={mappedUser.profileImage}
                      alt={mappedUser.fullName}
                      className="h-[260px] w-[260px] rounded-[12px] object-cover"
                    />
                  </div>

                  <div>
                    <h1 className="text-[22px] font-bold uppercase text-black">
                      {mappedUser.fullName}
                    </h1>
                    <p className="mt-[10px] text-[16px] text-[var(--text-grey-3)]">
                      {mappedUser.email}
                    </p>

                    <div className="mt-[30px]">
                      <h2 className="text-[14px] font-bold text-[var(--text-grey-5)]">
                        About Me
                      </h2>
                      <p className="mt-[5px] max-w-[620px] text-[12px] leading-[20px] text-[var(--text-grey-4)]">
                        {mappedUser.about}
                      </p>
                    </div>

                    <div className="mt-[30px] space-y-[10px] text-[14px]">
                      <p className="text-[var(--text-grey-4)]">
                        <span className="mr-4 font-bold text-[var(--text-grey-5)]">
                          Location
                        </span>
                        {mappedUser.location}
                      </p>
                      <p className="text-[var(--text-grey-4)]">
                        <span className="mr-5 font-bold text-[var(--text-grey-5)]">
                          Contact
                        </span>
                        {mappedUser.contact}
                      </p>
                    </div>
                  </div>
                </div>

                <section className="mt-14">
                  <h2 className="text-[20px] font-bold text-black">
                    Ratings & Reviews
                  </h2>
                  <div className="mt-[30px]">
                    <div className="flex items-end gap-[25px]">
                      <div className="flex items-center gap-[10px]">
                        <p className="text-[44px] font-bold text-[var(--text-grey-5)]">
                          {Number(mappedUser.rating).toFixed(1)}/5
                        </p>
                        <Icon name="star_icon_review_page" />
                      </div>
                      <p className="text-[16px] font-regular text-[var(--text-grey-4)]">
                        {mappedUser.totalReviews} Reviews
                      </p>
                    </div>

                    {mappedUser.isTrusted ? (
                      <Button1
                        type="button"
                        variant="filled"
                        color="green"
                        size="md"
                        className="mt-5 rounded-full bg-[var(--primary-green-50)] px-[20px] py-[6px] text-[14px] font-medium normal-case text-[var(--text-grey-4)]"
                      >
                        <span className="mr-[10px]">
                          <Icon name="green_tick_icon" />
                        </span>
                        Trusted
                      </Button1>
                    ) : null}
                  </div>
                  <div className="mt-[50px] space-y-[20px]">
                    {mappedUser.reviews.length === 0 ? (
                      <p className="text-[13px] text-[var(--text-grey-3)]">
                        No reviews available for this user yet...
                      </p>
                    ) : (
                      mappedUser.reviews.map((review, index) => {
                        const reviewerId =
                          review.reviewer?._id ||
                          review.reviewerId ||
                          review.userId ||
                          review.user?._id;
                        const reviewerName =
                          review.reviewer?.name ||
                          review.reviewerName ||
                          review.name ||
                          "Anonymous";

                        return (
                          <article
                            key={review._id || review.id || index}
                            className="max-w-[900px] rounded-[8px] border border-[var(--white-600)] bg-white px-[30px] py-[20px] shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-[20px]">
                                {reviewerId ? (
                                  <Link
                                    to={`/user/${reviewerId}`}
                                    className="flex items-center gap-[20px]"
                                  >
                                    <img
                                      src={
                                        review.reviewer?.profileImage ||
                                        review.reviewerAvatar ||
                                        review.image ||
                                        "/images/Aarav_Shah.jpg"
                                      }
                                      alt={reviewerName}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <h3 className="text-[13px] font-semibold text-[#2e2c27] transition hover:text-orange">
                                      {reviewerName}
                                    </h3>
                                  </Link>
                                ) : (
                                  <>
                                    <img
                                      src={
                                        review.reviewer?.profileImage ||
                                        review.reviewerAvatar ||
                                        review.image ||
                                        "/images/Aarav_Shah.jpg"
                                      }
                                      alt={reviewerName}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <h3 className="text-[13px] font-semibold text-[#2e2c27]">
                                      {reviewerName}
                                    </h3>
                                  </>
                                )}
                              </div>
                              <p className="text-[12px] text-[var(--text-grey-5)]">
                                {formatDate(review.createdAt || review.date)}
                              </p>
                            </div>
                            <div className="mt-3">
                              <div className="flex flex-row items-center">
                                <p className="mr-1 text-[13px] font-semibold text-[var(--text-grey-5)]">
                                  {Number(review.rating || 0).toFixed(1)}
                                </p>
                                <Icon name="star_icon_review_page_small" />
                              </div>
                              <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[var(--text-grey-5)]">
                                {[
                                  review.reviewer?.city,
                                  review.reviewer?.district,
                                  review.reviewer?.state,
                                ]
                                  .filter(Boolean)
                                  .join(", ") ||
                                  review.location ||
                                  "Location not provided"}
                              </p>
                            </div>
                            <p className="mt-3 text-[12px] leading-[18px] text-[var(--text-grey-4)]">
                              {review.comment || review.reviewText || ""}
                            </p>
                          </article>
                        );
                      })
                    )}
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

export default PublicProfilePage;

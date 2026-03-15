import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import ContactBar from "../../components/common/ContactBar";
import NavbarHomepage from "../../components/common/NavBarHomepage";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";

import Footer from "../../components/common/Footer";
// import {
//   clearUserProfile,
//   fetchUserProfileById,
// } from "../../features/profile/profileSlice";
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

const dummyUsers = [
  {
    id: 1,
    fullName: "Aarav Shah",
    email: "aarav.shah@example.com",
    about:
      "Food donor passionate about reducing food waste and helping communities.",
    location: "Mumbai, India",
    phone: "+91 9876543210",
    avatar: "/images/profile_image.jpg",
    rating: 4.6,
    totalReviews: 3,
    reviews: [
      {
        id: "r1",
        reviewerName: "Riya Mehta",
        reviewerAvatar: "/images/Aarav_Shah.jpg",
        rating: 4.5,
        comment: "Very generous donor and food quality was excellent.",
        createdAt: "2024-05-12",
      },
      {
        id: "r2",
        reviewerName: "Kabir Patel",
        reviewerAvatar: "/images/Aarav_Shah.jpg",
        rating: 5,
        comment: "Always reliable and quick to respond.",
        createdAt: "2024-06-01",
      },
      {
        id: "r3",
        reviewerName: "Neha Kapoor",
        reviewerAvatar: "/images/Aarav_Shah.jpg",
        rating: 4.2,
        comment: "Great experience, highly recommended donor.",
        createdAt: "2024-06-15",
      },
    ],
  },
  {
    id: 2,
    fullName: "Priya Verma",
    email: "priya.verma@example.com",
    about: "Love sharing extra home-cooked food with people who need it.",
    location: "Delhi, India",
    phone: "+91 9123456780",
    avatar: "/images/profile_image.jpg",
    rating: 4.2,
    totalReviews: 2,
    reviews: [
      {
        id: "r4",
        reviewerName: "Ankit Singh",
        reviewerAvatar: "/images/Aarav_Shah.jpg",
        rating: 4,
        comment: "Good quality food and friendly interaction.",
        createdAt: "2024-04-10",
      },
      {
        id: "r5",
        reviewerName: "Sara Khan",
        reviewerAvatar: "/images/Aarav_Shah.jpg",
        rating: 4.4,
        comment: "Pickup was smooth and food was fresh.",
        createdAt: "2024-05-20",
      },
    ],
  },
];

const PublicProfilePage = () => {
  //   const { userId } = useParams();
  const dispatch = useAppDispatch();

  //   const { userId: routeUserId } = useParams();
  const userId = 1;

  const userProfile = dummyUsers.find((user) => user.id === userId);

  const userProfileLoading = false;
  const userProfileError = null;

  //   const { userProfile, userProfileLoading, userProfileError } = useAppSelector(
  //     (state) => state.profile
  //   );

  //   useEffect(() => {
  //     if (userId) {
  //       dispatch(fetchUserProfileById(userId));
  //     }

  //     return () => {
  //       dispatch(clearUserProfile());
  //     };
  //   }, [dispatch, userId]);

  const mappedUser = useMemo(() => {
    if (!userProfile) {
      return null;
    }

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
      location: userProfile.location || userProfile.city || "Not provided",
      contact: userProfile.phone || userProfile.contact || "Not provided",
      profileImage:
        userProfile.avatar ||
        userProfile.profileImage ||
        "/images/profile_image.jpg",
      rating: Number(userProfile.rating || userProfile.avgRating || 0),
      totalReviews: Number(
        userProfile.totalReviews || userProfile.reviewsCount || 0,
      ),
      reviews: userProfile.reviews || [],
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

          <div className="mx-auto w-full max-w-[975px] py-2 mt-[50px] mb-[100px] px-4 sm:px-0">
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
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr] mt-8">
                  <div>
                    <img
                      src={mappedUser.profileImage}
                      alt={mappedUser.fullName}
                      className="w-[260px] h-[260px] rounded-[12px] object-cover"
                    />
                  </div>

                  <div>
                    <h1 className="text-[22px] font-bold uppercase text-black">
                      {mappedUser.fullName}
                    </h1>
                    <p className="text-[16px] text-[var(--text-grey-3)] mt-[10px]">
                      {mappedUser.email}
                    </p>

                    <div className="mt-[30px]">
                      <h2 className="text-[14px] font-bold text-[var(--text-grey-5)]">
                        About Me
                      </h2>
                      <p className="mt-[5px] text-[12px] leading-[20px] text-[var(--text-grey-4)] max-w-[620px]">
                        {mappedUser.about}
                      </p>
                    </div>

                    <div className="mt-[30px] space-y-[10px] text-[14px]">
                      <p className="text-[var(--text-grey-4)]">
                        <span className="font-bold text-[var(--text-grey-5)] mr-4">
                          Location
                        </span>
                        {mappedUser.location}
                      </p>
                      <p className="text-[var(--text-grey-4)]">
                        <span className="font-bold text-[var(--text-grey-5)] mr-5">
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

                    <Button1
                      type="button"
                      variant="filled"
                      color="green"
                      size="md"
                      className="bg-[var(--primary-green-50)] py-[6px] rounded-full px-[20px] text-[14px] font-medium text-[var(--text-grey-4)] normal-case mt-5"
                    >
                      <span className="mr-[10px]">
                        <Icon name="green_tick_icon" />
                      </span>
                      Trusted
                    </Button1>
                  </div>
                  <div className="mt-[50px] space-y-[20px]">
                    {mappedUser.reviews.length === 0 ? (
                      <p className="text-[13px] text-[var(--text-grey-3)]">
                        No reviews available for this user yet...
                      </p>
                    ) : (
                      mappedUser.reviews.map((review, index) => (
                        <article
                          key={review._id || review.id || index}
                          className="max-w-[900px] rounded-[8px] border border-[var(--white-600)] bg-white py-[20px] px-[30px] shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-[20px]">
                              <img
                                src={
                                  review.reviewerAvatar ||
                                  review.image ||
                                  "/images/Aarav_Shah.jpg"
                                }
                                alt={
                                  review.reviewerName ||
                                  review.name ||
                                  "Reviewer"
                                }
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <h3 className="text-[13px] font-semibold text-[#2e2c27]">
                                {review.reviewerName ||
                                  review.name ||
                                  "Anonymous"}
                              </h3>
                            </div>
                            <p className="text-[12px] text-[var(--text-grey-5)]">
                              {formatDate(review.createdAt || review.date)}
                            </p>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-row items-center">
                              <p className="text-[13px] font-semibold text-[var(--text-grey-5)] mr-1">
                                {Number(review.rating || 0).toFixed(1)}
                              </p>
                              <Icon name="star_icon_review_page_small" />
                            </div>
                            <p className="text-[13px] text-[var(--text-grey-5)] mt-0.5 flex items-center gap-1">
                              {review.location || "Bhayander"}
                            </p>
                          </div>
                          <p className="mt-3 text-[12px] leading-[18px] text-[var(--text-grey-4)]">
                            {review.comment || review.reviewText || ""}
                          </p>
                        </article>
                      ))
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

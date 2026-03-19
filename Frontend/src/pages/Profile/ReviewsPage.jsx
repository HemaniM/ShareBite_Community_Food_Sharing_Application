import React from "react";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";

const reviewData = [
  {
    id: 1,
    userId: "1",
    name: "Aanya Mishra",
    image: "../images/Ananya_Mishra.jpg",
    date: "4/10/2025",
    rating: 4.5,
    location: "Bhayander (E)",
    comment:
      "Great initiative by the Share-Fresh. Hygiene for dry mix was rich then. Shared thoughtful food for the community in need.",
  },
  {
    id: 2,
    userId: "2",
    name: "Aarav Shah",
    image: "../images/Aarav_Shah.jpg",
    date: "15/8/2025",
    rating: 4,
    location: "Bhayander (E)",
    comment:
      "Fresh and well-packed vegetable pulao. Nicely packed and safe to consume. Really appreciate the care taken while sharing.",
  },
  {
    id: 3,
    userId: "3",
    name: "Kavya Malkiye",
    image: "../images/Kavya_Melviya.jpg",
    date: "20/12/2025",
    rating: 3.5,
    location: "Bhayander (E)",
    comment:
      "Soft, flavorful homemade chapatis shared in perfect condition. Serving great hygiene and thoughtfulness.",
  },
];

const ReviewsPage = () => {
  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
      <div className="max-w-[700px]">
        <h2 className="text-xl lg:text-[22px] font-bold leading-7 lg:leading-[31px] text-left uppercase text-black font-['Nunito'] mb-[50px]">
          RATINGS & REVIEWS
        </h2>

        <div className="flex items-end gap-[25px] mt-5">
          <div className="flex items-end gap-[15px]">
            <p className="text-[44px] leading-none font-bold text-[#2e2c27]">
              4/5
            </p>
            <Icon name="star_icon_review_page" />
          </div>
          <p className="text-[16px] text-[var(--text-grey-4)]">50 Reviews</p>
        </div>

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

        <div className="mt-[50px] space-y-4">
          {reviewData.map((review) => (
            <article
              key={review.id}
              className="rounded-[8px] border border-[var(--white-600)] bg-white py-[20px] px-[30px] shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-[20px]">
                  {review.userId ? (
                    <Link
                      to={`/user/${review.userId}`}
                      className="flex items-center gap-[20px]"
                    >
                      <img
                        src={review.image}
                        alt={review.name}
                        className="h-10 w-10 rounded-[12px] object-cover transition hover:opacity-90"
                      />
                      <h3 className="text-[13px] font-semibold text-[#2e2c27] transition hover:text-orange">
                        {review.name}
                      </h3>
                    </Link>
                  ) : (
                    <>
                      <img
                        src={review.image}
                        alt={review.name}
                        className="h-10 w-10 rounded-[12px] object-cover"
                      />
                      <h3 className="text-[13px] font-semibold text-[#2e2c27]">
                        {review.name}
                      </h3>
                    </>
                  )}
                </div>

                <p className="text-[12px]  text-[var(--text-grey-5)]">
                  {review.date}
                </p>
              </div>

              <div className="mt-3">
                <div className="flex flex-row items-center">
                  <p className="text-[14px] font-semibold text-[var(--text-grey-5)] mr-1">
                    {review.rating}/5{" "}
                  </p>
                  <Icon name="star_icon_review_page_small" />
                </div>
                <p className="text-[13px] text-[var(--text-grey-5)] mt-0.5 flex items-center gap-1">
                  {review.location}
                </p>
              </div>

              <p className="mt-2 text-[11px] leading-[18px] text-[var(--text-grey-4)]">
                "{review.comment}"
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;

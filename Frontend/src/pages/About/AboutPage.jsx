import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ContactBar from "../../components/common/ContactBar";
import HomepageNavBar from "../../components/common/NavBarHomepage";
import Footer from "../../components/common/Footer";

const highlights = [
  {
    image: "/images/About_page_grid_img_1.jpg",
    text: "large quantities of perfectly edible food are discarded every day.",
    textOnly: true,
  },
  {
    image: "/images/About_page_grid_img_2.jpg",
  },
  {
    image: "/images/About_page_grid_img_3.jpg",
    text: "community participation can transform excess into opportunity.",
  },
  {
    image: "/images/About_page_grid_img_4.jpg",
  },
  {
    image: "/images/About_page_grid_img_5.jpg",
    text: "while some discard food, others struggle to find their next meal.",
    textOnly: true,
  },
  {
    image: "/images/About_page_grid_img_6.jpg",
  },
];

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About ShareBite</title>
        <meta
          name="description"
          content="Learn about ShareBite and how we connect people to reduce food waste through community sharing."
        />
      </Helmet>

      <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-muted)]">
        <ContactBar />
        <HomepageNavBar />

        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-12 px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <section
            className="flex h-[260px] items-center justify-center rounded-[20px] bg-cover bg-center text-center shadow-[0_10px_35px_rgba(0,0,0,0.08)] sm:h-[360px]"
            style={{
              backgroundImage: "url('/images/About_page_hero_section_img.jpg')",
            }}
          >
            <h1 className="font-['Nunito'] text-[36px] font-extrabold uppercase tracking-[2px] text-[var(--text-white)] sm:text-[52px]">
              About Us
            </h1>
          </section>

          <section className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <h2 className="font-['Nunito'] text-[30px] font-extrabold uppercase leading-[1.15] text-black sm:text-[42px]">
                About
                <br />
                ShareBite
              </h2>
              <p className="mt-5 max-w-[520px] font-['Nunito'] text-[16px] leading-7 text-[var(--text-grey-3)]">
                ShareBite is a community-driven platform dedicated to reducing
                food waste while helping people connect and support one another.
                Every day, perfectly good food goes unused while many families
                and individuals still face hunger. ShareBite bridges this gap by
                making it simple for people to share extra food with nearby
                community members.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/About_page_about_sharebite_img_1.jpg"
                alt="People enjoying a meal together"
                className="h-[280px] w-full rounded-[8px] object-cover"
              />
              <img
                src="/images/About_page_about_sharebite_img_2.jpg"
                alt="Food plates on the table"
                className="h-[280px] w-full rounded-[8px] object-cover"
              />
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => (
              <article
                key={`${item.image}-${index}`}
                className="relative h-[220px] overflow-hidden rounded-[8px] bg-white"
              >
                {!item.textOnly ? (
                  <img
                    src={item.image}
                    alt="ShareBite value"
                    className="h-full w-full object-cover"
                  />
                ) : null}

                {item.text ? (
                  <div
                    className={`absolute inset-0 flex items-center ${item.textOnly ? "bg-white" : "bg-[rgba(0,0,0,0.35)]"} p-6`}
                  >
                    <p
                      className={`font-['Nunito'] text-[20px] font-bold leading-8 ${item.textOnly ? "text-[var(--text-grey-4)]" : "text-white"}`}
                    >
                      {item.text}
                    </p>
                  </div>
                ) : null}
              </article>
            ))}
          </section>

          <section className="rounded-[14px] bg-[#f5f5f5] px-3 py-10 sm:px-6 lg:px-10">
            <h2 className="text-center font-['Nunito'] text-[30px] font-extrabold uppercase tracking-[1px] text-black">
              How It Works
            </h2>

            <img
              src="/images/About_page_how_it_works_img.jpg"
              alt="How ShareBite works"
              className="mx-auto mt-8 w-full max-w-[840px] rounded-[10px] object-cover"
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr] lg:items-stretch">
            <article className="rounded-[8px] border border-[var(--white-600)] bg-white p-7">
              <h3 className="font-['Nunito'] text-[26px] font-bold text-black">
                Why Choose ShareBite
              </h3>
              <p className="mt-4 font-['Nunito'] text-[15px] leading-7 text-[var(--text-grey-3)]">
                We build meaningful local connections while reducing food waste.
                ShareBite offers a simple, trusted, and community-first
                experience for donors and recipients.
              </p>
            </article>

            <img
              src="/images/About_page_our_goal_img.jpg"
              alt="Healthy meal bowl"
              className="h-[260px] w-full rounded-[8px] object-cover"
            />

            <article className="rounded-[8px] bg-[#aa7a34] p-7 text-white">
              <h3 className="font-['Nunito'] text-[28px] font-bold uppercase">
                Our Goal
              </h3>
              <p className="mt-4 font-['Nunito'] text-[15px] leading-7 text-[#f8f4ea]">
                Our goal is to bridge the gap between food surplus and food
                scarcity by creating a transparent and inclusive sharing
                ecosystem. Through ShareBite, we empower people to take action
                against hunger and reduce waste.
              </p>
            </article>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            <article className="rounded-[8px] border border-[var(--white-600)] bg-white p-7 sm:p-8">
              <h3 className="font-['Nunito'] text-[28px] font-extrabold uppercase text-[var(--text-primary)]">
                Make a Difference Now
              </h3>
              <p className="mt-3 max-w-[420px] font-['Nunito'] text-[15px] leading-7 text-[var(--text-grey-3)]">
                Take the first step toward building a more sustainable and
                connected community.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="rounded-[10px] border border-[var(--border-orange)] px-6 py-3 font-['Nunito'] text-[13px] font-bold uppercase tracking-[1px] text-[var(--text-orange)] transition hover:bg-[var(--text-orange)] hover:text-white"
                >
                  Join Us
                </Link>
                <Link
                  to="/signup"
                  className="rounded-[10px] bg-[var(--text-orange)] px-6 py-3 font-['Nunito'] text-[13px] font-bold uppercase tracking-[1px] text-white transition hover:opacity-90"
                >
                  Sign Up Now
                </Link>
              </div>
            </article>

            <img
              src="/images/About_page_call_to_action_img.jpg"
              alt="Fresh soup and vegetables"
              className="h-[280px] w-full rounded-[8px] object-cover"
            />
          </section>
        </div>

        <Footer className="mt-0" />
      </main>
    </>
  );
};

export default AboutPage;

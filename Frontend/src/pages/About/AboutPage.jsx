import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ContactBar from "../../components/common/ContactBar";
import HomepageNavBar from "../../components/common/NavBarHomepage";
import Footer from "../../components/common/Footer";
import { Icon } from "../../components/Icons/Icons";
import Button1 from "../../components/ui/Button1";

const highlights = [
  {
    image: "",
    text: "Large quantities of perfectly edible food are discarded every day.",
    textOnly: true,
    classes: "gap-[10px]",
    iconName: "inverted_comma_black"
  },
  {
    image: "/images/About_page_grid_img_1.jpg",
    text: "",
    textOnly: false,
    classes: "",
    iconName: ""
  },
  {
    image: "/images/About_page_grid_img_3.jpg",
    text: "",
    textOnly: false,
    classes: "row-span-2",
    iconName: ""
  },
  {
    image: "/images/About_page_grid_img_2.jpg",
    textOnly: false,
    classes: "",
    iconName: ""
  },
  {
    image: "",
    text: "While some discard food, others struggle to find their next meal.",
    textOnly: true,
    classes: "gap-[10px]",
    iconName: "inverted_comma_orange"
  },
  {
    image: "/images/About_page_grid_img_4.jpg",
    text: "",
    textOnly: false,
    classes: "row-span-2",
    iconName: ""
  },
  {
    image: "/images/About_page_grid_img_5.jpg",
    text: "",
    textOnly: false,
    classes: "row-span-2",
    iconName: ""
  },
  {
    image: "",
    text: "A shared meal can create connections that go beyond food.",
    textOnly: true,
    classes: "gap-[10px]",
    iconName: "inverted_comma_green"
  },
  {
    image: "/images/About_page_grid_img_6.jpg",
    text: "",
    textOnly: false,
    classes: "",
    iconName: ""
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

        <div className="mx-auto flex w-full flex-col gap-[60px] mt-6 mb-[100px]">
          <section
            className="max-w-[1100px] mx-auto flex w-full h-[455px] items-center justify-center rounded-[20px] bg-cover bg-center text-center shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
            style={{
              backgroundImage: "url('/images/About_page_hero_section_img.jpg')",
            }}
          >
            <h1 className="font-['Nunito'] text-[36px] font-extrabold uppercase tracking-[2px] text-[var(--text-white)] sm:text-[52px] shadow-[0_15px_50px_rgba(0,0,0,0.35)]`">
              About Us
            </h1>
          </section>

          <section className="max-w-[1100px] mx-auto grid gap-10 lg:grid-cols-[1fr_498px] lg:items-start">
            <div>
              <h2 className="font-['Nunito'] text-[24px] font-bold uppercase leading-[1.15] text-black">
                About
                <br />
                ShareBite
              </h2>
              <p className="mt-5 max-w-[500px] font-['Nunito'] text-[16px] leading-7 text-[var(--text-grey-3)]">
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
                className="h-[360px] w-full rounded-[8px] object-cover"
              />
              <img
                src="/images/About_page_about_sharebite_img_2.jpg"
                alt="Food plates on the table"
                className="h-[360px] w-full rounded-[8px] object-cover"
              />
            </div>
          </section>

          <section className="max-w-[1100px] mt-[30px] mx-auto grid w-[1100px] grid-cols-3 grid-cols-[350px_350px_350px] gap-[25px] auto-rows-[255px]">
            {highlights.map((item, index) => (
              <article
                key={`${item.image}-${index}`}
                className={`${item.classes || ""} relative overflow-hidden rounded-[5px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]`}
              >
                {!item.textOnly ? (
                  <img
                    src={item.image}
                    alt="ShareBite value"
                    className="h-full w-full object-cover"
                  />
                ) : null}
                {item.iconName ? (
                  <Icon name={item.iconName} />
                ) : null}
                {item.text ? (
                  <div
                    className={`absolute inset-0 flex items-center ${item.textOnly ? "bg-white" : "bg-[rgba(0,0,0,0.35)]"} p-6`}
                  >
                    <p
                      className={`font-['Nunito'] text-[20px] font-semibold leading-8 ${item.textOnly ? "text-[var(--text-grey-4)]" : ""}`}
                    >
                      {item.text}
                    </p>
                  </div>
                ) : null}
              </article>
            ))}
          </section>

          <section className="mt-[40px] bg-[var(--bg-secondary)]">
            <div className="max-w-[1100px] mx-auto mt-[80px] mb-[40px]">
              <h2 className="text-center font-['Nunito'] text-[30px] font-extrabold uppercase tracking-[1px] text-black">
                How It Works
              </h2>

              <img
                src="/images/About_page_how_it_works_img.jpg"
                alt="How ShareBite works"
                className="mx-auto mt-8 w-full max-w-[840px] object-cover"
              />
            </div>
          </section>

          <section className="w-[975px] mt-[30px] mx-auto flex justify-between">
            <article className="w-[300px] h-[400px] rounded-[8px] border border-[var(--white-600)] bg-white p-10 pt-[60px]">
              <div className="h-[1px] w-[150px] bg-[#B8A080]"></div>
              <h3 className="mt-[20px] font-['Nunito'] text-[20px] font-bold text-black">
                Why Choose ShareBite
              </h3>
              <p className="w-[228px] mt-[15px] font-['Nunito'] text-[14px] leading-6 text-[var(--text-grey-3)]">
                We build meaningful local connections while reducing food waste.
                ShareBite offers a simple, trusted, and community-first
                experience for donors and recipients.
              </p>
              <Link
                to="/signup"
              >
                <Button1
                  variant="outline"
                  color="orange"
                  size="md"
                  className="mt-[20px] rounded-full px-[20px] py-[6px] text-[14px] font-bold"
                >
                  JOIN US
                </Button1>
              </Link>
            </article>

            <img
              src="/images/About_page_our_goal_img.jpg"
              alt="Healthy meal bowl"
              className="max-w-[300px] max-h-[400px] w-full rounded-[8px] object-cover"
            />

            <article className="w-[300px] h-[400px] rounded-[8px] bg-[#aa7a34] p-7 text-white flex flex-col gap-[15px]">
              <h3 className="font-['Nunito'] text-[24px] font-bold uppercase">
                Our Goal
              </h3>
              <div className="h-[1px] w-[150px] bg-[#B8A080]"></div>
              <Icon name="inverted_comma_orange" />
              <p className="w-[218px] font-['Nunito'] text-[15px] leading-7 text-[var(--text-grey-1)]">
                Our goal is to bridge the gap between food surplus and food
                scarcity by creating a transparent and inclusive sharing
                ecosystem. Through ShareBite, we empower people to take action
                against hunger and reduce waste.
              </p>
            </article>
          </section>

          <section className="max-w-[975px] mt-[30px] mx-auto flex gap-[20px]">
            <article className="w-[455px] rounded-[8px] border border-[var(--white-600)] bg-white px-[60px] pt-[60px]">
              <h3 className="font-['Nunito'] text-[20px] font-bold uppercase text-[var(--text-primary)]">
                Make a Difference Now
              </h3>
              <p className="mt-3 max-w-[300px] font-['Nunito'] text-[18px] leading-7 text-[var(--text-grey-3)]">
                Take the first step toward building a more sustainable and
                connected community.
              </p>
              <Link
                to="/signup"
              >
                <Button1
                  variant="outline"
                  color="orange"
                  size="md"
                  className="group mt-[20px] px-[30px] py-[8px] text-[15px] font-bold uppercase"
                >
                  <span className="mr-[20px]">Sign Up Now</span>
                  <Icon
                    name="right_arrow_orange"
                    className="group-hover:hidden"
                  />
                  <Icon
                    name="right_arrow"
                    className="hidden group-hover:block"
                  />
                </Button1>
              </Link>
            </article>

            <img
              src="/images/About_page_call_to_action_img.jpg"
              alt="Fresh soup and vegetables"
              className="h-[333px] w-[500px] rounded-[8px] object-cover"
            />
          </section>
        </div>

        <Footer className="mt-0" />
      </main>
    </>
  );
};

export default AboutPage;

import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import ContactBar from "../../components/common/ContactBar";
import HomepageNavBar from "../../components/common/NavBarHomepage";
import Footer from "../../components/common/Footer";
import Button1 from "../../components/ui/Button1";
import { CONTACT_EMAIL, sendContactEmail } from "../../utils/contactAPI";
import { Icon } from "../../components/Icons/Icons";
// import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const CONTACT_DETAILS = [
  {
    title: "Phone Number",
    value: "+91 90224 42156",
    icon: "contact_phone_icon",
  },
  {
    title: "Email Address",
    value: CONTACT_EMAIL,
    icon: "contact_email_icon",
  },
  {
    title: "Office Address",
    value:
      "Flat 302, Shree Ganesh Apartments, Link road, Andheri west, Mumbai, Maharashtra - 400053",
    icon: "contact_address_icon",
  },
];

const FAQS = [
  {
    question: "What is ShareBite?",
    answer:
      "ShareBite is a community-driven platform that helps people, restaurants, and local organisations share surplus food with nearby recipients instead of letting it go to waste.",
  },
  {
    question: "Is the food free?",
    answer:
      "Yes, most food shared on ShareBite is offered free of cost. Some donors may mention a handling charge when applicable, but the main goal is reducing food waste and supporting the community.",
  },
  {
    question: "How do I share food on the platform?",
    answer:
      "You can share food by creating a listing with the food name, quantity, pickup details, availability window, and a photo if possible. Nearby users can then view and request the food.",
  },
  {
    question: "Is the food safe to consume?",
    answer:
      "ShareBite encourages donors to share only fresh, properly stored food and to mention expiry details clearly. Recipients should still review listing information carefully before accepting a request.",
  },
  {
    question: "Can I cancel a request?",
    answer:
      "Yes. If your plans change, you can cancel your request so the food becomes available to someone else in the community.",
  },
  {
    question: "Can restaurants or businesses donate food?",
    answer:
      "Absolutely. Restaurants, cafés, caterers, and other businesses are encouraged to donate surplus food through ShareBite to reduce waste and help people nearby.",
  },
  {
    question: "How can I report an issue or inappropriate listing?",
    answer:
      "If you notice any issue, inaccurate information, or inappropriate listing, please contact the support team through this page so it can be reviewed quickly.",
  },
];

const initialContactForm = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  const [contactForm, setContactForm] = useState(initialContactForm);
  // const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [openFaqs, setOpenFaqs] = useState(() => new Set([1]));

  const heroStyle = useMemo(
    () => ({
      backgroundImage: "url('/images/Contact_page_bg_image.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [],
  );

  const feedbackStyle = useMemo(
    () => ({
      backgroundImage: "url('/images/Your_feedback_bg_image.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [],
  );

  const toggleFaq = (index) => {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // setStatus({ type: "idle", message: "" });

    try {
      await sendContactEmail({
        name: contactForm.name.trim(),
        phone: contactForm.phone.trim(),
        replyTo: contactForm.email.trim(),
        subject: contactForm.subject.trim(),
        message: contactForm.message.trim(),
        source: "Contact Form",
      });

      setContactForm(initialContactForm);

      showSuccessToast("Your message was sent successfully!");
      // toast.success("Your message was sent successfully!");
      // setStatus({
      //   type: "success",
      //   message:
      //     "Your message was sent successfully. Our team will contact you shortly.",
      // });
    } catch (error) {
      showErrorToast(error.message || "Something went wrong. Try again.");
      // toast.error(error.message || "Something went wrong. Try again.");
      // setStatus({
      //   type: "error",
      //   message: error.message || "We could not send your message right now.",
      // });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact ShareBite | Get in Touch</title>
        <meta
          name="description"
          content="Contact ShareBite for support, questions, partnerships, and feedback about community food sharing."
        />
      </Helmet>

      <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-muted)]">
        <ContactBar />
        <HomepageNavBar />

        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-12 px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <section
            style={heroStyle}
            className="flex h-[260px] items-center justify-center rounded-[20px] text-center shadow-[0_10px_35px_rgba(0,0,0,0.08)] sm:h-[360px]"
          >
            <h1 className="font-['Nunito'] text-[36px] font-extrabold uppercase tracking-[2px] text-[var(--text-white)] sm:text-[50px]">
              Contact Us
            </h1>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[20px]">
                <div className="max-w-[145px] rounded-full border border-[var(--border-orange)] px-[20px] py-[10px] font-['Nunito'] text-[14px] font-bold uppercase tracking-[1px] text-[var(--text-orange)]">
                  Contact Us
                </div>
                <h2 className="max-w-[320px] font-['Nunito'] text-[24px] font-bold uppercase leading-[1.2] text-black">
                  We&apos;d love to hear from you!
                </h2>
                <p className="max-w-[430px] font-['Nunito'] text-[17px] leading-7 text-[var(--text-grey-3)]">
                  Have a question, suggestion, or need assistance? Our team is
                  here to help. Reach out to us and we&apos;ll get back to you.
                </p>
              </div>

              <div className="h-[1px] w-[95%] bg-[var(--white-600)]"></div>

              <div className="grid grid-cols-[210px_1fr] gap-y-5 gap-x-2 rounded-[20px]">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <Icon name={item.icon} />

                    <div className="">
                      <h3 className="font-['Nunito'] text-[15px] font-semibold text-[var(--text-grey-5)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 max-w-[280px] whitespace-pre-line font-['Nunito'] text-[14px] leading-6 text-[var(--text-grey-3)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-[var(--bg-secondary)] p-7 py-8">
              <h2 className="font-['Nunito'] text-[26px] font-bold text-black">
                Get In Touch
              </h2>
              <p className="mt-3 max-w-[480px] font-['Nunito'] text-[15px] font-semibold leading-7 text-[var(--text-grey-3)]">
                Please fill out the form below and our team will get back to you
                shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    value={contactForm.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="h-[52px] rounded-[12px] border border-transparent bg-white px-4 font-['Nunito'] text-[15px] text-[var(--text-primary)] outline-none transition focus:border-[var(--border-orange)]"
                  />
                  <input
                    required
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="h-[52px] rounded-[12px] border border-transparent bg-white px-4 font-['Nunito'] text-[15px] text-[var(--text-primary)] outline-none transition focus:border-[var(--border-orange)]"
                  />
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="h-[52px] w-full rounded-[12px] border border-transparent bg-white px-4 font-['Nunito'] text-[15px] text-[var(--text-primary)] outline-none transition focus:border-[var(--border-orange)]"
                />
                <input
                  required
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="h-[52px] w-full rounded-[12px] border border-transparent bg-white px-4 font-['Nunito'] text-[15px] text-[var(--text-primary)] outline-none transition focus:border-[var(--border-orange)]"
                />
                <textarea
                  required
                  name="message"
                  value={contactForm.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={7}
                  className="w-full rounded-[12px] border border-transparent bg-white px-4 py-4 font-['Nunito'] text-[15px] text-[var(--text-primary)] outline-none transition focus:border-[var(--border-orange)]"
                />

                {/* {status.message ? (
                  <p
                    className={`font-['Nunito'] text-[14px] font-semibold ${
                      status.type === "success"
                        ? "text-[var(--primary-green)]"
                        : "text-red-500"
                    }`}
                  >
                    {status.message}
                  </p>
                ) : null} */}

                <Button1
                  type="submit"
                  disabled={submitting}
                  variant="filled"
                  color="orange"
                  size="md"
                  className="min-w-[180px] rounded-[12px] px-7 py-3 font-bold text-[14px] uppercase tracking-[1px] disabled:opacity-70"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button1>
              </form>
            </div>
          </section>

          <section className="mt-[40px]">
            <h2 className="font-['Nunito'] text-[22px] font-bold uppercase text-black">
              Need immediate help?
            </h2>

            <div className="mt-[40px] space-y-6">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqs.has(index);
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[14px] border border-[var(--white-600)] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-['Nunito'] text-[18px] font-bold text-[var(--text-grey-5)]">
                        {faq.question}
                      </span>
                      <span className="text-[28px] leading-none text-[var(--text-grey-5)]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="border-t border-[var(--line-secondary)] p-5 pr-6">
                        <p className="font-['Nunito'] text-[18px] font-semibold leading-7 text-[var(--text-grey-3)]">
                          {faq.answer}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section
            style={feedbackStyle}
            className="h-[350px] mt-[40px] rounded-[24px] px-6 py-10 text-center sm:px-12"
          >
            <h2 className="pt-[40px] font-['Nunito'] text-[32px] font-extrabold text-[var(--text-white)] tracking-[1.5px]">
              Your Feedback Matters
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] font-['Nunito'] text-[18px] leading-7 text-[var(--text-grey-1)]">
              Your feedback helps us improve and serve the community better.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-[620px]">
                <Footer compactFeedbackOnly />
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default ContactPage;

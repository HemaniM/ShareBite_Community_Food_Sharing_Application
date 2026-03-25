import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import ContactBar from "../../components/common/ContactBar";
import HomepageNavBar from "../../components/common/NavBarHomepage";
import Footer from "../../components/common/Footer";
import Button1 from "../../components/ui/Button1";
import { CONTACT_EMAIL, sendContactEmail } from "../../utils/contactAPI";

const CONTACT_DETAILS = [
  {
    title: "Phone Number",
    value: "+91 90224 42156",
    icon: "☎",
  },
  {
    title: "Email Address",
    value: CONTACT_EMAIL,
    icon: "✉",
  },
  {
    title: "Office Address",
    value:
      "Flat 302, Shree Ganesh Apartments, Link road, Andheri west, Mumbai, Maharashtra - 400053",
    icon: "⌂",
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
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [openFaqs, setOpenFaqs] = useState(() => new Set([1]));

  const heroStyle = useMemo(
    () => ({
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12)), url('/images/log2.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [],
  );

  const feedbackStyle = useMemo(
    () => ({
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.28)), url('/images/log1.jpg')",
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
    setStatus({ type: "idle", message: "" });

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
      setStatus({
        type: "success",
        message: "Your message was sent successfully. Our team will contact you shortly.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "We could not send your message right now.",
      });
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
            <h1 className="font-['Nunito'] text-[36px] font-extrabold uppercase tracking-[2px] text-[var(--text-white)] sm:text-[54px]">
              Contact Us
            </h1>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="flex flex-col gap-8">
              <div>
                <span className="inline-flex rounded-full border border-[var(--border-orange)] px-5 py-2 font-['Nunito'] text-[12px] font-bold uppercase tracking-[1px] text-[var(--text-orange)]">
                  Contact Us
                </span>
                <h2 className="mt-5 max-w-[320px] font-['Nunito'] text-[36px] font-extrabold uppercase leading-[1.2] text-[var(--text-primary)]">
                  We&apos;d love to hear from you!
                </h2>
                <p className="mt-4 max-w-[430px] font-['Nunito'] text-[16px] leading-7 text-[var(--text-gray-medium)]">
                  Have a question, suggestion, or need assistance? Our team is here to help. Reach out to us and we&apos;ll get back to you.
                </p>
              </div>

              <div className="space-y-4 rounded-[20px] border border-[var(--line-secondary)] bg-[var(--bg-main)] p-6 shadow-[0_12px_24px_rgba(0,0,0,0.04)]">
                {CONTACT_DETAILS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 border-b border-[var(--line-secondary)] pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary-green-50)] text-[20px] text-[var(--primary-green)]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-['Nunito'] text-[16px] font-bold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 max-w-[280px] whitespace-pre-line font-['Nunito'] text-[15px] leading-6 text-[var(--text-gray-medium)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-[var(--bg-secondary)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:p-8">
              <h2 className="font-['Nunito'] text-[34px] font-extrabold text-[var(--text-primary)]">
                Get In Touch
              </h2>
              <p className="mt-3 max-w-[480px] font-['Nunito'] text-[15px] leading-7 text-[var(--text-gray-medium)]">
                Please fill out the form below and our team will get back to you shortly.
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

                {status.message ? (
                  <p
                    className={`font-['Nunito'] text-[14px] font-semibold ${
                      status.type === "success"
                        ? "text-[var(--primary-green)]"
                        : "text-red-500"
                    }`}
                  >
                    {status.message}
                  </p>
                ) : null}

                <Button1
                  type="submit"
                  disabled={submitting}
                  variant="filled"
                  color="orange"
                  size="md"
                  className="min-w-[180px] rounded-[12px] px-7 py-3 text-[13px] uppercase tracking-[1px] disabled:opacity-70"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button1>
              </form>
            </div>
          </section>

          <section>
            <h2 className="font-['Nunito'] text-[34px] font-extrabold uppercase text-[var(--text-primary)]">
              Need immediate help?
            </h2>

            <div className="mt-8 space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqs.has(index);
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[14px] border border-[var(--line-secondary)] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-['Nunito'] text-[18px] font-bold text-[var(--text-primary)]">
                        {faq.question}
                      </span>
                      <span className="text-[28px] leading-none text-[var(--text-primary)]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="border-t border-[var(--line-secondary)] px-5 py-4">
                        <p className="font-['Nunito'] text-[15px] leading-7 text-[var(--text-gray-medium)]">
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
            className="rounded-[24px] px-6 py-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:px-12"
          >
            <h2 className="font-['Nunito'] text-[32px] font-extrabold text-[var(--text-white)]">
              Your Feedback Matters
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] font-['Nunito'] text-[15px] leading-7 text-[rgba(255,255,255,0.9)]">
              Your feedback helps us improve and serve the community better.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[520px]">
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
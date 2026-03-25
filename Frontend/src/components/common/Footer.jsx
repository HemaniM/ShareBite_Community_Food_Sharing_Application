import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button1 from "../ui/Button1";
import EditText from "../ui/EditText";
import { twMerge } from "tailwind-merge";
import { Icon } from "../Icons/Icons";
import { CONTACT_EMAIL, sendContactEmail } from "../../utils/contactAPI";



const navigationLinks = [
  { label: "Home", path: "/home" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Donation", path: "/donation" },
];

const quickLinks = [
  { label: "Profile", path: "/profile" },
  { label: "Requests", path: "/profile/requests" },
  { label: "Food Posts", path: "/profile/food-posts" },
  { label: "Most trusted sources", path: "/products?sourceSection=from_most_trusted_donors&category=&location=&budget=" },
  { label: "Food near you", path: "/products?sourceSection=food_near_you&category=&location=&budget=" },
  { label: "Recently uploaded", path: "/products?sourceSection=recently_uploaded&category=&location=&budget=" },
  { label: "Search on map", path: "/home" },
];

const MessageForm = ({ compact = false }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) {
      setStatus({ type: "error", message: "Please enter a message first." });
      return;
    }

    setSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      await sendContactEmail({
        name: "ShareBite Footer Visitor",
        phone: "Not provided",
        replyTo: CONTACT_EMAIL,
        subject: "Footer message",
        message: message.trim(),
        source: "Footer Message",
      });

      setMessage("");
      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to send your message right now.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "flex flex-col gap-2 lg:gap-[10px] items-end"}>
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Message"
        className="w-full rounded-[8px] border border-transparent bg-white px-3 py-2 text-xs font-semibold leading-[17px] text-[var(--text-gray-light)] outline-none transition focus:border-[var(--border-orange)] font-['Nunito']"
      />

      <Button1
        type="submit"
        variant="filled"
        color="orange"
        size="sm"
        disabled={sending}
        className="font-medium"
      >
        {sending ? "SENDING..." : "SEND MESSAGE"}
      </Button1>

      {status.message ? (
        <p
          className={`w-full text-left font-['Nunito'] text-xs font-semibold ${
            status.type === "success"
              ? "text-[var(--primary-green)]"
              : "text-red-500"
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
};




const Footer = ({ className, compactFeedbackOnly = false, ...props }) => {

if (compactFeedbackOnly) {
    return <MessageForm compact />;
  }


  return (
    <footer
      className={twMerge(
        "w-full bg-[#f9f7f8] mt-[48px] md:mt-[72px] pt-5 pb-5 px-5",
        className,
      )}
      {...props}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[34px] justify-start items-start mt-4 lg:mt-[28px] mb-8 lg:mb-12">
          {/* Brand Section */}
          <div className="w-full lg:flex-1 mt-2">
            {/* Logo and Navigation Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-2 lg:mb-[20px]">
              {/* Brand Logo */}
              <div className="mb-4 sm:mb-0">
                <Icon name="shareBite_logo_footer" />
              </div>
            </div>

            {/* Brand Description and Navigation */}
            <div className="flex flex-col lg:flex-row justify-between items-start">
              {/* Left Content */}
              <div className="w-full lg:flex-1 mb-6 lg:mb-0">
                {/* Brand Description */}
                <div className="mb-6">
                  {/* Green Line */}
                  <div className="w-[200px] md:w-[300px] h-[1px] bg-[#a8b370] mb-2"></div>

                  {/* Description Text */}
                  <p className="text-sm font-normal leading-[19px] text-left text-[#40403e] font-['Nunito'] min-w-[376px] max-w-[400px]">
                    ShareBite helps people and restaurants share surplus food
                    with others nearby. It is an easy way to reduce food waste
                    and support your local community.
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex flex-row gap-3 lg:gap-[14px] items-center">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] hover:opacity-80 transition-opacity"
                    aria-label="Email"
                  >
                    <Icon name="mail_footer" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <Icon name="facebook_footer" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 lg:w-[32px] lg:h-[30px] rounded-[14px] bg-[#a8b370] p-2 hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Icon name="instagram_footer" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-auto lg:w-[10%]">
            <div className="flex flex-col gap-4 lg:gap-[24px] mt-2 lg:mt-[10px]">
              <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito']">
                Navigation
              </h3>

              <div className="flex flex-col gap-2 lg:gap-[10px]">
                {/* <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Home
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    About
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Contact
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Donation
                  </span>
                </div> */}

                {navigationLinks.map((item) => (
                  <Link key={item.label} to={item.path} className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                    <Icon name="right_arrow_small" />
                    <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[var(--text-grey-5)] font-['Nunito']">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto lg:w-[14%]">
            <div className="flex flex-col gap-4 lg:gap-[24px] mt-2 lg:mt-[10px]">
              <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito']">
                Quick Links
              </h3>

              <div className="flex flex-col gap-2 lg:gap-[10px]">
                {/* <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Profile
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    requests
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Food Posts
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Most trusted sources
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Food near you
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Recently uploaded
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                  <Icon name="right_arrow_small" />
                  <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[#40403e] font-['Nunito']">
                    Search on map
                  </span>
                </div> */}
                {quickLinks.map((item) => (
                  <Link key={item.label} to={item.path} className="flex items-center gap-2 lg:gap-[10px] hover:opacity-80 cursor-pointer">
                    <Icon name="right_arrow_small" />
                    <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[var(--text-grey-5)] font-['Nunito']">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-auto lg:w-[18%]">
            <div className="flex flex-col gap-4 lg:gap-[26px] mt-2">
              <h3 className="text-sm font-semibold leading-5 text-left uppercase text-black font-['Nunito']">
                Contact
              </h3>

              <div className="flex flex-col gap-3 lg:gap-[12px]">
                <span className="text-xs font-semibold leading-[17px] text-left uppercase text-[var(--text-grey-4)] font-['Nunito']">
                  +91 90224 42156
                </span>

                <span className="text-xs font-semibold leading-[17px] text-left lowercase text-[var(--text-grey-4)] font-['Nunito']">
                  {CONTACT_EMAIL}
                </span>

                <p className="text-xs font-medium leading-4 text-left text-[var(--text-grey-4)] font-['Nunito'] max-w-[200px]">
                  Flat 302, Shree Ganesh Apartments, Link road, Andheri west,
                  Mumbai, Maharashtra – 400053
                </p>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="w-full sm:w-auto lg:w-[18%]">
            {/* <div className="flex flex-col gap-2 lg:gap-[10px] items-end">
              <EditText
                placeholder="Message"
                className="w-full rounded-[5px] border-none outline-none focus:outline-none focus:ring-0 px-3 py-2 text-xs font-semibold leading-[17px] text-left capitalize text-[#8c8c8a] bg-white font-['Nunito'] focus:outline-none focus:ring-0 focus:ring-transparent"
              />

              <Button1
                variant="filled"
                color="orange"
                size="sm"
                className="font-medium"
              >
                SEND MESSAGE
              </Button1>
            </div> */}
            <MessageForm />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-4 items-center">
          {/* Divider Line */}
          <div className="w-full h-[1px] bg-[#d4d4d4]"></div>

          {/* Copyright */}
          <p className="text-xs font-semibold leading-[17px] tracking-[1px] text-center capitalize text-[var(--text-grey-3)] font-['Nunito']">
            @2026, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

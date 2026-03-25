const CONTACT_EMAIL = "kartikmaurya2005s@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export const sendContactEmail = async ({
  name,
  phone,
  subject,
  message,
  replyTo,
  source,
}) => {
  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `[ShareBite ${source}] ${subject}`,
      _template: "table",
      _captcha: "false",
      name,
      phone,
      email: replyTo,
      subject,
      message,
      source,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === "false") {
    throw new Error(data?.message || "Unable to send your message right now.");
  }

  return data;
};

export { CONTACT_EMAIL };
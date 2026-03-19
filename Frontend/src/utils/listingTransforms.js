export const slugifyProductName = (name = "") =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export const isDisplayableListing = (listing = {}) => {
  const expiresAtTime = new Date(listing.expiresAt).getTime();
  const hasFutureExpiry = Number.isFinite(expiresAtTime)
    ? expiresAtTime > Date.now()
    : false;

  return (
    listing.status === "available" &&
    hasFutureExpiry &&
    Number(listing?.stock?.quantity || 0) > 0
  );
};

export const mapListingToProduct = (listing = {}) => {
  const locationParts = [
    listing.location?.addressLineOne,
    listing.location?.addressLineTwo,
    listing.location?.city,
    listing.location?.district,
    listing.location?.state,
  ].filter(Boolean);

  return {
    id: listing._id,
    title: listing.title,
    image: listing.images?.[0] || "/images/Meals_image.jpg",
    location: [listing.location?.city, listing.location?.state]
      .filter(Boolean)
      .join(", ")
      .toUpperCase(),
    fullLocation: locationParts.join(", "),
    price: listing.price?.isFree ? 0 : listing.price?.amount || 0,
    priceColor: listing.price?.isFree ? "#7d8d2a" : "#d99338",
    status: listing.status,
    expiresAt: listing.expiresAt,
    stock: listing.stock,
    category: listing.category,
    description: listing.description,
    ingredients: listing.ingredients,
    contactInfo: listing.contactInfo,
    donorId: listing.donor,
    createdAt: listing.createdAt,
    rawListing: listing,
  };
};

const EMPTY_LOCATION_CONTEXT = {
  city: "",
  district: "",
  state: "",
  country: "",
  pincode: "",
};

const hasAnyLocationValue = (location = EMPTY_LOCATION_CONTEXT) =>
  Object.values(location).some((value) => String(value || "").trim().length > 0);

const reverseGeocode = async ({ latitude, longitude }) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
  );

  if (!response.ok) {
    throw new Error("Unable to reverse geocode current location");
  }

  const data = await response.json();
  const address = data?.address || {};

  return {
    city: address.city || address.town || address.village || "",
    district: address.county || address.state_district || "",
    state: address.state || "",
    country: address.country || "",
    pincode: address.postcode || "",
  };
};

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator?.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 5 * 60 * 1000,
    });
  });

const getLocationFromProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return EMPTY_LOCATION_CONTEXT;
  }

  try {
    const response = await fetch("http://localhost:4000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return EMPTY_LOCATION_CONTEXT;
    }

    const payload = await response.json();
    const user = payload?.user || {};

    return {
      city: user.city || "",
      district: user.district || "",
      state: user.state || "",
      country: "",
      pincode: user.pincode || "",
    };
  } catch (_error) {
    return EMPTY_LOCATION_CONTEXT;
  }
};

export const resolveUserLocationContext = async () => {
  try {
    const position = await getCurrentPosition();
    const geolocationContext = await reverseGeocode({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    if (hasAnyLocationValue(geolocationContext)) {
      return geolocationContext;
    }
  } catch (_error) {
    // Fall back to user profile location when geolocation or reverse geocoding fails.
  }

  const profileContext = await getLocationFromProfile();

  if (hasAnyLocationValue(profileContext)) {
    return profileContext;
  }

  return EMPTY_LOCATION_CONTEXT;
};
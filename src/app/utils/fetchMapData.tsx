// src/app/utils/fetchMapData.tsx
export const fetchLocationName = async (lat: number, lng: number) => {
  const cacheKey = `${lat},${lng}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const now = Date.now();
  if (now - lastRequestTime < 1000) {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 - (now - lastRequestTime))
    );
  }
  lastRequestTime = now;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
  );

  if (response.status === 429) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  const data = await response.json();
  const locationName = data.display_name.split(",")[0]; // Extract the first part of the display name
  cache.set(cacheKey, locationName);
  return locationName;
};

export const checkIfWithinPuttaparthi = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
  );
  const data = await response.json();
  return (
    data.address.village === "Puttaparthi" ||
    data.address.town === "Puttaparthi"
  );
};

const cache = new Map();
let lastRequestTime = 0;

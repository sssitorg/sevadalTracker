/*************************************************************************************************************************************** */
/*Dev contact:   7011 883 820                                                                                                            */
/*App for:       All India Sri Sathya Sai Seva Organization                                                                              */
/*App Name:      Sevadal Tracker app for Group Leaders                                                                                   */
/*Purpose:       Allow Group Leaders to track their members if they have reached the Seva Point or not w/o having to leave their duty    */
/*               and be able to verify without visiting each one of them by going to their spots                                         */
/*               This will give you their Date and Time, so you can track their regularity flawlessly                                    */
/*Creation Date: Oct 3rd 2024, Navratri 1st day                                                                                          */
/*Release Date:  November 23rd 2024, Sri Sathya Sai Baba's 99th Birthday                                                                 */
/*************************************************************************************************************************************** */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import styles from "@/app/styles/SelectLocation.module.css";
import { error } from "console";

// Fix for Leaflet's default icon paths
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const cache = new Map();
let lastRequestTime = 0;

const fetchLocationName = async (lat: number, lng: number) => {
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

const checkIfWithinPuttaparthi = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
  );
  const data = await response.json();
  return (
    data.address.village === "Puttaparthi" ||
    data.address.town === "Puttaparthi"
  );
};

const SelectLocationPage = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [locationName, setLocationName] = useState("");
  const [bgDate, setBgDate] = useState("");
  const [sevaState, setSevaState] = useState("");
  const [designation, setDesignation] = useState("Sevadal");

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [selectionLocError, setSelectionLocError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      try {
        const { name, location, locationName, bgDate, sevaState, designation } =
          JSON.parse(storedProfile);
        setName(name);
        setLocation(location ? JSON.parse(location) : null);
        setLocationName(locationName);
        setBgDate(bgDate);
        setSevaState(sevaState);
        setDesignation(designation);
      } catch (error) {
        console.error("Error parsing stored profile:", error);
      }
    }
  }, []);

  useEffect(() => {
    setSelectionLocError(locationName === "");
  }, [locationName]);

  const handleSave = () => {
    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");
    const currentTime = new Date().toLocaleString();
    profiles.push({
      userName: name, // Ensure userName is saved correctly
      locationName,
      time: currentTime,
    });
    localStorage.setItem("userProfiles", JSON.stringify(profiles));
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        name,
        location,
        locationName,
        bgDate,
        sevaState,
        designation,
      })
    );
    router.push("/pages/displayLocation");
  };

  const checkGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const isWithinPuttaparthi = await checkIfWithinPuttaparthi(
            latitude,
            longitude
          );
          if (isWithinPuttaparthi) {
            setIsLocationEnabled(true);
          } else {
            alert("You must be within Puttaparthi to select a location.");
          }
        },
        (error) => {
          alert("Geolocation is not enabled. Please enable it to proceed.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e: { latlng: LatLng }) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        fetchLocationName(lat, lng)
          .then((locationName) => setLocationName(locationName))
          .catch((error) => console.error("Error fetching address:", error));
      },
    });

    return location === null ? null : <Marker position={location}></Marker>;
  };

  useEffect(() => {
    checkGeolocation();
  }, []);

  return (
    <div className={styles.selectContainer}>
      <h1 className={styles.h1}>
        Welcome, {name}, click your Seva location on the map
      </h1>

      {isLocationEnabled ? (
        <MapContainer
          center={[14.165813, 77.809422]}
          zoom={18}
          style={{ height: "3.1in", width: "8.5in" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <LocationMarker />
        </MapContainer>
      ) : (
        <p>Please enable your location services to proceed.</p>
      )}

      <p>Selected Location: {locationName || "None"}</p>
      <button
        className={`button ${selectionLocError ? "buttonDisabled" : ""}`}
        onClick={handleSave}
        disabled={selectionLocError || !isLocationEnabled}
        style={{
          backgroundColor:
            selectionLocError || !isLocationEnabled ? "gray" : "green",
          cursor:
            selectionLocError || !isLocationEnabled ? "not-allowed" : "pointer",
        }}
      >
        Save Location
      </button>
    </div>
  );
};

export default SelectLocationPage;

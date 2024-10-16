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

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import styles from "@/app/styles/SelectLocation.module.css";
import {
  fetchLocationName,
  checkIfWithinPuttaparthi,
} from "@/app/utils/fetchMapData";
import { useAtom } from "jotai";
import {
  nameAtom,
  locationAtom,
  locationNameAtom,
  bgDateAtom,
  sevaStateAtom,
  designationAtom,
  isLocationEnabledAtom,
  userNotSelLocErrorAtom,
} from "@/app/atoms/atoms";

// Dynamically import Leaflet components to prevent SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
import { useMapEvents } from "react-leaflet";

// Ensure Leaflet icons configuration only runs client-side
if (typeof window !== "undefined") {
  import("leaflet").then((L) => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    });
  });
}

const SelectLocationPage = () => {
  const [name, setName] = useAtom(nameAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [locationName, setLocationName] = useAtom(locationNameAtom);
  const [bgDate, setBgDate] = useAtom(bgDateAtom);
  const [sevaState, setSevaState] = useAtom(sevaStateAtom);
  const [designation, setDesignation] = useAtom(designationAtom);
  const [isLocationEnabled, setIsLocationEnabled] = useAtom(
    isLocationEnabledAtom
  );
  const [userNotSelLocError, setUserNotSelLocError] = useAtom(
    userNotSelLocErrorAtom
  );

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Loading profile from localStorage...");
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        try {
          const {
            name,
            location,
            locationName,
            bgDate,
            sevaState,
            designation,
          } = JSON.parse(storedProfile);
          setName(name);
          setLocation(location ? JSON.parse(location) : null);
          setLocationName(locationName);
          setBgDate(bgDate);
          setSevaState(sevaState);
          setDesignation(designation);
          console.log("Profile loaded:", {
            name,
            location,
            locationName,
            bgDate,
            sevaState,
            designation,
          });
        } catch (parseError) {
          console.error("Error parsing stored profile:", parseError);
        }
      }
    }
  }, [
    setName,
    setLocation,
    setLocationName,
    setBgDate,
    setSevaState,
    setDesignation,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Updating userNotSelLocError based on locationName...");
      setUserNotSelLocError(locationName === "");
    }
  }, [locationName, setUserNotSelLocError]);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      console.log("Saving profile to localStorage...");
      const profiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");
      const currentTime = new Date().toLocaleString();
      profiles.push({
        userName: name,
        locationName,
        time: currentTime,
      });
      localStorage.setItem("userProfiles", JSON.stringify(profiles));
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          name,
          location: JSON.stringify(location),
          locationName,
          bgDate,
          sevaState,
          designation,
        })
      );
      console.log("Profile saved:", {
        name,
        location,
        locationName,
        currentTime,
      });
      router.push("/pages/displayLocation");
    }
  };

  useEffect(() => {
    const checkGeolocation = () => {
      if (typeof window !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            console.log("Geolocation success:", position);
            const { latitude, longitude } = position.coords;
            const isWithinPuttaparthi = await checkIfWithinPuttaparthi(
              latitude,
              longitude
            );
            if (isWithinPuttaparthi) {
              if (typeof window !== "undefined") {
                setIsLocationEnabled(true);
                console.log("is within Parthi, location enabled");
              }
            } else {
              if (typeof window !== "undefined") {
                alert("You must be within Puttaparthi to select a location.");
              }
            }
          },
          (geolocationError) => {
            if (typeof window !== "undefined") {
              alert("Geolocation is not enabled. Please enable it to proceed.");
              console.error("Geolocation error:", geolocationError);
            }
          }
        );
      } else {
        if (typeof window !== "undefined") {
          alert("Geolocation is not supported by this browser.");
        }
      }
    };

    console.log("Checking geolocation...");
    checkGeolocation();
  }, [setIsLocationEnabled]);

  const LocationMarker = () => {
    useMapEvents({
      click(e: { latlng: LatLng }) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        fetchLocationName(lat, lng)
          .then((locationName) => setLocationName(locationName))
          .catch((fetchError) =>
            console.error("Error fetching address:", fetchError)
          );
      },
    });

    return location === null ? null : <Marker position={location}></Marker>;
  };

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
        className={`button ${userNotSelLocError ? "buttonDisabled" : ""}`}
        onClick={handleSave}
        disabled={userNotSelLocError || !isLocationEnabled}
        style={{
          backgroundColor:
            userNotSelLocError || !isLocationEnabled ? "gray" : "green",
          cursor:
            userNotSelLocError || !isLocationEnabled
              ? "not-allowed"
              : "pointer",
        }}
      >
        Save Location
      </button>
    </div>
  );
};

export default SelectLocationPage;

"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/DisplayLocation.module.css";

const DisplayLocationPage = () => {
  const [profile, setProfile] = useState<{
    name: string;
    sevaState: string;
    locationName: string;
    bgDate: string;
  } | null>(null);
  const [profiles, setProfiles] = useState<
    { userName: string; locationName: string; time: string }[]
  >([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    const storedProfiles = localStorage.getItem("userProfiles");
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    }
  }, []);

  const resetDisplay = () => {
    localStorage.removeItem("userProfiles");
    setProfiles([]);
  };

  return (
    <div className={styles.displayContainer}>
      <h1 className={styles.dispHeading}>Location Details for Sevadals</h1>
      <h2 className={styles.h2}>Seva State: {profile?.sevaState || "N/A"}</h2>
      <h2 className={styles.h2}>Seva Begin Date: {profile?.bgDate || "N/A"}</h2>
      <table className={styles.dispTable}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Location Name</th>
            <th>Current Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={index}>
              <td>{profile.userName}</td>
              <td>{profile.locationName}</td>
              <td>{profile.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={resetDisplay} className={styles.button}>
        Reset Data
      </button>
    </div>
  );
};

export default DisplayLocationPage;

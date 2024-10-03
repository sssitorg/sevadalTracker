/*************************************************************************************************************************************** */
/*Author:        Namita Sai                                                                                                              */
/*App for:       All India Sri Sathya Sai Seva Organization                                                                              */
/*App Name:      Sevadal Tracker app for Group Leaders                                                                                   */
/*Purpose:       Allow Group Leaders to track their members if they have reached the Seva Point or not w/o having to leave their duty    */
/*               and be able to verify without visiting each one of them by going to their spots                                         */
/*               This will give you their Date and Time, so you can track their regularity flawlessly                                    */
/*Creation Date: Oct 3rd 2024, Navratri 1st day                                                                                          */
/*Release Date:  November 23rd 2024, Sri Sathya Sai Baba's 100th Birthday                                                                */
/*************************************************************************************************************************************** */

"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/DisplayLocation.module.css";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

  const handleHomeClick = () => {
    router.push("../");
  };

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
        <thead className={styles.thead}>
          <tr>
            <th className={styles.thCol}>User Name</th>
            <th className={styles.thCol}>Location Name</th>
            <th className={styles.thCol}>Current Date/Time</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {profiles.map((profile, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? styles.tr : styles.trAlt}
            >
              <td className={styles.td}>{profile.userName}</td>
              <td className={styles.td}>{profile.locationName}</td>
              <td className={styles.td}>{profile.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={resetDisplay} className="button">
        Reset Data
      </button>
      <div>
        <button onClick={handleHomeClick} className="button">
          <img
            src="/homeIcon.png"
            alt="Home Icon"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default DisplayLocationPage;

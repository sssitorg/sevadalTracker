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

import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/DisplayLocation.module.css";
import { useRouter } from "next/navigation";

interface Profile {
  name: string;
  sevaState: string;
  locationName: string;
  bgDate: string;
  designation: string;
}

const DisplayLocationPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<
    { userName: string; locationName: string; time: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement>(null);
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

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [profiles]);

  const handleSelectLocClick = () => {
    router.push("../pages/selectLocation");
  };

  const handleHomeClick = () => {
    router.push("../");
  };

  const resetDisplay = () => {
    localStorage.removeItem("userProfiles");
    setProfiles([]);
  };

  const isResetDisabled = () => {
    return !(
      profile?.designation === "Group Leader" ||
      profile?.designation === "State President" ||
      profile?.designation === "All India President"
    );
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.displayContainer}>
      <h1 className={styles.dispHeading}>Location Details for Sevadals</h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <h2 className={styles.h2}>
            Seva State: {profile?.sevaState || "N/A"}
          </h2>
          <h2 className={styles.h2}>
            Seva Begin Date: {profile?.bgDate || "N/A"}
          </h2>
          <input
            type="text"
            placeholder="Search by user name"
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className={styles.dispTable}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.thCol}>User Name</th>
                <th className={styles.thCol}>Location Name</th>
                <th className={styles.thCol}>Current Date/Time</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {filteredProfiles.map((profile, index) => (
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
          <div ref={bottomRef}></div>
          {!isResetDisabled() && (
            <>
              <button onClick={resetDisplay} className="button">
                Reset Data
              </button>
              <p className={styles.para}>
                Caution: Use Reset Data only once you are done with your Seva to
                prepare app for next batch.
              </p>
            </>
          )}
        </>
      )}
      <div>
        <button onClick={handleSelectLocClick} className="button">
          <img
            src="/locationIcon.jpg"
            alt="Location Icon"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
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

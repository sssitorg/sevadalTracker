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
// src/app/pages/displayLocation/page.tsx

import React, { useEffect, useRef } from "react";
import styles from "@/app/styles/DisplayLocation.module.css";
import { useRouter } from "next/navigation";
import BackToTop from "@/app/components/BackToTop";
import BackToBottom from "@/app/components/BackToBottom";
import { useAtom } from "jotai";
import {
  searchTermAtom,
  isLoadingAtom,
  profileAtom,
  profilesAtom,
} from "@/app/atoms/atoms";
import Image from "next/image";

const DisplayLocationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [profile, setProfile] = useAtom(profileAtom);
  const [profiles, setProfiles] = useAtom(profilesAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);

      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }

      const storedProfiles = localStorage.getItem("userProfiles");
      if (storedProfiles) {
        setProfiles(JSON.parse(storedProfiles));
      }

      setIsLoading(false);
    };

    fetchData();
  }, [setIsLoading, setProfile, setProfiles]);

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
    return !(profile?.designation === "State Coordinator");
  };

  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (profile.userName &&
        profile.userName.toLowerCase().includes(searchLower)) ||
      (profile.locationName &&
        profile.locationName.toLowerCase().includes(searchLower)) ||
      (profile.time && profile.time.toLowerCase().includes(searchLower))
    );
  });

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
            placeholder="Search by user name, location name, or date"
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
          <Image
            src="/locationIcon.jpg"
            alt="Location Icon"
            width={24}
            height={24}
          />
        </button>
        <button onClick={handleHomeClick} className="button">
          <Image src="/homeIcon.png" alt="Home Icon" width={24} height={24} />
        </button>
      </div>
      <BackToTop />
      <BackToBottom />
    </div>
  );
};

export default DisplayLocationPage;

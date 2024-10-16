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
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  nameAtom,
  sevaStateAtom,
  bgDateAtom,
  designationAtom,
  statesOfIndiaAtom,
  designationArrayAtom,
} from "@/app/atoms/atoms";
import styles from "@/app/styles/profile.module.css";

const ProfilePage = () => {
  const [name, setName] = useAtom(nameAtom);
  const [sevaState, setSevaState] = useAtom(sevaStateAtom);
  const [bgDate, setBgDate] = useAtom(bgDateAtom);
  const [designation, setDesignation] = useAtom(designationAtom);
  const [statesOfIndia] = useAtom(statesOfIndiaAtom);
  const [designationArray] = useAtom(designationArrayAtom);
  const [errors, setErrors] = useState({
    name: false,
    sevaState: false,
    bgDate: false,
  });

  const router = useRouter();

  const handleSaveAndContinue = () => {
    const userProfile = { name, sevaState, bgDate, designation };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    router.push("/pages/selectLocation");
  };

  const handleSaveAndClose = () => {
    router.push("../");
  };

  useEffect(() => {
    setErrors({
      name: !name,
      sevaState: !sevaState,
      bgDate: !bgDate,
    });
  }, [name, sevaState, bgDate]);

  const isFormValid = !errors.name && !errors.sevaState && !errors.bgDate;

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.heading}>Profile</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className={styles.input}
      />
      {errors.name && <p className={styles.errorMessage}>*</p>}
      <label className={styles.label}>
        <select
          value={sevaState}
          onChange={(e) => setSevaState(e.target.value)}
          className={styles.select}
        >
          <option value="">Select your state</option>
          {statesOfIndia.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>
      {errors.sevaState && <p className={styles.errorMessage}>*</p>}
      <input
        type="date"
        value={bgDate}
        onChange={(e) => setBgDate(e.target.value)}
        placeholder="Enter your begin date"
        className={styles.input}
      />
      {errors.bgDate && <p className={styles.errorMessage}>*</p>}

      <label className={styles.label}>
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className={styles.select}
        >
          <option value="Sevadal">Sevadal</option>
          {designationArray.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleSaveAndContinue}
        className={`${styles.button} ${
          !isFormValid ? styles.buttonDisabled : ""
        }`}
        disabled={!isFormValid}
      >
        Save and Continue
      </button>
      <button onClick={handleSaveAndClose} className={styles.button}>
        Save and Close
      </button>
    </div>
  );
};

export default ProfilePage;

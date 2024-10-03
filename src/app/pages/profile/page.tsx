"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/profile.module.css";

const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [sevaState, setSevaState] = useState("");
  const [bgDate, setBgDate] = useState(""); // Seva Begin date
  const [errors, setErrors] = useState({
    name: false,
    sevaState: false,
    bgDate: false,
  });

  const router = useRouter();

  const handleSaveAndContinue = () => {
    const userProfile = { name, sevaState, bgDate };
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

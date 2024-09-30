"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "@/app/styles/profile.module.css"; // Using the alias

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
  const [bgDate, setBgDate] = useState(""); // Begin date

  const router = useRouter();

  const handleSaveAndContinue = () => {
    const userProfile = { name, sevaState, bgDate };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    router.push("/pages/selectLocation");
  };

  const handleSaveAndClose = () => {
    router.push("../");
  };

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
      <br />
      <label className={styles.label}>
        <select
          value={sevaState}
          onChange={(e) => setSevaState(e.target.value)}
          className={`${styles.select} ${
            sevaState ? "text-[#333333]" : "text-gray-500"
          }`}
        >
          <option value="">Select your state</option>
          {statesOfIndia.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>
      <br />
      <input
        type="date"
        value={bgDate}
        onChange={(e) => setBgDate(e.target.value)}
        placeholder="Enter your begin date"
        className={styles.input}
      />
      <button onClick={handleSaveAndContinue} className={styles.button}>
        Save and Continue
      </button>

      <button onClick={handleSaveAndClose} className={styles.button}>
        Save and Close
      </button>
    </div>
  );
};

export default ProfilePage;

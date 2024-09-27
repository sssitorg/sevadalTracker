"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
    <div>
      <h1>Profile</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <br />
      <label>
        SevaState:
        <select
          value={sevaState}
          onChange={(e) => setSevaState(e.target.value)}
        >
          <option value="">Select a state</option>
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
      />
      <button onClick={handleSaveAndContinue}>Save and Continue</button>
      <br />
      <button onClick={handleSaveAndClose}>Save and Close</button>
    </div>
  );
};

export default ProfilePage;

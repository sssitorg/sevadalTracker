// src/app/atoms/profileAtoms.ts
import { atom } from 'jotai';

export const nameAtom = atom<string>('');
export const sevaStateAtom = atom<string>('');
export const bgDateAtom = atom<string>('');
export const designationAtom = atom<string>('Sevadal');
export const statesOfIndiaAtom = atom<string[]>([
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Jammu and Kashmir",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]);
export const designationArrayAtom = atom<string[]>(["Group Leader", "State Coordinator"]);

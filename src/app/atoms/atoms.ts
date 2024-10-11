// src/app/atoms/atoms.ts
import { atom } from 'jotai';

// Profile-related Atoms
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

// Display Location-related Atoms
export const searchTermAtom = atom<string>('');
export const isLoadingAtom = atom<boolean>(true);
export const profileAtom = atom<Profile | null>(null);
export const profilesAtom = atom<{ userName: string; locationName: string; time: string }[]>([]);

// Select Location-related Atoms
export const locationAtom = atom<{ lat: number; lng: number } | null>(null);
export const locationNameAtom = atom<string>('');
export const isLocationEnabledAtom = atom<boolean>(false);
export const selectionLocErrorAtom = atom<boolean>(false);

interface Profile {
  name: string;
  sevaState: string;
  locationName: string;
  bgDate: string;
  designation: string;
}

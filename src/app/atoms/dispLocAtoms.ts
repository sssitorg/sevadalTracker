// src/app/atoms/dispLocAtoms.ts
import { atom } from 'jotai';

export const searchTermAtom = atom<string>('');
export const isLoadingAtom = atom<boolean>(true);
export const profileAtom = atom<Profile | null>(null);
export const profilesAtom = atom<{ userName: string; locationName: string; time: string }[]>([]);

interface Profile {
  name: string;
  sevaState: string;
  locationName: string;
  bgDate: string;
  designation: string;
}

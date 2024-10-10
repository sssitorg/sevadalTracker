// src/app/atoms/selectLocAtoms.ts
import { atom } from 'jotai';

export const nameAtom = atom<string>('');
export const locationAtom = atom<{ lat: number; lng: number } | null>(null);
export const locationNameAtom = atom<string>('');
export const bgDateAtom = atom<string>('');
export const sevaStateAtom = atom<string>('');
export const designationAtom = atom<string>('Sevadal');
export const isLocationEnabledAtom = atom<boolean>(false);
export const selectionLocErrorAtom = atom<boolean>(false);

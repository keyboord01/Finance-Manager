import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmmountFromMiliunits(ammount: number) {
  return ammount / 1000;
}

export function convertAmmountToMiliunits(ammount: number) {
  return ammount * 1000;
}

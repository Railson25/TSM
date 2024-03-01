import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDurationGame = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const formattedHours = hours.toString();
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours} :${formattedMinutes}.${formattedSeconds}`;
};

export const toMinutes = (value: number): number => {
  const minutes = Math.floor(value / 100);
  const seconds = value % 100;
  const totalMinutes = minutes + seconds / 60;
  return Math.floor(totalMinutes);
};

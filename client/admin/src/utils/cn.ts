// clsx
import { clsx, type ClassValue } from "clsx";

// tailwind merge
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

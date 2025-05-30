import { getRandomValues } from "crypto";

export const nanoid = (t = 21): string =>
  getRandomValues(new Uint8Array(t)).reduce((t, e) => (t += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e > 62 ? "-" : "_"), "");

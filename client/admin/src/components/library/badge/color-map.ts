import type { ColorMapsProps } from "@/types";

export const colorMaps: ColorMapsProps = {
  success: {
    filled: {
      bg: "bg-emerald-100 dark:bg-emerald-700",
      text: "text-emerald-700 dark:text-emerald-100",
    },
    outlined: {
      border: "border border-emerald-500",
      text: "text-emerald-700 dark:text-emerald-100",
    },
  },
  warning: {
    filled: {
      bg: "bg-amber-100 dark:bg-amber-700",
      text: "text-amber-700 dark:text-amber-100",
    },
    outlined: {
      border: "border border-amber-500",
      text: "text-amber-700 dark:text-amber-100",
    },
  },
  error: {
    filled: {
      bg: "bg-red-100 dark:bg-red-700",
      text: "text-red-700 dark:text-red-100",
    },
    outlined: {
      border: "border border-red-500",
      text: "text-red-700 dark:text-red-100",
    },
  },
  info: {
    filled: {
      bg: "bg-blue-100 dark:bg-blue-700",
      text: "text-blue-700 dark:text-blue-100",
    },
    outlined: {
      border: "border border-blue-500",
      text: "text-blue-700 dark:text-blue-100",
    },
  },
  iconSize: "-ms-1 me-1.5 size-4",
};

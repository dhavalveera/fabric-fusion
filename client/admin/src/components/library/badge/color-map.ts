import type { ColorMapsProps } from "@/types";

export const colorMaps: ColorMapsProps = {
  success: {
    filled: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    outlined: {
      border: "border border-emerald-500",
      text: "text-emerald-700",
    },
  },
  warning: {
    filled: {
      bg: "bg-amber-100",
      text: "text-amber-700",
    },
    outlined: {
      border: "border border-amber-500",
      text: "text-amber-700",
    },
  },
  error: {
    filled: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
    outlined: {
      border: "border border-red-500",
      text: "text-red-700",
    },
  },
  iconSize: "-ms-1 me-1.5 size-4",
};

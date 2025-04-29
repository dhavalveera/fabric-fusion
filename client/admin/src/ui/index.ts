// types
import { BtnSizeVariantProps } from "@/types";

export const THEME_TOGGLE_CLASSES = "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

export const btnSizeVariant: BtnSizeVariantProps = {
  sm: "text-sm px-3 py-1",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

export const MainParentLayout = "mx-auto max-w-screen-xl px-4 py-3 md:px-8";

export const TwoColumnGrid = "mx-auto grid gap-4 max-md:max-w-lg md:grid-cols-2 lg:grid-cols-2";

export const ThreeColumnGrid = "mx-auto grid gap-4 max-md:max-w-lg md:grid-cols-2 lg:grid-cols-3";

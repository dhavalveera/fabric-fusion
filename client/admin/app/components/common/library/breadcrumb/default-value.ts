import type { BreadcrumbsStyleTypes } from "./breadcrumb-types";

export const breadcrumbsDefaultValue: BreadcrumbsStyleTypes = {
  defaultProps: {
    fullWidth: false,
    separator: "/",
  },
  styles: {
    base: {
      root: {
        initial: {
          width: "w-max",
        },
        fullWidth: { display: "block", width: "w-full" },
      },
      list: {
        display: "flex",
        flexWrap: "flex-wrap",
        alignItems: "items-center",
        width: "w-full",
        bg: "bg-gray-200",
        bgOpacity: "bg-opacity-60",
        py: "py-2",
        px: "px-4",
        borderRadius: "rounded-md",
      },
      item: {
        initial: {
          display: "flex",
          alignItems: "items-center",
          color: "text-gray-900",
          fontSmoothing: "antialiased",
          fontFamily: "font-primaryFont",
          fontSize: "text-sm",
          fontWeight: "font-normal",
          lineHeight: "leading-normal",
          cursor: "cursor-pointer",
          transition: "transition-colors duration-300",
          hover: "hover:text-[rgb(3,169,244)]",
        },
        disabled: {
          pointerEvents: "pointer-events-none",
        },
      },
      separator: {
        color: "text-gray-300",
        fontSize: "text-sm",
        fontSmoothing: "antialiased",
        fontFamily: "font-primaryFont",
        fontWeight: "font-normal",
        lineHeight: "leading-normal",
        px: "mx-2",
        pointerEvents: "pointer-events-none",
        userSelcet: "select-none",
      },
    },
  },
};

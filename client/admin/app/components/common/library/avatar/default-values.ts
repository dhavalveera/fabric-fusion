import type { AvatarStyleTypes } from "./types";

const avatarBorderColor: object = {
  white: {
    borderColor: "border-white",
  },
  "blue-gray": {
    borderColor: "border-blue-gray-500",
  },
  gray: {
    borderColor: "border-gray-900",
  },
  brown: {
    borderColor: "border-brown-500",
  },
  "deep-orange": {
    borderColor: "border-deep-orange-500",
  },
  orange: {
    borderColor: "border-orange-500",
  },
  amber: {
    borderColor: "border-amber-500",
  },
  yellow: {
    borderColor: "border-yellow-500",
  },
  lime: {
    borderColor: "border-lime-500",
  },
  "light-green": {
    borderColor: "border-light-green-500",
  },
  green: {
    borderColor: "border-green-500",
  },
  teal: {
    borderColor: "border-teal-500",
  },
  cyan: {
    borderColor: "border-cyan-500",
  },
  "light-blue": {
    borderColor: "border-light-blue-500",
  },
  blue: {
    borderColor: "border-blue-500",
  },
  indigo: {
    borderColor: "border-indigo-500",
  },
  "deep-purple": {
    borderColor: "border-deep-purple-500",
  },
  purple: {
    borderColor: "border-purple-500",
  },
  pink: {
    borderColor: "border-pink-500",
  },
  red: {
    borderColor: "border-red-500",
  },
};

export const avatarValues: AvatarStyleTypes = {
  defaultProps: {
    variant: "circular",
    size: "md",
    withBorder: false,
    color: "gray",
  },
  styles: {
    base: {
      initial: {
        display: "inline-block",
        position: "relative",
        objectFit: "object-cover",
        objectPosition: "object-center",
      },
      withBorder: {
        border: "border-2",
      },
    },
    sizes: {
      xs: {
        width: "w-6",
        height: "h-6",
        borderRadius: "rounded-md",
      },
      sm: {
        width: "w-9",
        height: "h-9",
        borderRadius: "rounded-md",
      },
      md: {
        width: "w-12",
        height: "h-12",
        borderRadius: "rounded-lg",
      },
      lg: {
        width: "w-[58px]",
        height: "h-[58px]",
        borderRadius: "rounded-lg",
      },
      xl: {
        width: "w-[74px]",
        height: "h-[74px]",
        borderRadius: "rounded-xl",
      },
      xxl: {
        width: "w-[110px]",
        height: "h-[110px]",
        borderRadius: "rounded-2xl",
      },
    },
    variants: {
      rounded: {
        borderRadius: "rounded-lg",
      },
      square: {
        borderRadius: "!rounded-none",
      },
      circular: {
        borderRadius: "!rounded-full",
      },
    },
    borderColor: avatarBorderColor,
  },
};

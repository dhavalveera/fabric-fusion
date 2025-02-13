export type SpinnerColorInnerProps = { color: string };

export type SpinnerColorProps = {
  white: SpinnerColorInnerProps;
  "blue-gray": SpinnerColorInnerProps;
  gray: SpinnerColorInnerProps;
  brown: SpinnerColorInnerProps;
  "deep-orange": SpinnerColorInnerProps;
  orange: SpinnerColorInnerProps;
  amber: SpinnerColorInnerProps;
  yellow: SpinnerColorInnerProps;
  lime: SpinnerColorInnerProps;
  "light-green": SpinnerColorInnerProps;
  green: SpinnerColorInnerProps;
  teal: SpinnerColorInnerProps;
  cyan: SpinnerColorInnerProps;
  "light-blue": SpinnerColorInnerProps;
  blue: SpinnerColorInnerProps;
  indigo: SpinnerColorInnerProps;
  "deep-purple": SpinnerColorInnerProps;
  purple: SpinnerColorInnerProps;
  pink: SpinnerColorInnerProps;
  red: SpinnerColorInnerProps;
};

const spinnerColor: SpinnerColorProps = {
  white: {
    color: "text-white",
  },
  "blue-gray": {
    color: "text-blue-gray-500",
  },
  gray: {
    color: "text-gray-900",
  },
  brown: {
    color: "text-brown-500",
  },
  "deep-orange": {
    color: "text-deep-orange-500",
  },
  orange: {
    color: "text-orange-500",
  },
  amber: {
    color: "text-amber-500",
  },
  yellow: {
    color: "text-yellow-500",
  },
  lime: {
    color: "text-lime-500",
  },
  "light-green": {
    color: "text-light-green-500",
  },
  green: {
    color: "text-green-500",
  },
  teal: {
    color: "text-teal-500",
  },
  cyan: {
    color: "text-cyan-500",
  },
  "light-blue": {
    color: "text-light-blue-500",
  },
  blue: {
    color: "text-blue-500",
  },
  indigo: {
    color: "text-indigo-500",
  },
  "deep-purple": {
    color: "text-deep-purple-500",
  },
  purple: {
    color: "text-purple-500",
  },
  pink: {
    color: "text-pink-500",
  },
  red: {
    color: "text-red-500",
  },
};

export default spinnerColor;

import type { FC } from "react";

// Utils
import { cn } from "@/utils/cn";

// types
import { AlertProps } from "@/types";

const alertTypes = {
  success: "bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4",
  error: "bg-red-50 border-s-4 border-red-500 p-4",
};

const iconTypes = {
  success: (
    <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800">
      <svg
        className="size-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    </span>
  ),
  error: (
    <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-red-100 bg-red-200 text-red-800">
      <svg
        className="size-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </span>
  ),
};

const Alert: FC<AlertProps> = ({ alertType, children }) => {
  return (
    <div className={cn(alertTypes[alertType])} role="alert" tabIndex={-1}>
      <div className="flex items-center">
        <div className="shrink-0">{iconTypes[alertType]}</div>
        <div className="ms-3">{children}</div>
      </div>
    </div>
  );
};

export default Alert;

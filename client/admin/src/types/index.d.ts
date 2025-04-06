import type { Dispatch, FC, SetStateAction, SVGProps } from "react";

// Framer Motion => types
import type { HTMLMotionProps } from "framer-motion";

export interface DashboardSidebarTitleProps {
  open: boolean;
}

export interface DashboardSidebarOptionProps extends HTMLMotionProps<"button"> {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  open: boolean;
  notifs?: number;
  linkHref: string;
}

export interface DashboardSidebarToggleCloseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DashboardSidebarProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export interface DashboardNavbarProps {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export type ThemeToggleOptionsType = "light" | "dark";

export interface AccountPopoverOptionProps extends HTMLMotionProps<"li"> {
  text: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface DashboardSidebarDataProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  notifs?: number;
  linkHref: string;
}

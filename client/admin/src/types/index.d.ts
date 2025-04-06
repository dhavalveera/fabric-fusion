import type { Dispatch, FC, SetStateAction, SVGProps } from "react";

// Framer Motion => types
import type { HTMLMotionProps } from "framer-motion";

// axiox
import type { InternalAxiosRequestConfig } from "axios";

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

// Authentication
export interface LoginCredentialProps {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginCredentialRespProps {
  status: number;
  token: string;
  statusCode?: number;
  message?: string;
}

export interface LoginAPIResp {
  access_token?: string;
  statusCode?: number;
  message?: string;
}

// Custom Axios config that supports `handlerEnabled`
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  handlerEnabled?: boolean;
}

export interface DecodedTokenProps {
  adminId: string;
  email: string;
  name: string;
  accountType: string;
  exp: number;
}

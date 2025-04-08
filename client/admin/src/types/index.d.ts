import type { ComponentProps, Dispatch, FC, PropsWithChildren, ReactNode, SetStateAction, SVGProps } from "react";

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

export interface VerifyOtpPayloadProps {
  email: string;
  rememberMe: boolean;
}

export interface VerifyOtpCredentialProps {
  email: string;
  role: string;
  otp: string;
  rememberMe?: boolean;
}

export interface ResendOtpCredsProps {
  email: string;
  role: string;
}

export interface LoginCredsRespProps {
  status: number;
  statusCode: number;
  message: string;
}

export interface VerifyOTPRespProps {
  status: number;
  token: string;
  statusCode?: number;
  message?: string;
}

export interface LoginAPIResp {
  statusCode: number;
  message: string;
}

export interface VerifyOtpApiResp {
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

// Library
export type BtnSizeVariant = "sm" | "md" | "lg";

export interface CustomButtonProps extends ComponentProps<"button"> {
  icon?: FC<SVGProps<SVGSVGElement>>;
  iconPlacement?: "start" | "end";
  btnLabel: ReactNode;
  btnSize: BtnSizeVariant;
}

export type BtnSizeVariantProps = Record<BtnSizeVariant, string>;

export interface InputProps extends ComponentProps<"input"> {
  label: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
}

export interface CheckboxInputProps extends ComponentProps<"input"> {
  label: string;
}

export interface AlertProps extends PropsWithChildren {
  alertType: "success" | "error";
}

export type CommonBreadcrumbProps = Omit<ComponentProps<"ul">, "children"> & {
  secondLabel: string;
};

export type BreadcrumbWithoutThirdLabel = CommonBreadcrumbProps & {
  secondLabelLinkHref?: string;
  thirdLabel?: undefined;
  thirdLabelLinkHref?: string;
};

export type BreadcrumbWithThirdLabel = CommonBreadcrumbProps & {
  secondLabelLinkHref: string; // ✅ Required when thirdLabel is present
  thirdLabel: string;
};

export type BreadcrumbProps = BreadcrumbWithoutThirdLabel | BreadcrumbWithThirdLabel;

export type BadgeType = "success" | "warning" | "error";

export type BadgeVariant = "filled" | "outlined";

export interface BadgeProps extends ComponentProps<"span"> {
  type: BadgeType;
  variant: BadgeVariant;
  label: string;
  withIcon?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
}

export interface BadgeStyleProps {
  bg?: string;
  border?: string;
  text: string;
}

export interface ColorMapsProps {
  success: Record<BadgeVariant, BadgeStyleProps>;
  warning: Record<BadgeVariant, BadgeStyleProps>;
  error: Record<BadgeVariant, BadgeStyleProps>;
  iconSize: string;
}

export interface BottomDrawerProps extends HTMLMotionProps<"div"> {
  /**
   * Boolean value true/false, to see if the Drawer is OPEN or not
   */
  openDrawer: boolean;

  /**
   * React State to store the boolean value as true or false
   */
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;

  /**
   * this will store the Number for the height of the drawer, but that will be converted to vh, like if it's 50 then it'll be 50vh.
   *
   * Default: 60vh
   */
  drawerHeight: number;
  children: ReactNode;
}

export interface CustomModalProps extends Omit<HTMLMotionProps<"div">, "children"> {
  isOpen: boolean;
  isOtpSent?: boolean;
  modalTitle: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  secondaryDivClassName?: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

export interface StarRatingProps extends Omit<ComponentProps<"div">, "onChange"> {
  maxStars?: number;
  value: number;
  onChange: (rating: number) => void;
}

export interface MFAOtpFormValuesProps {
  otp: string;
}

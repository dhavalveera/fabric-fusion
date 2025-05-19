import type { ComponentProps, Dispatch, FC, InputHTMLAttributes, PropsWithChildren, ReactElement, ReactNode, SetStateAction, SVGProps } from "react";

// Framer Motion => types
import type { HTMLMotionProps, MotionProps } from "framer-motion";

// axiox
import type { InternalAxiosRequestConfig } from "axios";

// Formik
import { FormikProps } from "formik";

// class-variance-authority
// import type { VariantProps } from "class-variance-authority";

// shadcn/ui types
import type { FileMetadata } from "@/components/library/shadcn-components/hooks/use-file-upload";

export interface NavItemProps {
  title: string;
  url: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
}

export interface DashboardSidebarDataProps {
  title: string;
  items: NavItemProps[];
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

export interface HandleApiErrorRespProps {
  status: number;
  statusCode: number;
  message: string;
}

export interface ApiErrorResponse {
  statusCode?: number;
  message: string | string[];
  error?: string;
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

export interface FileUploadProps {
  onChange: (files: File | FileMetadata | null) => void;
}

export interface RightDrawerProps extends ComponentProps<"div"> {
  openRightSidebar: boolean;
  setOpenRightSidebar: Dispatch<SetStateAction<boolean>>;
  pageTitle: string;
}

export interface QuantityInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The `value: number;` in the `QuantityInputProps` interface is defining a property called `value`
  which is expected to be a number type. This property is used to store the quantity value in a
  quantity input component. */
  value: number;

  /**
   *  The `onIncrement: () => void;` in the `QuantityInputProps` interface is defining a property called `onIncrement` which is a function that takes no arguments and returns nothing (`void`). This property is used to handle the increment action in a quantity input component. When called, it should increment the quantity value associated with the input component.
   */
  onIncrement: () => void;

  /**
   * The `onDecrement: () => void;` property in the `QuantityInputProps` interface is defining a function property called `onDecrement`. This function takes no arguments (`()`) and returns nothing (`void`).
   */
  onDecrement: () => void;

  /* The `label: string;` property in the `QuantityInputProps` interface is defining a property called `label` which is expected to be a string type. This property is used to provide a label or description for the quantity input component. It helps in identifying or describing the purpose of the quantity input field to the user. */
  label: string;
}

export interface BottomDrawerProps extends HTMLMotionProps<"div"> {
  /**
   * The `openDrawer: boolean;` property is defining a boolean variable named `openDrawer` in the `BottomDrawerProps` interface. This variable is used to track the state of whether the bottom drawer component is currently open or closed. When `openDrawer` is `true`, it indicates that the bottom drawer is open, and when it is `false`, it indicates that the bottom drawer is closed. This property helps in managing the visibility and state of the bottom drawer component within the application.
   */
  openDrawer: boolean;

  /***
   * The `setOpenDrawer: Dispatch<SetStateAction<boolean>>;` in the `BottomDrawerProps` interface is defining a property named `setOpenDrawer` which is a function used to update the state of the `openDrawer` boolean variable.
   */
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;

  /***
   * The `children: ReactNode;` property in TypeScript interfaces is used to define a property named `children` that can accept any valid React node as its value. */
  children: ReactNode;
}

export interface EditorProps {
  defaultValue: string;

  onChange: (content: string) => void;
}

export type SettingsPageChipTabValue = "privacy" | "tnc" | "about-us";

export interface SettingChipTabProps {
  label: string;
  chipTabValue: SettingsPageChipTabValue;
}

export interface ChipTabsProps extends ComponentProps<"button"> {
  /* The `label: string;` property in the `ChipTabsProps` interface is defining a property named `label` which is expected to be a string type. This property is used to provide a label or text content for the `ChipTabs` component. It helps in displaying text or a label associated with the chip tab button to provide context or information to the user about the purpose or content represented by that specific chip tab. */
  label: string;

  /* The `chipTabValue: string;` property in the `ChipTabsProps` interface is defining a property named `chipTabValue` which is expected to be a string type. This property is used to store a specific value associated with the `ChipTabs` component. It can represent a unique identifier, a key, or any other relevant value that helps in distinguishing or identifying the specific chip tab within the component. This value can be used for various purposes such as handling interactions, managing state, or providing additional context about the chip tab. */
  chipTabValue: string;

  /* The `selected: boolean;` property in the `ChipTabsProps` interface is defining a boolean variable named `selected`. This variable is used to indicate whether the chip tab button is currently selected or not. When `selected` is `true`, it signifies that the chip tab button is in a selected state, and when it is `false`, it indicates that the chip tab button is not selected. This property helps in managing the visual state and behavior of the chip tab button component based on
  its selection status. */
  selected: boolean;

  /* The `setSelected` property in the `ChipTabsProps` interface is defining a function that can be used to update the state of the `selected` property in the component that uses the `ChipTabs` component. */
  setSelected: Dispatch<SetStateAction<string>>;
}

export type RenderTabComponentProps = Record<SettingsPageChipTabValue, ReactElement>;

export interface CardProps extends ComponentProps<"div"> {
  /* The `cardTitle: string;` property in the `CardProps` interface is defining a property named `cardTitle` which is expected to be a string type. This property is used to store the title or heading content for a card component. It allows developers to provide a specific title or heading text that will be displayed on the card component to give context or information about the content within the card. The `cardTitle` property helps in customizing and structuring the visual representation of the card component by including a title that describes the content or purpose of the card. */
  cardTitle: string;

  /*** The `cardTitleWithUnderline: boolean;` property in the `CardProps` interface is defining a boolean property that determines whether the title of the card component should have an underline decoration or not. When `cardTitleWithUnderline` is `true`, it indicates that the title of the card should be displayed with an underline decoration, typically used for visual styling to emphasize the title. If `cardTitleWithUnderline` is `false`, then the title of the card will not have an underline decoration. Developers can use this property to control the visual presentation of the card title based on the design requirements of the application. */
  cardTitleWithUnderline: boolean;

  /* The `cardBody: ReactNode` property in the `CardProps` interface is defining a property named `cardBody` that expects a value of type `ReactNode`. */
  cardBody: ReactNode;
}

export interface StepsDataProps {
  id: string;
  title: string;
  description: string;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  size?: number;
  strokeWidth?: number;
}

export interface SelectDataProps {
  value: string;
  label: string;
}

export type ThemeOptions = "dark" | "light" | "system";

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeOptions;
  storageKey?: string;
}

export interface ThemeProviderState {
  theme: ThemeOptions;
  setTheme: (theme: ThemeOptions) => void;
}

export interface DescriptionListItemProps extends ComponentProps<"div"> {
  title: string;
}

export interface BentoGridBlockProps extends MotionProps {
  className?: string;
}

export interface CreateProductFormValues {
  productName: string;
  productDescription: string;
  productPrice: string;
  gstPercentage: string;
  productDisplayImage: string;
  colorOptions: Array<string>;
  fabricType: string;
  styleOfFit: string;
  tags: Array<string>;
  gender: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: Array<string>;
  productSubCategoryId: string;
  productSize: Array<{ size: string; totalStock: number }>;
  productRegionId: string;
  careInstruction: {
    washingInstructions: string;
    dryingInstructions: string;
    ironingInstructions: string;
    bleachingInstructions: string;
    dryCleaningInstructions: string;
    storageInstructions: string;
  };
  returnPolicy: {
    returnDuration: number;
    returnWindow: string;
    conditions: Array<string>;
    policyInformation: string;
  };
}

export interface CreateProductFormikProps {
  formik: FormikProps<CreateProductFormValues>;
}

// API
export interface ProductCategPayloadProps {
  productCategoryName: string;
  productCategoryImage: string;
}

export interface ProductSubCategoryPayloadProps {
  productSubCategoryName: string;
  productSubCategoryImage: string;
}

export interface CreateProductCategRespProps {
  productCategoryName: string;
  productCategoryImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  productCategoryId: string;
}

export interface ProductSubCategRespProps {
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  productSubCategoryId: string;
  productSubCategoryName: string;
  productSubCategoryImage: string;
}

export interface AllProductCategoryResp {
  rows: {
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    productCategoryId: string;
    productCategoryName: string;
    productCategoryImage: string;
  }[];
  count: number;
}

export interface AllProdSubCategoryResp {
  rows: ProductSubCategRespProps[];
  count: number;
}

export interface SingleProductCategResp {
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  productCategoryId: string;
  productCategoryName: string;
  productCategoryImage: string;
}

export interface CreateProductRegionPayload {
  regionTagName: string;
  description: string;
}

export interface ProductRegionTagResProps {
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  productRegionTagId: string;
  regionTagName: string;
  regionTagDescription: string;
}

export interface AllProdRegionResp {
  rows: ProductRegionTagResProps[];
  count: number;
}

export interface CreateProductPayloadProps {
  productDetails: {
    productName: string;
    productDescription: string;
    productPrice: string;
    brandName: string;
    gstPercentage: string;
    productDisplayImage: string;
    colorOptions: Array<string>;
    fabricType: string;
    styleOfFit: string;
    tags: Array<string>;
    gender: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: Array<string>;
  };
  productSubCategoryId: string;
  productSize: Array<{ size: string; totalStock: number }>;
  productRegionId: string;
  careInstruction?: {
    washingInstructions: string;
    dryingInstructions: string;
    ironingInstructions: string;
    bleachingInstructions: string;
    dryCleaningInstructions: string;
    storageInstructions: string;
  };
  returnPolicy?: {
    returnDuration: number;
    returnWindow: string;
    conditions: Array<string>;
    policyInformation: string;
  };
}

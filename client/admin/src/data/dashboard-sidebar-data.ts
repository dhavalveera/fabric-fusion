import type { DashboardSidebarDataProps } from "@/types";

// react icons
import { FiHome, FiShoppingCart } from "react-icons/fi";
import {
  MdCategory,
  MdInventory,
  MdOutlineRateReview,
  MdOutlineSchema,
} from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { FaRegImage } from "react-icons/fa";
import { LiaGlobeSolid } from "react-icons/lia";

// Custom SVG Icons
import { ClothSizeIcon } from "@/icons";

export const dashboardSidebarData: DashboardSidebarDataProps[] = [
  {
    title: "Dashboard",
    linkHref: "/dashboard",
    icon: FiHome,
  },

  {
    title: "Products",
    linkHref: "/dashboard/products",
    icon: MdInventory,
  },

  {
    title: "Product Size",
    linkHref: "/dashboard/product-size",
    icon: ClothSizeIcon,
  },

  {
    title: "Product Schema",
    linkHref: "/dashboard/product-schema",
    icon: MdOutlineSchema,
  },

  {
    title: "Product Region",
    linkHref: "/dashboard/product-region",
    icon: LiaGlobeSolid,
  },

  {
    title: "Orders",
    linkHref: "/dashboard/orders",
    icon: FiShoppingCart,
  },

  {
    title: "Category",
    linkHref: "/dashboard/category",
    icon: MdCategory,
  },

  {
    title: "Coupons",
    linkHref: "/dashboard/coupons",
    icon: CiDiscount1,
  },

  {
    title: "Ads",
    linkHref: "/dashboard/ads",
    icon: FaRegImage,
  },

  {
    title: "Reviews",
    linkHref: "/dashboard/reviews",
    icon: MdOutlineRateReview,
  },
];

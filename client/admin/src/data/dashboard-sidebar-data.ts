import type { DashboardSidebarDataProps } from "@/types";

// react icons
import { FiHome, FiShoppingCart } from "react-icons/fi";
import { MdCategory, MdInventory, MdOutlineRateReview, MdOutlineSchema } from "react-icons/md";
import { CiDiscount1, CiSettings } from "react-icons/ci";
import { FaRegImage } from "react-icons/fa";
import { LiaGlobeSolid } from "react-icons/lia";

// Custom SVG Icons
import { ClothSizeIcon } from "@/icons";

export const dashboardSidebarData: DashboardSidebarDataProps[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: FiHome,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Products",
        url: "/dashboard/products",
        icon: MdInventory,
      },
      {
        title: "Product Size",
        url: "/dashboard/product-size",
        icon: ClothSizeIcon,
      },
      {
        title: "Product Schema",
        url: "/dashboard/product-schema",
        icon: MdOutlineSchema,
      },
      {
        title: "Product Region",
        url: "/dashboard/product-region",
        icon: LiaGlobeSolid,
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
        icon: FiShoppingCart,
      },
      {
        title: "Category",
        url: "/dashboard/category",
        icon: MdCategory,
      },
      {
        title: "Coupons",
        url: "/dashboard/coupons",
        icon: CiDiscount1,
      },
      {
        title: "Ads",
        url: "/dashboard/ads",
        icon: FaRegImage,
      },
      {
        title: "Reviews",
        url: "/dashboard/reviews",
        icon: MdOutlineRateReview,
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: CiSettings,
      },
    ],
  },
];

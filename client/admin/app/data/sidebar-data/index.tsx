import type { ReactNode } from "react";

// Heroicons
import { CogIcon, HomeIcon, MapPinIcon, PercentBadgeIcon, PhotoIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

// Custom Icons
import CategoryIcon from "~/icons/category";
import InventoryIcon from "~/icons/inventory";
import ProductReviewIcon from "~/icons/product-review";

interface SubMenuProps {
  icon: ReactNode;
  label: string;
  linkHref: string;
}

interface SidebarItemsProps {
  icon: ReactNode;
  label: string;
  linkHref?: string;
  subMenu?: SubMenuProps[];
}

export const sideBarItemsData: SidebarItemsProps[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
    linkHref: "/dashboard",
  },
  {
    icon: <CogIcon />,
    label: "Settings",
    linkHref: "/dashboard/settings",
  },
  {
    icon: <ShoppingBagIcon />,
    label: "Orders",
    linkHref: "/dashboard/orders",
  },

  {
    icon: <InventoryIcon />,
    label: "Products",
    subMenu: [
      {
        icon: <InventoryIcon />,
        label: "Products",
        linkHref: "/dashboard/products",
      },
      {
        icon: <InventoryIcon />,
        label: "Product Size",
        linkHref: "/dashboard/product-size",
      },
      {
        icon: <MapPinIcon />,
        label: "Regional Tags",
        linkHref: "/dashboard/product-regional-tags",
      },
      {
        icon: <ProductReviewIcon />,
        label: "Product Reviews",
        linkHref: "/dashboard/product-reviews",
      },
    ],
  },
  {
    icon: <CategoryIcon />,
    label: "Product Categories",
    linkHref: "/dashboard/categories",
  },
  {
    icon: <PercentBadgeIcon />,
    label: "Coupons",
    linkHref: "/dashboard/coupons",
  },
  {
    icon: <PhotoIcon />,
    label: "Ads",
    linkHref: "/dashboard/ads",
  },
];

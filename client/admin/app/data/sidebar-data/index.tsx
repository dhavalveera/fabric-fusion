import type { FC, SVGProps } from "react";

// Heroicons
import { DocumentTextIcon, HomeIcon, MapPinIcon, PercentBadgeIcon, PhotoIcon, ShoppingBagIcon, UsersIcon } from "@heroicons/react/24/outline";

// Custom Icons
import CategoryIcon from "~/icons/category";
import InventoryIcon from "~/icons/inventory";
import ProductReviewIcon from "~/icons/product-review";

interface SubMenuProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  linkHref: string;
}

interface SidebarItemsProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  linkHref?: string;
  subMenu?: SubMenuProps[];
}

export const sideBarItemsData: SidebarItemsProps[] = [
  {
    label: "Dashboard",
    icon: HomeIcon,
    linkHref: "/dashboard",
  },
  {
    icon: ShoppingBagIcon,
    label: "Orders",
    linkHref: "/dashboard/orders",
  },
  {
    icon: InventoryIcon,
    label: "Products",
    subMenu: [
      {
        icon: InventoryIcon,
        label: "Products",
        linkHref: "/dashboard/products",
      },
      {
        icon: InventoryIcon,
        label: "Product Size",
        linkHref: "/dashboard/product-size",
      },
      {
        icon: MapPinIcon,
        label: "Regional Tags",
        linkHref: "/dashboard/product-regional-tags",
      },
      {
        icon: ProductReviewIcon,
        label: "Product Reviews",
        linkHref: "/dashboard/product-reviews",
      },
    ],
  },
  {
    icon: CategoryIcon,
    label: "Product Categories",
    linkHref: "/dashboard/categories",
  },
  {
    icon: PercentBadgeIcon,
    label: "Coupons",
    linkHref: "/dashboard/coupons",
  },
  {
    icon: DocumentTextIcon,
    label: "Invoice",
    linkHref: "/dashboard/invoices",
  },
  {
    icon: PhotoIcon,
    label: "Ads",
    linkHref: "/dashboard/ads",
  },
  {
    icon: UsersIcon,
    label: "Customers",
    linkHref: "/dashboard/customers",
  },
];

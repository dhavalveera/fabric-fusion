import { useEffect, useState, type FC, type ReactNode, type SVGProps } from "react";

// Heroicons
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// clsx
import { clsx } from "~/helpers/clsx";
import { Link, useLocation } from "react-router";

interface SidebarItemProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  linkHref?: string;
  isNested?: boolean;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
}

// We're assuming that the sub-menu items will not have further sub-menu items therefore, it cannot be expanded
interface SubMenuItemProps extends Omit<SidebarItemProps, "expanded" | "subMenu"> {
  expanded?: never;
  subMenu?: never;
}

// This component is used to render the sub-menu items when hovered
const HoveredSubMenuItem: FC<SubMenuItemProps> = ({ icon: Icon, label, linkHref }) => {
  const { pathname } = useLocation();

  return (
    <Link to={linkHref as string}>
      <div className={clsx(["my-2 rounded-md p-2", linkHref === pathname ? "bg-gray-300" : "hover:bg-indigo-50"])}>
        <div className="flex items-center justify-center">
          <span className="h-6 w-6 text-primaryColor">
            <Icon className={clsx(["text-black dark:text-white", pathname === linkHref ? "stroke-primaryColor" : "stroke-black dark:stroke-white"])} />
          </span>
          <span className="ml-3 w-28 text-start text-primaryColor">{label}</span>
          <div className="h-1 bg-slate-200" />
        </div>
      </div>
    </Link>
  );
};

export const SidebarItem: FC<SidebarItemProps> = ({ icon: Icon, label, linkHref, expanded = false, subMenu = null }) => {
  const [expandSubMenu, setExpandSubMenu] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!expanded) setExpandSubMenu(false);
  }, [expanded]);

  // Calculate the height of the sub-menu assuming each item is 40px tall
  const subMenuHeight = expandSubMenu ? `${((subMenu?.length || 0) * 40 + (subMenu! && 15)).toString()}px` : 0;

  return (
    <>
      <li>
        <button
          className={clsx([
            "group relative m-1 flex w-full cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors",
            pathname === linkHref && !subMenu ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-primaryColor" : "text-gray-600 hover:bg-indigo-200",
            !expanded ? "flex items-center justify-center" : "",
          ])}
          type="button"
          onClick={() => setExpandSubMenu(prevValue => expanded && !prevValue)}
        >
          {/* Icon wrapped in Link when sidebar is collapsed */}
          {linkHref ? (
            <Link to={linkHref} className="flex h-6 w-6 items-center justify-center">
              <span className="h-6 w-6">
                <Icon className={clsx(["stroke-black text-black dark:text-white", pathname === linkHref ? "stroke-primaryColor" : "stroke-black dark:stroke-white"])} />
              </span>
            </Link>
          ) : (
            <span className="h-6 w-6">
              <Icon className="stroke-black text-black dark:text-white" />
            </span>
          )}

          <span className={clsx(["overflow-hidden text-start transition-all", expanded ? "ml-3 w-44" : "w-0", pathname === linkHref ? "text-primaryColor" : "text-black dark:text-white"])}>
            {linkHref ? <Link to={linkHref}>{label}</Link> : label}
          </span>

          {subMenu ? (
            <div className={clsx(["absolute right-2 flex h-4 w-4 transition-all", expanded ? "top-1/3" : "hidden", expandSubMenu ? "rotate-90" : "rotate-0"])}>
              <ChevronRightIcon />
            </div>
          ) : null}

          {!expanded ? (
            <div
              className={clsx([
                "invisible absolute left-full z-auto ml-6 -translate-y-3 rounded-md bg-indigo-100 px-2 py-1 text-sm text-primaryColor opacity-20 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
              ])}
            >
              {!subMenu ? label : subMenu && Array.isArray(subMenu) && subMenu?.map((item, index) => <HoveredSubMenuItem key={index} label={item.label} icon={item.icon} linkHref={item.linkHref} />)}
            </div>
          ) : null}
        </button>
      </li>

      <ul className="sub-menu pl-6" style={{ height: subMenuHeight }}>
        {expanded && subMenu?.map((item, index) => <SidebarItem key={index} {...item} expanded={expanded} />)}
      </ul>
    </>
  );
};

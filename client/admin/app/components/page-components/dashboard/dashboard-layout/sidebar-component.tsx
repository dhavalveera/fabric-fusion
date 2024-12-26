import { useState, type Dispatch, type FC, type PropsWithChildren, type ReactNode, type SetStateAction } from "react";

// React Router
import { Link } from "react-router";

// Heroicons
import { Bars3Icon, EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";

// clsx
import { clsx } from "~/helpers/clsx";

// Data
import { sideBarItemsData } from "~/data/sidebar-data";

// Sidebar Item
import { SidebarItem } from "./sidebar-item";

interface SidebarComppnentProps {
  children: ReactNode;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

// This sidebar component is for both mobile and desktop
const SidebarComponent: FC<SidebarComppnentProps> = ({ children, expanded, setExpanded }) => {
  return (
    <div className="relative">
      <div className={clsx(["fixed inset-0 z-10 transition-all", expanded ? "block bg-gray-400" : "block", "sm:block sm:bg-transparent"])}>
        <aside className={clsx(["box-border h-screen transition-all duration-1000", expanded ? "w-5/6 sm:w-64" : "w-20"])}>
          <nav className="flex h-full flex-col border-r bg-white shadow-sm">
            <div className="mb-6 flex items-center justify-between p-4 pb-2">
              <Link to="/dashboard" role="link">
                <img
                  src="/logos/Fabric_Fusion_Logo_SVG.svg"
                  srcSet="/logos/Fabric_Fusion_Logo_SVG.svg"
                  alt="Fabric Fusion Admin"
                  title="Fabric Fusion Admin"
                  className={clsx(["overflow-hidden transition-all", expanded ? "w-32" : "w-0"])}
                />
              </Link>

              <div className={clsx([expanded ? "" : "block"])}>
                <button type="button" onClick={() => setExpanded(prevValue => !prevValue)} className="rounded-lg bg-gray-100 p-1.5">
                  {expanded ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <ul className={clsx(["sidebar-ul flex-1 px-3", expanded ? "overflow-y-auto" : ""])}>{children}</ul>

            <div className="flex border-t p-3">
              <div className={clsx([expanded ? "" : "grid w-full place-items-center"])}>
                <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo" alt="" className="h-10 w-10 rounded-md" />
              </div>

              <div className={clsx(["flex items-center justify-between overflow-hidden transition-all", expanded ? "ml-3 w-52" : "w-0"])}>
                <div className="leading-4">
                  <h4 className="font-semibold">Mark Ruffalo</h4>

                  <span className="text-xs text-gray-600">mark@gmail.com</span>
                </div>
                <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
};

const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  // Desktop Sidebar
  return (
    <div className="flex max-w-full flex-auto pl-28 pt-4 lg:pl-72">
      <div className="flex w-full flex-auto flex-col">{children}</div>

      <SidebarComponent expanded={expanded} setExpanded={setExpanded}>
        {sideBarItemsData.map((item, index) => (
          <SidebarItem key={index} expanded={expanded} {...item} />
        ))}
      </SidebarComponent>
    </div>
  );
};

export default Sidebar;

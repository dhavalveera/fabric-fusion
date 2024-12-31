import { useEffect, useRef, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";

// React Router
import { Link } from "react-router";

// Heroicons
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// clsx
import { clsx } from "~/helpers/clsx";

// Data
import { sideBarItemsData } from "~/data/sidebar-data";

// Child Components
import { SidebarItem } from "./sidebar-item";
import { AdminProfile } from "./admin-profile";

interface SidebarComppnentProps {
  children: ReactNode;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

interface SidebarProps {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

// This sidebar component is for both mobile and desktop
const SidebarComponent: FC<SidebarComppnentProps> = ({ children, expanded, setExpanded }) => {
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updatedSidebar = () => {
      if (sidebarRef.current) {
        const sidebarWidth = sidebarRef.current.offsetWidth;

        document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidth}px`);
      }
    };

    // Add event listener for transitioned
    const sidebarElement = sidebarRef.current;
    sidebarElement?.addEventListener("transitionend", updatedSidebar);

    // cleanup
    return () => {
      sidebarElement?.removeEventListener("transitionend", updatedSidebar);
    };
  }, [expanded]);

  return (
    <div className="relative">
      <div className={clsx(["fixed inset-0 z-50 transition-all", expanded ? "block bg-gray-400" : "block", "sm:block sm:bg-transparent"])}>
        <aside ref={sidebarRef} className={clsx(["box-border h-screen transition-all duration-1000", expanded ? "w-5/6 sm:w-64" : "w-20"])}>
          <nav className="flex h-full flex-col border-r bg-white shadow-sm dark:bg-black">
            <div className="mb-6 flex items-center justify-between p-4 pb-2">
              <Link to="/dashboard" role="link">
                <img
                  src="/logos/Fabric_Fusion_Logo_SVG.svg"
                  srcSet="/logos/Fabric_Fusion_Logo_SVG.svg"
                  alt="Fabric Fusion Admin"
                  title="Fabric Fusion Admin"
                  className={clsx(["overflow-hidden transition-all duration-[1300ms]", expanded ? "w-32" : "w-0"])}
                />
              </Link>

              <div className={clsx([expanded ? "" : "block"])}>
                <button type="button" onClick={() => setExpanded(prevValue => !prevValue)} className="rounded-lg bg-gray-100 p-1.5">
                  {expanded ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <ul className={clsx(["sidebar-ul flex-1 px-3", expanded ? "overflow-y-auto" : ""])}>{children}</ul>

            <AdminProfile expanded={expanded} adminName="Mark Ruffalo" adminEmail="mark@gmail.com" />
          </nav>
        </aside>
      </div>
    </div>
  );
};

const Sidebar: FC<SidebarProps> = ({ expanded, setExpanded }) => {
  // Desktop Sidebar
  return (
    <SidebarComponent expanded={expanded} setExpanded={setExpanded}>
      {sideBarItemsData.map((item, index) => (
        <SidebarItem key={index} expanded={expanded} {...item} />
      ))}
    </SidebarComponent>
  );
};

export default Sidebar;

import { useState, type FC, type PropsWithChildren } from "react";

// Sidebar
import Sidebar from "./sidebar-component";

// Navbar
import { DashboardNavbar } from "./dashboard-navbar";
import { clsx } from "~/helpers/clsx";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="relative flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar expanded={expanded} setExpanded={setExpanded} />

        {/* Main Content */}
        <div
          className={clsx([
            "relative flex w-full flex-col transition-all",
            expanded ? "pl-[85%] sm:pl-72" : "pl-20", // Adjust padding based on Sidebar state
          ])}
        >
          {/* Navbar */}
          <DashboardNavbar expanded={expanded} />

          {/* Main Body */}
          <main className="flex-1 overflow-auto pt-20">
            <div className="relative z-50 pl-5 pt-4">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

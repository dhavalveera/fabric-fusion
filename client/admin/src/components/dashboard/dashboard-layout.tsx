import { useState, type FC, type PropsWithChildren } from "react";

// Sidebar + Navbar
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar --- Fixed Width, full Height */}
      <DashboardSidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      {/* Ridght Section: Navbar + entire HTML Element */}
      <div className="flex flex-col flex-1">
        {/* Navbar at the Top */}
        <DashboardNavbar setOpenSidebar={setOpenSidebar} />

        {/* Main content below Navbar */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

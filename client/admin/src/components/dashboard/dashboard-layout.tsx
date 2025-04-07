import { useState, type FC } from "react";

// react router
import { Outlet } from "react-router";

// Sidebar + Navbar
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";

const DashboardLayout: FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar --- Fixed Width, full Height */}
      <DashboardSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      {/* Ridght Section: Navbar + entire HTML Element */}
      <div className="flex flex-1 flex-col">
        {/* Navbar at the Top */}
        <DashboardNavbar setOpenSidebar={setOpenSidebar} />

        {/* Main content below Navbar */}
        <main className="ml-4 flex-1 overflow-auto p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

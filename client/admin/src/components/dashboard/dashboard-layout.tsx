import { useState, type FC } from "react";

// react router
import { Outlet } from "react-router";

// Sidebar + Navbar
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";

const DashboardLayout: FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  return (
    <div className="w-full min-w-0 flex-auto">
      <div className="relative">
        {/* Navbar at the Top */}
        <DashboardNavbar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />

        <div className="mx-auto w-full lg:flex">
          {/* Sidebar --- Fixed Width, full Height */}
          <DashboardSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

          <div className="w-full min-w-0 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import type { FC } from "react";

// react router
import { Outlet } from "react-router";

// shadcn/ui component
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../library/shadcn-components/ui/sidebar";

// Sidebar + Navbar + Theme Toggler
import DashboardSidebar from "./dashboard-sidebar";
import ThemeModeToggle from "./theme-mode-toggle";
import UserDropdown from "./user-dropdown";

const DashboardLayout: FC = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="ms-2" />
          </div>
          <div className="ml-auto flex gap-5">
            <ThemeModeToggle />

            <UserDropdown />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

import { useEffect, type FC } from "react";

// Framer Motion
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from "framer-motion";

// data
import { dashboardSidebarData } from "@/data/dashboard-sidebar-data";

// utils
import { cn } from "@/utils/cn";

// utils
import { DashboardSidebarProps } from "@/types";

// Sidebar Components
import DashboardSidebarTitle from "./dashboard-sidebar-title";
import DashboardSidebarOptions from "./dashboard-sidebar-options";
import DashboardSidebarToggleClose from "./dashboard-sidebar-toggle-close";

const DashboardSidebar: FC<DashboardSidebarProps> = ({
  openSidebar,
  setOpenSidebar,
}) => {
  // Auto-Close sidebar on Mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenSidebar(false); // Close on Mobile by default
      } else {
        setOpenSidebar(true); // Open on Desktop
      }
    };

    // Initial check
    handleResize();

    // Optional: Listen to screen resize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setOpenSidebar]);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {openSidebar ? (
            <motion.div
              initial="unmount"
              exit="unmount"
              animate={openSidebar ? "mount" : "unmount"}
              transition={{ duration: 0.3 }}
              variants={{
                unmount: {
                  opacity: 0,
                  transition: {
                    delay: 0.3,
                  },
                },
                mount: {
                  opacity: 1,
                },
              }}
              className="fixed inset-0 size-full z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpenSidebar(false)}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          layout
          className={cn(
            "fixed top-0 left-0 h-screen flex flex-col overflow-hidden shrink-0 border-r border-slate-300 bg-white p-2 transition-transform duration-300",
            openSidebar ? "translate-x-0 z-50" : "-translate-x-full",
            "md:static md:translate-x-0 md:z-10",
          )}
          style={{
            width: openSidebar ? "225px" : "fit-content",
          }}
        >
          <DashboardSidebarTitle open={openSidebar} />

          <div className="space-y-1 flex-1 overflow-y-auto pr-1 mt-2">
            {dashboardSidebarData.map((sidebarData, index) => {
              return (
                <DashboardSidebarOptions
                  icon={sidebarData.icon}
                  title={sidebarData.title}
                  open={openSidebar}
                  linkHref={sidebarData.linkHref}
                  key={index}
                />
              );
            })}
          </div>

          <DashboardSidebarToggleClose
            open={openSidebar}
            setOpen={setOpenSidebar}
          />
        </motion.div>
      </LazyMotion>
    </>
  );
};

export default DashboardSidebar;

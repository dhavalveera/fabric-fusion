import { useEffect, type FC } from "react";

// Framer Motion
import { AnimatePresence, domAnimation, LazyMotion, motion } from "framer-motion";

// data
import { dashboardSidebarData } from "@/data/dashboard-sidebar-data";

// utils
import { cn } from "@/utils/cn";

// utils
import { DashboardSidebarProps } from "@/types";

// Sidebar Components
import DashboardSidebarTitle from "./dashboard-sidebar-title";
import DashboardSidebarOptions from "./dashboard-sidebar-options";
// import DashboardSidebarToggleClose from "./dashboard-sidebar-toggle-close";

const DashboardSidebar: FC<DashboardSidebarProps> = ({ openSidebar, setOpenSidebar }) => {
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
              className="fixed inset-0 z-40 size-full bg-gray-900/50 backdrop-blur-sm lg:hidden dark:bg-gray-900/60"
              onClick={() => setOpenSidebar(false)}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          layout
          className={cn(
            "fixed inset-0 size-full max-w-56 overflow-hidden border-r border-slate-300 bg-white p-2 transition-transform duration-300",
            openSidebar ? "translate-x-0" : "-translate-x-full",
            "z-50 md:translate-x-0 lg:sticky lg:top-[50px] lg:block lg:h-screen",
          )}
        >
          <div className="px-1 pt-16 pb-8 pl-3 font-normal lg:pt-2 lg:pl-0">
            <DashboardSidebarTitle open={openSidebar} />

            <div className="mt-2 space-y-1 pr-1">
              {dashboardSidebarData.map((sidebarData, index) => {
                return <DashboardSidebarOptions icon={sidebarData.icon} title={sidebarData.title} open={openSidebar} linkHref={sidebarData.linkHref} setCloseSidebar={setOpenSidebar} key={index} />;
              })}
            </div>
          </div>

          {/* <DashboardSidebarToggleClose open={openSidebar} setOpen={setOpenSidebar} /> */}
        </motion.div>
      </LazyMotion>
    </>
  );
};

export default DashboardSidebar;

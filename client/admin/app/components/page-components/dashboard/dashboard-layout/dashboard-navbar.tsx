import type { FC } from "react";
import PrelineThemeToggleButton from "~/components/common/preline-dark-mode";

// Common

// Helpers
import { clsx } from "~/helpers/clsx";

export const DashboardNavbar: FC<{ expanded: boolean }> = ({ expanded }) => {
  return (
    <>
      <div
        className={clsx(["fixed right-0 top-0 z-50 h-16 w-full bg-white px-[30px] py-[15px] shadow-lg transition-all duration-300 ease-in-out dark:border-b dark:border-white dark:bg-black"])}
        style={{
          width: `calc(100% - var(--sidebar-width, 80px))`,
        }}
      >
        <div className="flex items-center">
          <div className="flex-grow" />

          <div className="ml-auto">
            <PrelineThemeToggleButton />
          </div>
        </div>
      </div>
    </>
  );
};

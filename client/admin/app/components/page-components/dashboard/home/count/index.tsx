import type { FC } from "react";

// Icons
import { PercentBadgeIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import InventoryIcon from "~/icons/inventory";

const DashboardDiffCount: FC = () => {
  return (
    <div className="mt-5">
      <div className="rounded-md p-6 shadow-md dark:bg-[#273142]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 sm:col-span-4 md:col-span-3">
            <div className="rounded-lg border p-3">
              <div className="w-fit rounded-md border border-blue-600 bg-blue-200 p-2">
                <InventoryIcon className="h-6 w-6 md:h-8 md:w-8" strokeClass="stroke-blue-700 dark:stroke-blue-700" />
              </div>

              <div className="pt-5">
                <p className="text-sm sm:text-base md:text-lg">Total Products</p>
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-4 md:col-span-3">
            <div className="rounded-lg border p-3">
              <div className="w-fit rounded-md border border-blue-600 bg-blue-200 p-2">
                <UserGroupIcon className="h-6 w-6 stroke-blue-700 dark:stroke-blue-700 md:h-8 md:w-8" />
              </div>

              <div className="pt-5">
                <p className="text-sm sm:text-base md:text-lg">Total Products</p>
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-4 md:col-span-3">
            <div className="rounded-lg border p-3">
              <div className="w-fit rounded-md border border-blue-600 bg-blue-200 p-2">
                <ShoppingBagIcon className="h-6 w-6 stroke-blue-700 dark:stroke-blue-700 md:h-8 md:w-8" />
              </div>

              <div className="pt-5">
                <p className="text-sm sm:text-base md:text-lg">Total Products</p>
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-4 md:col-span-3">
            <div className="rounded-lg border p-3">
              <div className="w-fit rounded-md border border-blue-600 bg-blue-200 p-2">
                <PercentBadgeIcon className="h-6 w-6 stroke-blue-700 dark:stroke-blue-700 md:h-8 md:w-8" />
              </div>

              <div className="pt-5">
                <p className="text-sm sm:text-base md:text-lg">Total Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDiffCount;

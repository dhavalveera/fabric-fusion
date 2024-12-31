import type { FC } from "react";

// React Router
import { Link } from "react-router";

// flowbite-react
import { Popover } from "flowbite-react";

// Heroicons
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { getInitials } from "~/utils/get-intials";

type AdminProfileProps = {
  expanded: boolean;
  adminName: string;
  adminEmail: string;
};

export const AdminProfile: FC<AdminProfileProps> = ({ adminEmail, adminName, expanded }) => {
  return (
    <div className="flex border-t p-3">
      <div className={clsx([expanded ? "" : "grid w-full place-items-center"])}>
        {expanded ? (
          <div className="grid h-10 w-10 place-items-center rounded-md bg-[#c7d2fe] font-bold text-[#3730a3]">{getInitials(adminName)}</div>
        ) : (
          <Popover
            aria-labelledby="admin-profile-popover"
            content={
              <dl className="p-3">
                <dt className="font-bold dark:text-white">
                  <Link to="/api/auth/logout" role="link">
                    Logout
                  </Link>
                </dt>
              </dl>
            }
          >
            <div className="grid h-10 w-10 cursor-pointer place-items-center rounded-md bg-[#c7d2fe] font-bold text-[#3730a3]">{getInitials(adminName)}</div>
          </Popover>
        )}
      </div>

      <div className={clsx(["flex items-center justify-between overflow-hidden transition-all", expanded ? "ml-3 w-52" : "w-0"])}>
        <div className="leading-4">
          <h4 className="font-semibold text-black dark:text-white">{adminName}</h4>

          <span className="text-xs text-black dark:text-white">{adminEmail}</span>
        </div>

        <Popover
          aria-labelledby="admin-profile-popover"
          content={
            <div className="p-3">
              <span className="font-bold text-black dark:text-white">
                <Link to="/api/auth/logout" role="link">
                  Logout
                </Link>
              </span>
            </div>
          }
        >
          <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
        </Popover>
      </div>
    </div>
  );
};

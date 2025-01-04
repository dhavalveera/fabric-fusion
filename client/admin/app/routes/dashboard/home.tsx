import { data, redirect, type LoaderFunctionArgs } from "react-router";

import { authenticate } from "~/utils/auth-guard";

import DashboardLayout from "~/components/page-components/dashboard/dashboard-layout/dashboard-layout";

// Page Components
import DashboardDiffCount from "~/components/page-components/dashboard/home/count";

import type { Route } from "./+types/home";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const user = await authenticate(request, redirect);

//   return data(user, {
//     status: 200,
//   });
// };

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard | Fabric Fusion Admin" }];
}

export default function DashboardPage() {
  const adminName = "Admin Name";

  return (
    <DashboardLayout>
      <div>
        <p className="text-3xl font-bold dark:text-white">Hello {adminName}</p>

        <DashboardDiffCount />
      </div>
    </DashboardLayout>
  );
}

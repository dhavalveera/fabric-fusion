import { data, redirect, type LoaderFunctionArgs } from "react-router";

import { authenticate } from "~/utils/auth-guard";

import Sidebar from "~/components/page-components/dashboard/dashboard-layout/sidebar-component";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const user = await authenticate(request, redirect);

//   return data(user, {
//     status: 200,
//   });
// };

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <div>
          <p>Hi</p>
        </div>
      </Sidebar>
    </div>
  );
}

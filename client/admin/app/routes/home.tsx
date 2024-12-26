import type { Route } from "./+types/home";
import { redirect, type LoaderFunctionArgs } from "react-router";

// Auth Login Form
import AuthLoginForm from "~/components/page-components/auth/login";

// Utils (Session)
import { session } from "~/utils/remix-cookies";

// UI
import { MainParentLayout } from "~/ui";

// Logo
import FabricFusionLogo from "/logos/Fabric_Fusion_Logo_SVG.svg";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Fabric Fusion Admin" }, { name: "description", content: "Fabric Fusion Admin" }];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the Cookie Value
  const token = await session.parse(request.headers.get("Cookie"));

  const returnUrl = new URL(request.url).searchParams.get(`returnUrl`);

  // Token Found
  if (token) {
    return redirect(returnUrl ?? "/dashboard");
  }
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-color">
      <div className={MainParentLayout}>
        {/* Main container with grid layout */}
        <div className="grid grid-cols-12 items-center gap-4 sm:gap-2">
          <div className="col-span-12 sm:col-span-4">
            <div className="flex justify-center sm:justify-start">
              <img src={FabricFusionLogo} alt="Fabric Fusion" title="Fabric Fusion" className="h-auto w-auto" />
            </div>
          </div>

          {/* Vertical line in the center */}
          <div className="col-span-12 sm:col-span-1">
            <div className="mx-4 hidden h-dvh border-l-2 border-white sm:block" />
          </div>

          {/* Right side (Form) */}
          <div className="col-span-12 sm:col-span-7">
            <AuthLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

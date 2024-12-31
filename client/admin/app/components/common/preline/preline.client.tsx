import { useEffect } from "react";

import { useLocation } from "react-router";

import type { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      await import("preline/preline");

      window.HSStaticMethods.autoInit();
    })();
  }, [pathname]);

  return null;
}

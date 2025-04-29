import type { NavigateFunction, NavigateOptions, To } from "react-router";

let navigate: NavigateFunction | null = null;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export const navigateTo = (path: To, options?: NavigateOptions) => {
  if (!navigate) {
    console.error("Navigate function is not initialized!");
    return;
  }

  // Define your DEFAULT options here
  const defaultOptions: Readonly<NavigateOptions> = {
    preventScrollReset: false,
    viewTransition: true,
  };

  const finalOptions: NavigateOptions = {
    ...options,
    ...defaultOptions, // 🧠 Put default options LAST, so they always win
  };

  navigate(path, finalOptions);
};

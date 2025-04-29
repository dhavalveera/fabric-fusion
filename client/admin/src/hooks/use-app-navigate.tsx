import { useNavigate, type NavigateOptions, type To } from "react-router";

export const useAppNavigate = () => {
  const navigate = useNavigate();

  const goTo = (path: To, options?: NavigateOptions) => {
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

  const goBack = () => {
    navigate(-1);
  };

  return {
    goTo,
    goBack,
    navigate, // still exposing raw navigate for advanced usage
  };
};

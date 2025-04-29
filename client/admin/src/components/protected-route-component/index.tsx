import { useEffect, type FC } from "react";

// react router
import { Outlet, useLocation } from "react-router";

// react toastify
import { toast } from "react-toastify";

// useAppService
import { navigateTo } from "@/navigation-service";

// Auth Checker
import authService from "../authentication";

const ProtectRoute: FC = () => {
  // const { pathname, search } = useLocation();

  // const isAuth = authService.isLoggedIn();

  // useEffect(() => {
  //   if (!isAuth) {
  //     toast.error("Unauthorized User");

  //     const returnUrl = pathname + search;

  //     navigateTo(`/?returnUrl=${encodeURIComponent(returnUrl)}`);
  //   }
  // }, [isAuth, pathname, search]);

  // if (!isAuth) return null;

  return <Outlet />;
};

export default ProtectRoute;

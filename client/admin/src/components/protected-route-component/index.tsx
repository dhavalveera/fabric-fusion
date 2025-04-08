import { useEffect, type FC } from "react";

// react router
import { Outlet, useLocation, useNavigate } from "react-router";

// react toastify
import { toast } from "react-toastify";

// Auth Checker
import authService from "../authentication";

const ProtectRoute: FC = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const isAuth = authService.isLoggedIn();

  useEffect(() => {
    if (!isAuth) {
      toast.error("Unauthorized User");

      const returnUrl = pathname + search;

      navigate(`/?returnUrl=${encodeURIComponent(returnUrl)}`, { preventScrollReset: false, viewTransition: true });
    }
  }, [isAuth, navigate, pathname, search]);

  if (!isAuth) return null;

  return <Outlet />;
};

export default ProtectRoute;

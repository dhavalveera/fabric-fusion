import { useEffect, type FC } from "react";

// react router
import { Outlet, useNavigate } from "react-router";

// react toastify
import { toast } from "react-toastify";

// Auth Checker
import authService from "../authentication";

const ProtectRoute: FC = () => {
  const navigate = useNavigate();

  const isAuth = authService.isLoggedIn();

  useEffect(() => {
    if (!isAuth) {
      toast.error("Unauthorized User");

      navigate("/", { preventScrollReset: false, viewTransition: true });
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  return <Outlet />;
};

export default ProtectRoute;

import { useEffect, useState, type FC } from "react";

// react router
import { Routes, Route, useNavigate } from "react-router";

// Set Navigation (centralized navigateTo() utility)
import { setNavigate } from "./navigation-service";

// Auth Checker
import authService from "./components/authentication";

// Protected Route
import ProtectRoute from "./components/protected-route-component";

// Login Component
import LoginForm from "./components/login-component";

// Dashboard Layout
import DashboardLayout from "./components/dashboard/dashboard-layout";

// Page Components
import DashboardPage from "./components/dashboard/pages/dashboard";
import ProductsPage from "./components/dashboard/pages/products";
import CreateProductPage from "./components/dashboard/pages/products/new";
import SettingsPage from "./components/dashboard/pages/settings";

const App: FC = () => {
  const [isLoggedIn] = useState<boolean>(authService.isLoggedIn() !== null);

  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/*" element={<ProtectRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/create" element={<CreateProductPage />} />
            <Route path="product-size" element={<p>Product Size Pages</p>} />
            <Route path="product-schema" element={<p>Product Schema Pages</p>} />
            <Route path="product-region" element={<p>Product Region Pages</p>} />
            <Route path="orders" element={<p>Orders Pages</p>} />
            <Route path="category" element={<p>Category Pages</p>} />
            <Route path="coupons" element={<p>Coupons Pages</p>} />
            <Route path="ads" element={<p>Ads Pages</p>} />
            <Route path="reviews" element={<p>Reviews Pages</p>} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

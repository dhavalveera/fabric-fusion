import { useState, type FC } from "react";

// react router
import { Routes, Route } from "react-router";

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

const App: FC = () => {
  const [isLoggedIn] = useState<boolean>(authService.isLoggedIn() !== null);

  return (
    <Routes>
      <Route path="/" element={<LoginForm isLoggedIn={isLoggedIn} />} />
      <Route path="/dashboard/*" element={<ProtectRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product-size" element={<p>Product Size Pages</p>} />
          <Route path="product-schema" element={<p>Product Schema Pages</p>} />
          <Route path="product-region" element={<p>Product Region Pages</p>} />
          <Route path="orders" element={<p>Orders Pages</p>} />
          <Route path="category" element={<p>Category Pages</p>} />
          <Route path="coupons" element={<p>Coupons Pages</p>} />
          <Route path="ads" element={<p>Ads Pages</p>} />
          <Route path="reviews" element={<p>Reviews Pages</p>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

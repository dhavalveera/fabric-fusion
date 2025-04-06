import { useState, type FC } from "react";

// react router
import { Routes, Route } from "react-router";

// Auth Checker
import authService from "./components/authentication";

// Protected Route
import ProtectRoute from "./components/protected-route-component";

// Login Component
import LoginForm from "./components/login-component";

const App: FC = () => {
  const [isLoggedIn] = useState<boolean>(authService.isLoggedIn() !== null);

  return (
    <Routes>
      <Route path="/" element={<LoginForm isLoggedIn={isLoggedIn} />} />
      <Route path="/dashboard/*" element={<ProtectRoute />}></Route>
    </Routes>
  );
};

export default App;

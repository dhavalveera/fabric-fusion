import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Dashboard Routes
  ...prefix("dashboard", [index("routes/dashboard/home.tsx")]),

  // API Routes
  route("/api/auth/login", "routes/api/auth/login.tsx"),
  route("/api/auth/logout", "routes/api/auth/logout.tsx"),
] satisfies RouteConfig;

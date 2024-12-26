import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Dashboard Routes
  ...prefix("dashboard", [index("routes/dashboard/home.tsx")]),

  // API Routes
  route("/api/login", "routes/api/login.tsx"),
] satisfies RouteConfig;

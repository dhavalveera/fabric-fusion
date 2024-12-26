import { createCookie } from "react-router";

export const session = createCookie("user-auth-session", {
  secrets: ["fab-fuse-secret"],
  path: "/",
  secure: true,
  sameSite: "lax",
  httpOnly: true,
});

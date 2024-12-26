import type { RedirectFunction } from "react-router";

// Utils
import { session } from "../remix-cookies";

export const authenticate = async (request: Request, redirect: RedirectFunction) => {
  const sessionDetails = await session.parse(request.headers.get("Cookie"));

  const url = new URL(request.url);

  if (!sessionDetails) {
    throw redirect(`/?returnUrl=${url.pathname}`);
  }
};

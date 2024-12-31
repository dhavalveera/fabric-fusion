import { data, type ActionFunctionArgs, redirect } from "react-router";

// Session
import { session } from "~/utils/remix-cookies";

export async function loader() {
  console.log("logout auth api loader");

  return redirect("/", {
    headers: {
      "Set-Cookie": await session.serialize("", {
        expires: new Date(0),
      }),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("logout auth api loader");

  throw data(
    { message: `Method ${request.method} Not Allowed!` },
    {
      status: 405,
    },
  );
}

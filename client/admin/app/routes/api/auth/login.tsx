import { data, type LoaderFunctionArgs, type ActionFunctionArgs, redirect } from "react-router";

// axios
import axios from "axios";

// Session
import { session } from "~/utils/remix-cookies";

type LoginData = {
  access_token?: string;
  statusCode?: number;
  message?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  throw data(
    { message: `Method ${request.method} Not Allowed!` },
    {
      status: 405,
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  /** @todo: Get the Form Data from the HTP Request Body */
  const body = await request.json();

  const { data: axiosData, status: axiosStatus } = await axios<LoginData>({
    url: "http://localhost:7080/api/auth/admin/signin",
    method: "POST",
    data: body,
    validateStatus(status) {
      return status >= 200 && status < 599;
    },
  });

  if (axiosStatus === 200) {
    const returnUrl = new URL(request.url).searchParams.get("returnUrl");

    return redirect(returnUrl ?? "/dashboard", {
      headers: {
        "Set-Cookie": await session.serialize(axiosData.access_token, { expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000) }),
      },
    });
  } else {
    throw data(
      { message: axiosData.message as string },
      {
        status: axiosStatus,
      },
    );
  }
}

// jwt-decode
import { jwtDecode } from "jwt-decode";

// axios instance
import axiosInstance from "@/api/axiosInstance";

// types
import type { DecodedTokenProps, LoginAPIResp, LoginCredentialProps, LoginCredentialRespProps } from "@/types";

const authService = {
  login: async (credentials: LoginCredentialProps): Promise<LoginCredentialRespProps> => {
    try {
      const {
        status,
        data: { access_token, message, statusCode },
      } = await axiosInstance.post<LoginAPIResp>(`/auth/admin/signin`, credentials);

      if (status === 200 && access_token) {
        localStorage.setItem("token", access_token);
      }

      return { status, token: access_token ?? "", message, statusCode };
    } catch (error) {
      console.log("🚀 -----------------------------------------🚀");
      console.log("🚀 ~ components/authentication index.tsx:15 ~ login: ~ error:", error);
      console.log("🚀 -----------------------------------------🚀");

      return { status: 401, token: "", statusCode: 401, message: "Unauthorized" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decodedToken: DecodedTokenProps = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.log("🚀 --------------------------------🚀");
      console.log("🚀 ~ components/authentication index.tsx:17 ~ error:", error);
      console.log("🚀 --------------------------------🚀");

      console.log("Token Expired");

      return true;
    }
  },

  isLoggedIn: () => {
    const token = localStorage.getItem("token");
    return token && !authService.isTokenExpired(token);
  },

  /* The `getToken` method in the `authService` object is a function that retrieves the "token" value
  from the localStorage. It returns the token value as a string if it exists in the localStorage, or
  it returns `null` if the token is not found. This method is used to get the authentication token
  stored in the browser's localStorage for further use in the application, such as making
  authenticated API requests. */
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },
};

export default authService;

// jwt-decode
import { jwtDecode } from "jwt-decode";

// axios instance
import axiosInstance from "@/api/axiosInstance";

// types
import type { DecodedTokenProps, LoginAPIResp, LoginCredentialProps, LoginCredsRespProps, ResendOtpCredsProps, VerifyOTPRespProps, VerifyOtpApiResp, VerifyOtpCredentialProps } from "@/types";

const authService = {
  login: async (credentials: LoginCredentialProps): Promise<LoginCredsRespProps> => {
    try {
      const {
        status,
        data: { message, statusCode },
      } = await axiosInstance.post<LoginAPIResp>(`/auth/admin/signin`, credentials);

      return { status, message, statusCode };
    } catch (error) {
      console.log("🚀 -----------------------------------------🚀");
      console.log("🚀 ~ components/authentication index.tsx:15 ~ login: ~ error:", error);
      console.log("🚀 -----------------------------------------🚀");

      return { status: 401, statusCode: 401, message: "Unauthorized" };
    }
  },

  verifyOtp: async (payload: VerifyOtpCredentialProps): Promise<VerifyOTPRespProps> => {
    try {
      const {
        status,
        data: { access_token, message, statusCode },
      } = await axiosInstance.post<VerifyOtpApiResp>(`/auth/verify/otp`, payload);

      if (status === 200) {
        localStorage.setItem("token", access_token as string);
      }

      return { status, token: access_token as string, message, statusCode };
    } catch (error) {
      console.log("🚀 ---------------------------------------------🚀");
      console.log("🚀 ~ index.tsx:36 ~ verifyOtp: ~ error:", error);
      console.log("🚀 ---------------------------------------------🚀");

      return { status: 401, token: "", message: "Unable to Verify OTP", statusCode: 401 };
    }
  },

  resendOtp: async (payload: ResendOtpCredsProps): Promise<LoginCredsRespProps> => {
    try {
      const {
        status,
        data: { message, statusCode },
      } = await axiosInstance.patch<LoginAPIResp>(`auth/resend/otp`, payload);

      return { message, status, statusCode };
    } catch (error) {
      console.log("🚀 ---------------------------------------------🚀");
      console.log("🚀 ~ index.tsx:53 ~ resendOtp: ~ error:", error);
      console.log("🚀 ---------------------------------------------🚀");

      return { status: 400, message: "Unable to Send OTP", statusCode: 400 };
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

  isLoggedIn: (): boolean => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    return !authService.isTokenExpired(token);
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

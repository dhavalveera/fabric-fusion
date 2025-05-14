import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// types
import { CustomAxiosRequestConfig } from "@/types";

// Auth Service
import authService from "@/components/authentication";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isHandlerEnabled = (config: CustomAxiosRequestConfig) => {
  return !Object.prototype.hasOwnProperty.call(config, "handlerEnabled") || config.handlerEnabled !== false;
};

// Request Handler
const requestHandler = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const config = request as CustomAxiosRequestConfig;

  if (isHandlerEnabled(config)) {
    const token = authService.getToken();

    // Ensure headers always exists
    config.headers = config.headers ?? {};

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
};

// Response Success Handler
const successHandler = (response: AxiosResponse): AxiosResponse => {
  if (isHandlerEnabled(response.config as CustomAxiosRequestConfig)) {
    console.info("✅ Successful request:", {
      url: response.config.url,
      method: response.config.method,
    });
  }

  return response;
};

// Response Error Handler
const errorHandler = (error: AxiosError): Promise<AxiosError> => {
  const config = error.config as CustomAxiosRequestConfig;

  if (isHandlerEnabled(config)) {
    // Optional: Add any error logging or transformations here
    console.error("❌ Axios Error:", {
      url: config.url,
      method: config.method,
      status: error.response?.status,
      data: error.response?.data,
    });
  }

  return Promise.reject(error);
};

// Attach Interceptors
axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => requestHandler(request));

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => successHandler(response),
  (error: AxiosError) => errorHandler(error),
);

export default axiosInstance;

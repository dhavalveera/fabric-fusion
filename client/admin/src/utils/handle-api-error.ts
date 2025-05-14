import { AxiosError } from "axios";

// Sonner
import { toast } from "sonner";

// types
import type { ApiErrorResponse, HandleApiErrorRespProps } from "@/types";

export const handleLoginApiError = (error: unknown): HandleApiErrorRespProps => {
  if (error instanceof AxiosError) {
    return {
      status: Number(error.status),
      statusCode: Number(error.status),
      message: error.response ? error.response.data?.message : "Unexpected error occurred.",
    };
  }

  // Fallback for network errors or unknown exceptions
  return {
    status: 401,
    statusCode: 401,
    message: error instanceof Error ? error.message : "Unknown error occurred.",
  };
};

export const handleApiError = (error: unknown, descriptionText?: string) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    const data = error.response?.data as ApiErrorResponse | undefined;

    console.log({ status, data });

    const message = typeof data?.message === "string" ? data.message : Array.isArray(data?.message) ? data.message.join(", ") : "Unknown error occurred";

    switch (status) {
      case 400:
        toast.error(message || "Bad Request", {
          description: descriptionText || "",
        });

        // ❌ Don't throw. Let the error be handled gracefully.
        return;
      case 401:
        toast.error(message || "Unauthorized", {
          description: descriptionText || "",
        });

        // ❌ Don't throw. Let the error be handled gracefully.
        return;
      case 403:
        toast.error(message || "Forbidden", {
          description: descriptionText || "",
        });

        // ❌ Don't throw. Let the error be handled gracefully.
        return;
      case 404:
        toast.error(message || "Resource not found!.", {
          description: descriptionText || "",
        });

        // ❌ Don't throw. Let the error be handled gracefully.
        return;
      case 409:
        toast.error(message || "Conflict", {
          description: descriptionText || "",
        });

        // ❌ Don't throw. Let the error be handled gracefully.
        return;
      case 500:
        toast.error(message || "Server error. Please try again later.", {
          description: descriptionText || "",
        });

        // ❌ Don't throw. Let the error be handled gracefully.
        return;
      default:
        toast.error(message || "Unexpected error.", {
          description: descriptionText || "",
        });

        // ❌ Don't throw. Let the error be handled gracefully.
        return;
    }
  } else if (error instanceof Error) {
    toast.error(error.message, {
      description: descriptionText || "",
    });

    // ❌ Don't throw. Let the error be handled gracefully.
    return;
  } else {
    toast.error("Unknown error occurred!.", {
      description: descriptionText || "",
    });

    // ❌ Don't throw. Let the error be handled gracefully.
    return;
  }
};

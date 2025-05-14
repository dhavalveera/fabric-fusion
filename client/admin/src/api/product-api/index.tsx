import { handleApiError } from "@/utils/handle-api-error";

// types
import type { CreateProductPayloadProps } from "@/types";

// axios
import axiosInstance from "../axiosInstance";

export const createProductApi = async (payload: CreateProductPayloadProps) => {
  try {
    const response = await axiosInstance<{ statusCode: number; message: string }>({
      url: "/admin/products/create",
      method: "post",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ---------------------------------------------------🚀");
    console.log("🚀 ~ index.tsx:11 ~ createProductApi ~ error:", error);
    console.log("🚀 ---------------------------------------------------🚀");

    handleApiError(error);
  }
};

// API Error Handler
import { handleApiError } from "@/utils/handle-api-error";

// types
import { AllProductReviewRespProps } from "@/types";

// axios
import axiosInstance from "../axiosInstance";

export const getAllProductReviewApi = async (pageSize: number, pageNumber: number) => {
  try {
    const response = await axiosInstance<AllProductReviewRespProps>({
      url: `/admin/product-reviews/all`,
      method: "get",
      params: { pageSize, pageNumber },
    });

    return response.data;
  } catch (error) {
    console.log("🚀 --------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:20 ~ getAllProductReviewApi ~ error:", error);
    console.log("🚀 --------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fecthing all Product Reviews. Please try again.");
  }
};

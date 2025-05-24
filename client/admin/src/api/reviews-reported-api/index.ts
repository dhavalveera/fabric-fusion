// API Error Handler
import { handleApiError } from "@/utils/handle-api-error";

// types
import type { AllReportedReviewsApiProps, GenericApiResponseType, ReportedReviewsRespProps, UpdateReportedReviewPayloadProps } from "@/types";

// axios
import axiosInstance from "../axiosInstance";

export const getAllReportedReviewsApi = async (statusType: string, pageSize: number, pageNumber: number) => {
  try {
    const response = await axiosInstance<AllReportedReviewsApiProps>({
      url: `/admin/reported-reviews/all`,
      method: "get",
      params: { statusType, pageSize, pageNumber },
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ----------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:21 ~ getAllReportedReviewsApi ~ error:", error);
    console.log("🚀 ----------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fecthing all Reported Reviews. Please try again.");
  }
};

export const getSingleReportedReviewApi = async (reportedReviewId: string) => {
  try {
    const response = await axiosInstance<ReportedReviewsRespProps>({
      url: `/admin/reported-reviews/${reportedReviewId}/details`,
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ------------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:38 ~ getSingleReportedReviewApi ~ error:", error);
    console.log("🚀 ------------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fecthing single Reported Reviews. Please try again.");
  }
};

export const updateReportedReviewApi = async (reportedReviewId: string, payload: UpdateReportedReviewPayloadProps) => {
  try {
    const response = await axiosInstance<GenericApiResponseType>({
      url: `/admin/reported-reviews/${reportedReviewId}/update`,
      method: "patch",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ---------------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:56 ~ updateSingleReportedReviewApi ~ error:", error);
    console.log("🚀 ---------------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fecthing updating Reported Reviews. Please try again.");
  }
};

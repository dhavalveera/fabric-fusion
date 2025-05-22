// error handler
import { handleApiError } from "@/utils/handle-api-error";

// types
import { AllProdRegionResp, CreateProductRegionPayload, ProductRegionTagResProps } from "@/types";

// axios Instance
import axiosInstance from "../axiosInstance";

export const createProductRegionApi = async (payload: CreateProductRegionPayload) => {
  try {
    const response = await axiosInstance<{ statusCode: number; message: string }>({
      url: `/admin/region-tags/create`,
      method: "post",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 --------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:21 ~ createProductRegionApi ~ error:", error);
    console.log("🚀 --------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while creating Product Region!. Please try again later.");
  }
};

export const getAllProductRegionApi = async () => {
  try {
    const response = await axiosInstance<AllProdRegionResp>({
      url: "/admin/region-tags/all",
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 --------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:38 ~ getAllProductRegionApi ~ error:", error);
    console.log("🚀 --------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fetching all Product Region!. Please try again later.");
  }
};

export const getSingleProductRegionApi = async (regionId: string) => {
  try {
    const response = await axiosInstance<ProductRegionTagResProps>({
      url: `/admin/region-tags/${regionId}/details`,
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 -----------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:55 ~ getSingleProductRegionApi ~ error:", error);
    console.log("🚀 -----------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fetching single Product Region!. Please try again later.");
  }
};

export const updateProductRegionApi = async (regionId: string, payload: CreateProductRegionPayload) => {
  try {
    const response = await axiosInstance({
      url: `/admin/region-tags/${regionId}/update`,
      method: "patch",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 --------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:73 ~ updateProductRegionApi ~ error:", error);
    console.log("🚀 --------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while updating Product Region!. Please try again later.");
  }
};

export const deleteProductRegionApi = async (regionId: string) => {
  try {
    const response = await axiosInstance({
      url: `/admin/region-tags/${regionId}/delete`,
      method: "delete",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 --------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:90 ~ deleteProductRegionApi ~ error:", error);
    console.log("🚀 --------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while deleting the Product Region!. Please try again later.");
  }
};

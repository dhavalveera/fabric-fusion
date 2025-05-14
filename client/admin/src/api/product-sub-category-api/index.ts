// utils
import { handleApiError } from "@/utils/handle-api-error";

// types
import type { AllProdSubCategoryResp, ProductSubCategRespProps, ProductSubCategoryPayloadProps } from "@/types";

// axios instance
import axiosInstance from "../axiosInstance";

export const createSubCategoryApi = async (categoryId: string, payload: ProductSubCategoryPayloadProps) => {
  try {
    const response = await axiosInstance<ProductSubCategRespProps>({
      url: `/admin/product-sub-category/${categoryId}/create`,
      method: "post",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:21 ~ createSubCategoryApi ~ error:", error);
    console.log("🚀 ------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while creating Product Sub-Category!. Please try again later.");
  }
};

export const getAllSubCategoryApi = async (categoryId: string) => {
  try {
    const response = await axiosInstance<AllProdSubCategoryResp>({
      url: `/admin/product-sub-category/${categoryId}/all`,
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:38 ~ getAllSubCategoryApi ~ error:", error);
    console.log("🚀 ------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while Fetching Product Sub-Category!. Please try again later.");
  }
};

export const getSingleSubCategoryApi = async (subCategoryId: string) => {
  try {
    const response = await axiosInstance<ProductSubCategRespProps>({
      url: `/admin/product-sub-category/${subCategoryId}/details`,
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ---------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:55 ~ getSingleSubCategoryApi ~ error:", error);
    console.log("🚀 ---------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while Fetching Single Product Sub-Category!. Please try again later.");
  }
};

export const updateSubCategoryApi = async (subCategoryId: string, payload: ProductSubCategoryPayloadProps) => {
  try {
    const response = await axiosInstance({
      url: `/admin/product-sub-category/${subCategoryId}/update`,
      method: "patch",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:73 ~ updateSubCategoryApi ~ error:", error);
    console.log("🚀 ------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while creating Product Sub-Category!. Please try again later.");
  }
};

export const deleteSubCategoryApi = async (subCategoryId: string) => {
  try {
    const response = await axiosInstance({
      url: `/admin/product-sub-category/${subCategoryId}/delete`,
      method: "delete",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:90 ~ deleteSubCategoryApi ~ error:", error);
    console.log("🚀 ------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while creating Product Sub-Category!. Please try again later.");
  }
};

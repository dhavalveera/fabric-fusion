// utils
import { handleApiError } from "@/utils/handle-api-error";

// types
import type { AllProductCategoryResp, CreateProductCategRespProps, ProductCategPayloadProps, SingleProductCategResp } from "@/types";

// axios Instance
import axiosInstance from "../axiosInstance";

export const createProductCategoryApi = async (payload: ProductCategPayloadProps) => {
  try {
    const response = await axiosInstance<CreateProductCategRespProps>({
      url: "/admin/product-category/create",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 -------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:20 ~ createProductCategory API ~ error:", error);
    console.log("🚀 -------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while creating Product Category!. Please try again later.");
  }
};

export const getAllProductCategoryApi = async () => {
  try {
    const response = await axiosInstance<AllProductCategoryResp>({
      url: "/admin/product-category/all",
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 -------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:37 ~ getAllProductCategory ~ error:", error);
    console.log("🚀 -------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fetching Product Category.");
  }
};

export const getSingleProductCategoryApi = async (categoryId: string) => {
  try {
    const response = await axiosInstance<SingleProductCategResp>({
      url: `/admin/product-category/${categoryId}/details`,
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 -------------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:54 ~ getSingleProductCategoryApi ~ error:", error);
    console.log("🚀 -------------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while fetching Product Category.");
  }
};

export const updateProductCategoryApi = async (categoryId: string, payload: ProductCategPayloadProps) => {
  try {
    const response = await axiosInstance({
      url: `/admin/product-category/${categoryId}/update`,
      method: "patch",
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ----------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:72 ~ updateProductCategoryApi ~ error:", error);
    console.log("🚀 ----------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while updating Product Category. Please try again later.");
  }
};

export const deleteProductCategoryApi = async (categoryId: string) => {
  try {
    const response = await axiosInstance({
      url: `/admin/product-category/${categoryId}/delete`,
      method: "delete",
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ----------------------------------------------------------🚀");
    console.log("🚀 ~ index.ts:89 ~ updateProductCategoryApi ~ error:", error);
    console.log("🚀 ----------------------------------------------------------🚀");

    handleApiError(error, "Some error occurred while deleting Product Category. Please try again later.");
  }
};

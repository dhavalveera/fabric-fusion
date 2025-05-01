import { CreateProductFormValues } from "@/types";

export const isReturnPolicyEmpty = (returnPolicy: CreateProductFormValues["returnPolicy"]): boolean => {
  return Object.entries(returnPolicy).every(([, value]) => {
    if (Array.isArray(value)) {
      return value.every(item => item.trim?.() === "");
    }

    if (typeof value === "string") {
      return value.trim() === "";
    }

    return value === 0;
  });
};

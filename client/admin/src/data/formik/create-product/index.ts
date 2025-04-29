import * as Yup from "yup";

import type { CreateProductFormValues } from "@/types";

export const createProductInitialValues: CreateProductFormValues = {
  productName: "",
  productDescription: "",
  productPrice: "",
  productDisplayImage: "",
  colorOptions: [""],
  fabricType: "",
  styleOfFit: "",
  tags: [""],
  gender: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  productSubCategoryId: "",
  productSize: [{ size: "", totalStock: 0 }],
  productRegionId: "",
  careInstruction: {
    bleachingInstructions: "",
    dryCleaningInstructions: "",
    dryingInstructions: "",
    ironingInstructions: "",
    storageInstructions: "",
    washingInstructions: "",
  },
  returnPolicy: {
    conditions: [""],
    policyInformation: "",
    returnDuration: 0,
    returnWindow: "",
  },
};

export const createProductValidationSchemas: Yup.ObjectSchema<Partial<CreateProductFormValues>>[] = [
  Yup.object<Partial<CreateProductFormValues>>({
    productName: Yup.string().required("Product Name is required."),
    productDescription: Yup.string().required("Product Description is required."),
    productPrice: Yup.string().required("Product Price is required."),
    productSubCategoryId: Yup.string().required("Product Sub Category is required."),
    productRegionId: Yup.string().required("Product Region is required."),
    metaTitle: Yup.string().required("Meta Title is required"),
    metaDescription: Yup.string().required("Meta Title is required"),
    metaKeywords: Yup.array().of(Yup.string().required("Meta Keywords are required.")).min(1, "At least one keyword is required.").required("Keywords are required"),
  }),
  Yup.object<Partial<CreateProductFormValues>>({
    colorOptions: Yup.array().of(Yup.string().required("Color Options are required.")).min(1, "At least one color is required.").required("Color Options are required"),
    fabricType: Yup.string().required("Fabric Type is required"),
    styleOfFit: Yup.string().required("Style of Fit is required"),
    tags: Yup.array().of(Yup.string().required("Tags are required.")).min(1, "At least one tag is required.").required("Tags are required"),
    gender: Yup.string().required("Gender is required"),
    productSize: Yup.array().of(
      Yup.object({
        size: Yup.string().min(1, "Size is required").required("Product Size is required"),
        totalStock: Yup.number()
          .typeError("Total stock must be a number")
          .min(1, "Total stock must be at least 1")
          .required("Total Stock for related Size is required.")
          .moreThan(0, "Stock must be greater than 0"),
      }),
    ),
  }),
  Yup.object<Partial<CreateProductFormValues>>({
    productDisplayImage: Yup.string()
      .required("Product Display Image is required")
      .url("Must be a valid URL")
      .matches(/^https?:\/\/.*$/, "URL must start with http:// or https://"),
  }),
  Yup.object<Partial<CreateProductFormValues>>({
    careInstruction: Yup.object({
      bleachingInstructions: Yup.string().notRequired(),
      dryCleaningInstructions: Yup.string().notRequired(),
      dryingInstructions: Yup.string().notRequired(),
      ironingInstructions: Yup.string().notRequired(),
      storageInstructions: Yup.string().notRequired(),
      washingInstructions: Yup.string().notRequired(),
    }),
    returnPolicy: Yup.object({
      conditions: Yup.array().of(Yup.string().notRequired()).notRequired(),
      policyInformation: Yup.string().notRequired(),
      returnDuration: Yup.number().notRequired(),
      returnWindow: Yup.string().notRequired(),
    }),
  }),
  Yup.object({}),
];

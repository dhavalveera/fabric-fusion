import type { FC } from "react";

// Formik
import { useFormik } from "formik";

// stepperize
import { defineStepper } from "@stepperize/react";

// Sonner => Toast Message
import { toast } from "sonner";

// API
import { createProductApi } from "@/api/product-api";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";
import CustomButton from "@/components/library/custom-button";
import StepIndicator from "@/components/library/stepper-indicator";

// Data
import { createProductSteps } from "@/data/create-product-steps";
import { createProductInitialValues, createProductValidationSchemas } from "@/data/formik";

// hooks
import { useAppNavigate } from "@/hooks/use-app-navigate";

// types
import { CreateProductFormValues, CreateProductPayloadProps } from "@/types";

// Form Components
import ProductBasicInfoForm from "./basic-info";
import VariantsOptions from "./variants";
import ThumbnailProductImage from "./image-upload";
import ProductPolicies from "./product-policies";
import ProductFinalReview from "./review-product-list";
import { isReturnPolicyEmpty } from "./review-product-list/is-return-policy-empty";

const { useStepper, utils } = defineStepper(
  ...createProductSteps.map(step => ({
    id: step.id,
    title: step.title,
    description: step.description,
  })),
);

const CreateProductPage: FC = () => {
  const stepper = useStepper();

  const { goTo } = useAppNavigate();

  const currentIndex = utils.getIndex(stepper.current.id);

  const formik = useFormik<CreateProductFormValues>({
    initialValues: createProductInitialValues,
    validationSchema: createProductValidationSchemas[currentIndex],
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        if (stepper.isLast) {
          helpers.setSubmitting(true);

          const createProductPayload: CreateProductPayloadProps = {
            productDetails: {
              colorOptions: values.colorOptions,
              fabricType: values.fabricType,
              gender: values.gender,
              gstPercentage: values.gstPercentage,
              metaDescription: values.metaDescription,
              metaKeywords: values.metaKeywords,
              metaTitle: values.metaTitle,
              productDescription: values.productDescription,
              productDisplayImage: values.productDisplayImage,
              productName: values.productName,
              productPrice: values.productPrice,
              styleOfFit: values.styleOfFit,
              tags: values.tags,
              brandName: "Fabric Fusion",
            },
            productRegionId: values.productRegionId, // "ee37af70-1386-40ed-bff3-78df0b902b21"
            productSize: values.productSize,
            productSubCategoryId: values.productSubCategoryId, // "3076719d-59c8-4db4-93e1-0daab64f3aae"
            ...(!isReturnPolicyEmpty(values.returnPolicy) && { returnPolicy: values.returnPolicy }),
            ...(Object.values(values.careInstruction).every(value => value.trim() !== "") && { careInstruction: values.careInstruction }),
          };

          const response = await createProductApi(createProductPayload);

          if (response?.statusCode === 201) {
            toast.success(
              <div className="space-x-2">
                <span className="font-della-respira text-base">Product</span>
                <span className="text-lg font-bold">{values.productName}</span>
                <span className="font-della-respira text-base">Create Successfully!.</span>
              </div>,
              {
                description: "Product Creation",
              },
            );

            goTo("/dashboard/products");
          }
        } else {
          stepper.next();

          // helpers.setTouched({});
          // helpers.setErrors({});
          helpers.setSubmitting(false);
        }
      } catch (error) {
        console.log("🚀 --------------------------------------------🚀");
        console.log("🚀 ~ Create Product:37 ~ onSubmit: ~ error:", error);
        console.log("🚀 --------------------------------------------🚀");

        helpers.setSubmitting(false);

        toast.error("Failed to create product", {
          description: "Product Creation.",
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="h-full p-4">
        <Breadcrumb secondLabel="Products" secondLabelLinkHref="/dashboard/products" thirdLabel="Create Product" />

        {/* Form */}
        <div className="mt-10">
          <div className="mb-10 flex w-full items-center justify-center">
            <div className="flex items-center gap-4">
              <StepIndicator currentStep={currentIndex + 1} totalSteps={stepper.all.length} />

              <div className="flex flex-col">
                <h2 className="font-della-respira flex-1 text-lg font-medium">{stepper.current.title}</h2>

                <p className="font-della-respira text-sm text-gray-500">{stepper.current.description}</p>
              </div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div>
              {stepper.switch({
                basic: () => <ProductBasicInfoForm formik={formik} />,
                variants: () => <VariantsOptions formik={formik} />,
                image: () => <ThumbnailProductImage formik={formik} />,
                policies: () => <ProductPolicies formik={formik} />,
                review: () => <ProductFinalReview formik={formik} />,
              })}
            </div>

            <div className="mt-28 flex justify-between">
              <CustomButton type="button" btnLabel="Previous" btnSize="md" onClick={stepper.prev} disabled={stepper.isFirst} />

              <CustomButton btnLabel={stepper.isLast ? "Submit" : "Next"} btnSize="md" type={formik.isSubmitting ? "button" : "submit"} disabled={formik.isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;

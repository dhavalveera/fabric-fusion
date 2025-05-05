import type { FC } from "react";

// Formik
import { useFormik } from "formik";

// stepperize
import { defineStepper } from "@stepperize/react";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";
import CustomButton from "@/components/library/custom-button";
import StepIndicator from "@/components/library/stepper-indicator";

// Data
import { createProductSteps } from "@/data/create-product-steps";
import { createProductInitialValues, createProductValidationSchemas } from "@/data/formik";

// types
import { CreateProductFormValues } from "@/types";

// Form Components
import ProductBasicInfoForm from "./basic-info";
import VariantsOptions from "./variants";
import ThumbnailProductImage from "./image-upload";
import ProductPolicies from "./product-policies";
import ProductFinalReview from "./review-product-list";

const { useStepper, utils } = defineStepper(
  ...createProductSteps.map(step => ({
    id: step.id,
    title: step.title,
    description: step.description,
  })),
);

const CreateProductPage: FC = () => {
  const stepper = useStepper();

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

          console.log({ values });
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

          <form onSubmit={formik.handleSubmit} noValidate>
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

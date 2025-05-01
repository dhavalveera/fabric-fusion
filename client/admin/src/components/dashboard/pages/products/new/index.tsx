import { useCallback, useState, type FC } from "react";

// Formik
import { useFormik } from "formik";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";
import CustomButton from "@/components/library/custom-button";
import Stepper from "@/components/library/stepper";

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

const CreateProductPage: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const isLastStep = activeStep === createProductValidationSchemas.length;

  const nextStep = useCallback(() => {
    setActiveStep(nextStep => nextStep + 1);
  }, []);

  const prevStep = useCallback(() => {
    setActiveStep(prevStep => prevStep - 1);
  }, []);

  const formik = useFormik<CreateProductFormValues>({
    initialValues: createProductInitialValues,
    validationSchema: createProductValidationSchemas[activeStep - 1],
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        if (isLastStep) {
          helpers.setSubmitting(true);

          console.log({ values });
        } else {
          nextStep();

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
          <div className="mb-10">
            <Stepper activeStep={activeStep} stepsData={createProductSteps} />
          </div>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div>
              {activeStep === 1 ? <ProductBasicInfoForm formik={formik} /> : null}

              {activeStep === 2 ? <VariantsOptions formik={formik} /> : null}

              {activeStep === 3 ? <ThumbnailProductImage formik={formik} /> : null}

              {activeStep === 4 ? <ProductPolicies formik={formik} /> : null}

              {activeStep === 5 ? <ProductFinalReview formik={formik} /> : null}
            </div>

            <div className="mt-28 flex justify-between">
              <CustomButton type="button" btnLabel="Previous" btnSize="md" onClick={prevStep} disabled={activeStep === 1} />

              <CustomButton btnLabel={isLastStep ? "Submit" : "Next"} btnSize="md" type={formik.isSubmitting ? "button" : "submit"} disabled={formik.isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;

import type { FC } from "react";

// types
import type { CreateProductFormikProps } from "@/types";

// COmponents
import CareInstructionComp from "./care-instructions";
import ReturnPolicyComp from "./return-policy";

const ProductPolicies: FC<CreateProductFormikProps> = ({ formik }) => {
  return (
    <>
      <CareInstructionComp formik={formik} />

      <ReturnPolicyComp formik={formik} />
    </>
  );
};

export default ProductPolicies;

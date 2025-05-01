import type { FC } from "react";

// shadcn/ui
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";

// DRY
import Card from "@/components/library/card";
import Editor from "@/components/library/editor";

// UI
import { ThreeColumnGrid } from "@/ui";

// types
import { CreateProductFormikProps } from "@/types";

// Component
import CategorySubCategSelection from "./category-selection";
import SelectProdRegion from "./select-region";
import MetaDetails from "./meta-details";

const ProductBasicInfoForm: FC<CreateProductFormikProps> = ({ formik }) => {
  return (
    <>
      <Card
        cardTitle="General"
        cardTitleWithUnderline
        cardBody={
          <div>
            <div className={ThreeColumnGrid}>
              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    type="text"
                    name="productName"
                    id="productName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productName}
                    // icon={AiOutlineProduct}
                  />
                </div>

                {formik.touched.productName && formik.errors.productName ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.productName}</p> : null}
              </div>

              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="productPrice">Product Price</Label>
                  <Input type="number" name="productPrice" id="productPrice" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.productPrice} className="no-spinner" />
                </div>

                {formik.touched.productPrice && formik.errors.productPrice ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.productPrice}</p> : null}
              </div>

              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="gstPercentage">GST Percentage</Label>

                  <Input type="number" name="gstPercentage" id="gstPercentage" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.gstPercentage} className="no-spinner" />
                </div>

                {formik.touched.gstPercentage && formik.errors.gstPercentage ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.gstPercentage}</p> : null}
              </div>
            </div>

            <div className="my-5">
              <div>
                <p className="font-della-respira mb-1">Product Description</p>

                <Editor
                  defaultValue="Type Product Description Here...."
                  onChange={content => {
                    formik.setFieldValue("productDescription", content);
                  }}
                />
              </div>
            </div>
          </div>
        }
      />

      <div className="mt-5">
        <CategorySubCategSelection formik={formik} />
      </div>

      <div className="mt-5">
        <SelectProdRegion formik={formik} />
      </div>

      <div className="mt-5">
        <MetaDetails formik={formik} />
      </div>
    </>
  );
};

export default ProductBasicInfoForm;

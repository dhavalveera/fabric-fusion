import type { FC } from "react";

// react icons
import { AiOutlineProduct } from "react-icons/ai";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

// DRY
import Card from "@/components/library/card";
import Editor from "@/components/library/editor";
import Input from "@/components/library/input";

// UI
import { TwoColumnGrid } from "@/ui";

// types
import { CreateProductFormikProps } from "@/types";

// Component
import CategorySubCategSelection from "../category-selection";

const ProductBasicInfoForm: FC<CreateProductFormikProps> = ({ formik }) => {
  return (
    <>
      <Card
        cardTitle="General"
        cardBody={
          <div>
            <div className={TwoColumnGrid}>
              <div>
                <Input
                  type="text"
                  label="Product Name"
                  name="productName"
                  id="productName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productName}
                  icon={AiOutlineProduct}
                />

                {formik.touched.productName && formik.errors.productName ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.productName}</p> : null}
              </div>

              <div>
                <Input
                  label="Product Price"
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productPrice}
                  className="no-spinner"
                  icon={RiMoneyRupeeCircleFill}
                />

                {formik.touched.productPrice && formik.errors.productPrice ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.productPrice}</p> : null}
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

            <div>
              <CategorySubCategSelection formik={formik} />
            </div>
          </div>
        }
      />
    </>
  );
};

export default ProductBasicInfoForm;

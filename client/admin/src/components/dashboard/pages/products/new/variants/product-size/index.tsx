import type { FC } from "react";

// shadcn/ui
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";

// types
import { CreateProductFormikProps } from "@/types";
import { Button } from "@/components/library/shadcn-components/ui/button";
import { X } from "lucide-react";

const ProductSizeComp: FC<CreateProductFormikProps> = ({ formik }) => {
  const addSize = () => {
    formik.setFieldValue("productSize", [...formik.values.productSize, { size: "", totalStock: 0 }]);
  };

  const removeSize = (index: number) => {
    const updated = [...formik.values.productSize];
    updated.splice(index, 1);
    formik.setFieldValue("productSize", updated);
  };

  return (
    <>
      {formik.values.productSize.map((_, index) => {
        return (
          <div key={index} className="flex items-start gap-4 rounded-2xl not-first:mt-4">
            <div className="flex-1">
              <Label htmlFor={`productSize.${index}.size`}>Size</Label>
              <Input id={`productSize.${index}.size`} value={formik.values.productSize[index].size} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="e.g. M, L, XL" />

              {formik.touched.productSize?.[index]?.size && typeof formik.errors.productSize?.[index] === "object" && formik.errors.productSize?.[index]?.size && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.productSize[index]?.size}</p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor={`productSize.${index}.totalStock`}>Total Stock</Label>

              <Input
                id={`productSize.${index}.totalStock`}
                value={formik.values.productSize[index].totalStock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="e.g. 5"
                className="no-spinner"
              />

              {formik.touched.productSize?.[index]?.totalStock && typeof formik.errors.productSize?.[index] === "object" && formik.errors.productSize?.[index]?.totalStock && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.productSize[index]?.totalStock}</p>
              )}
            </div>

            {index !== 0 ? (
              <Button type="button" variant="ghost" className="text-destructive mt-6 cursor-pointer" onClick={() => removeSize(index)}>
                <X className="size-4" />
              </Button>
            ) : null}
          </div>
        );
      })}

      <Button type="button" onClick={addSize} className="mt-5 cursor-pointer">
        Add Size
      </Button>
    </>
  );
};

export default ProductSizeComp;

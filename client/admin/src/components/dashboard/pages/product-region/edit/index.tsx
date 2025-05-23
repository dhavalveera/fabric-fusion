import type { FC } from "react";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Sonner => Toast Message
import { toast } from "sonner";

// API
import { updateProductRegionApi } from "@/api/product-region-api";

// shadcn/ui
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";

// DRY
import CustomButton from "@/components/library/custom-button";

// types
import type { EditRegionTagFormProps } from "@/types";

const EditRegionTagForm: FC<EditRegionTagFormProps> = props => {
  const { regionTagDescription, regionTagId, regionTagName, setOpenSheet } = props;

  const formik = useFormik({
    initialValues: {
      regionTagName: regionTagName,
      description: regionTagDescription,
    },
    validationSchema: Yup.object({
      regionTagName: Yup.string().required("Region Tag Name is requited."),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        toast.promise(updateProductRegionApi(regionTagId, values), {
          loading: "Updating Region Tag....",
          success: response => {
            if (response?.statusCode === 200) {
              setOpenSheet(false);

              helpers.resetForm();

              return (
                <div>
                  <div className="font-della-respira font-medium">Region Tag updated successfully!</div>
                  <div className="text-muted-foreground font-della-respira text-sm">Region Tag</div>
                </div>
              );
            }
          },
          error: "Unable to the Region Tag.",
        });
      } catch (error) {
        console.log("🚀 --------------------------------------------🚀");
        console.log("🚀 ~ index.tsx:53 (edit product region form) ~ onSubmit: ~ error:", error);
        console.log("🚀 --------------------------------------------🚀");

        helpers.setSubmitting(false);

        toast.error("Failed to update product region", {
          description: "Product Region Updating.",
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="p-4 sm:p-2">
        {/* FORM */}
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex-1 space-y-2">
              <div>
                <Label htmlFor="regionTagName">Region Tag Name</Label>

                <Input id="regionTagName" name="regionTagName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.regionTagName} required className="mt-2" />

                {formik.touched.regionTagName && formik.errors.regionTagName ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.regionTagName}</p> : null}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <Label htmlFor="description">Description</Label>

                <Input id="description" name="description" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} required className="mt-2" />

                {formik.touched.description && formik.errors.description ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.description}</p> : null}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CustomButton btnLabel={formik.isSubmitting ? "Updating...." : "Update"} btnSize="md" type={formik.isSubmitting ? "button" : "submit"} disabled={formik.isSubmitting} className="w-full" />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRegionTagForm;

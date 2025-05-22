import type { FC } from "react";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Sonner => Toast Message
import { toast } from "sonner";

// API
import { createProductRegionApi } from "@/api/product-region-api";

// shadcn/ui
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";

// DRY
import CustomButton from "@/components/library/custom-button";

// types
import type { CreateRegionPageProps } from "@/types";

const CreateRegionPage: FC<CreateRegionPageProps> = props => {
  const { setOpenSheet } = props;

  const formik = useFormik({
    initialValues: {
      regionTagName: "",
      description: "",
    },
    validationSchema: Yup.object({
      regionTagName: Yup.string().required("Region Tag Name is requited."),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        toast.promise(createProductRegionApi(values), {
          loading: "Creating Region Tag....",
          success: response => {
            if (response?.statusCode === 201) {
              setOpenSheet(false);

              helpers.resetForm();

              return (
                <div>
                  <div className="font-della-respira font-medium">Region Tag created successfully!</div>
                  <div className="text-muted-foreground font-della-respira text-sm">Region Tag</div>
                </div>
              );
            }
          },
        });
      } catch (error) {
        console.log("🚀 --------------------------------------------🚀");
        console.log("🚀 ~ index.tsx:48 (create product region form) ~ onSubmit: ~ error:", error);
        console.log("🚀 --------------------------------------------🚀");

        helpers.setSubmitting(false);

        toast.error("Failed to create product region", {
          description: "Product Region Creation.",
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
            <CustomButton btnLabel={formik.isSubmitting ? "Creating...." : "Create"} btnSize="md" type={formik.isSubmitting ? "button" : "submit"} disabled={formik.isSubmitting} className="w-full" />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRegionPage;

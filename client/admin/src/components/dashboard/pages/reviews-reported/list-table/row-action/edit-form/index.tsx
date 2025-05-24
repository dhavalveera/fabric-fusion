import { useMemo, type FC } from "react";

// Formik + Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// SONNER => toast
import { toast } from "sonner";

// API
import { updateReportedReviewApi } from "@/api/reviews-reported-api";

// DRY
import CustomButton from "@/components/library/custom-button";

// shadcn/ui
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/shadcn-components/ui/select";

// data
import { reviewActions, validTransitions } from "@/data/reported-reviews-data";

// types
import type { ReportedReviewEditFormProps, UpdateReportedReviewPayloadProps } from "@/types";

const ReportedReviewEditForm: FC<ReportedReviewEditFormProps> = props => {
  const { currentStatus, fetchReportedReviews, handleEditFormSheet, reportedReviewId } = props;

  const allowedStatuses = useMemo(() => validTransitions[currentStatus] || [], [currentStatus]);
  const isFormDisabled = currentStatus === "Action Taken";

  const formik = useFormik({
    initialValues: {
      status: "",
      reviewAction: "",
    },
    validationSchema: Yup.object().shape({
      status: Yup.string().oneOf(allowedStatuses, "Invalid Status Transitioning.").required("Status is required"),
      reviewAction: Yup.string()
        .nullable()
        .test("isValidAction", "Invalid review action", function (value) {
          const selectedStatus = this.parent.status;
          if (!value) return true;
          return selectedStatus === "Reviewed" || currentStatus === "Reviewed";
        }),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        const payload = {
          status: values.status,
          ...(values.reviewAction && { reviewAction: values.reviewAction }),
        };

        toast.promise(updateReportedReviewApi(reportedReviewId, payload as UpdateReportedReviewPayloadProps), {
          loading: "Updating Reported Review Status...",
          success: response => {
            if (response && response.statusCode === 200) {
              fetchReportedReviews();

              handleEditFormSheet();

              helpers.setSubmitting(false);

              return (
                <div>
                  <p className="font-della-respira">Updated Reported Review Successfully</p>

                  <p className="text-muted-foreground font-della-respira text-sm">Reported Reviews</p>
                </div>
              );
            }
          },
          error: "Error while updating Reported Review!.",
        });
      } catch (error) {
        console.log("🚀 --------------------------------------------🚀");
        console.log("🚀 ~ index.tsx:45 (edit/update reported reviews form) ~ onSubmit: ~ error:", error);
        console.log("🚀 --------------------------------------------🚀");

        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <div className="p-4 sm:p-2.5">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="status" className="font-della-respira mb-1 block font-medium">
            Status
          </Label>
          <Select
            disabled={isFormDisabled}
            onValueChange={value => {
              formik.setFieldValue("status", value);

              // Also clear reviewAction if status is not valid for it
              if (!(currentStatus === "Reviewed" && value === "Action Taken")) {
                formik.setFieldValue("reviewAction", "");
              }
            }}
            value={formik.values.status}
          >
            <SelectTrigger onBlur={formik.handleBlur} id="status" name="status">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {allowedStatuses.map((status, indexOne) => {
                return (
                  <SelectItem key={indexOne} value={status}>
                    {status}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {formik.touched.status && formik.errors.status ? <div className="font-della-respira mt-1 text-sm text-red-500">{formik.errors.status}</div> : null}
        </div>

        {currentStatus === "Reviewed" && formik.values.status === "Action Taken" ? (
          <div>
            <Label htmlFor="reviewAction" className="font-della-respira mb-1 block font-medium">
              Review Action
            </Label>
            <Select name="reviewAction" disabled={isFormDisabled} onValueChange={value => formik.setFieldValue("reviewAction", value)} value={formik.values.reviewAction}>
              <SelectTrigger onBlur={formik.handleBlur} id="reviewAction" name="status">
                <SelectValue placeholder="Select review action (optional)" />
              </SelectTrigger>

              <SelectContent>
                {reviewActions.map((action, indexTwo) => (
                  <SelectItem key={indexTwo} value={action.value}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formik.touched.reviewAction && formik.errors.reviewAction && <div className="font-della-respira mt-1 text-sm text-red-500">{formik.errors.reviewAction}</div>}
          </div>
        ) : null}

        <div className="pt-2">
          <CustomButton
            btnLabel={formik.isSubmitting ? "Updating..." : "Update Review"}
            btnSize="md"
            className="w-full"
            disabled={isFormDisabled || !formik.isValid || !formik.dirty || formik.isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ReportedReviewEditForm;

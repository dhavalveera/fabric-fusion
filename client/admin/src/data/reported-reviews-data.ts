// types
import type { ReportedReviewStatusType, ReviewActionDataProps } from "@/types";

export const statuses: ReportedReviewStatusType[] = ["Action Taken", "Pending", "Reviewed"];

export const reviewActions: ReviewActionDataProps[] = [
  {
    label: "Temporary Delete",
    value: "softDelete",
  },
  {
    label: "Permanently Delete",
    value: "permanentDelete",
  },
];

export const validTransitions: Record<ReportedReviewStatusType, Array<string>> = {
  Pending: ["Reviewed"],
  Reviewed: ["Action Taken"],
  "Action Taken": [],
};

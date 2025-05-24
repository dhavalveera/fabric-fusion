import { useCallback, useEffect, useState, type FC } from "react";

// API
import { getAllReportedReviewsApi } from "@/api/reviews-reported-api";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";

// shadcn/ui cmponents
import { Tabs, TabsList, TabsTrigger } from "@/components/library/shadcn-components/ui/tabs";

// UI
import { MainParentLayout } from "@/ui";

// types
import { ReportedReviewStatusType, ReportedReviewsRespProps } from "@/types";

// Table Component
import ReportedReviewsListTable from "./list-table";

const ReviewsReportedPage: FC = () => {
  const [reportedReviewsData, setReportedReviewsData] = useState<ReportedReviewsRespProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [statusType, setStatusType] = useState<ReportedReviewStatusType>("Pending");

  // State for Pagination
  const [pageNo, setPageNo] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const fetchReportedReviews = useCallback(async () => {
    try {
      const response = await getAllReportedReviewsApi(statusType, rowsPerPage, pageNo);

      if (response && response.count > 0) {
        setReportedReviewsData(response.rows);
        setTotalCount(response.count);
      } else {
        setReportedReviewsData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.log("🚀 -------------------------------------------------------🚀");
      console.log("🚀 ~ index.tsx:35 ~ fetchReportedReviews ~ error:", error);
      console.log("🚀 -------------------------------------------------------🚀");

      setReportedReviewsData([]);
      setTotalCount(0);
    }
  }, [statusType, pageNo, rowsPerPage]);

  useEffect(() => {
    fetchReportedReviews();
  }, [statusType, pageNo, rowsPerPage, fetchReportedReviews]);

  return (
    <>
      <title>Reviews Reported | Fabric Fusion</title>

      <div className="grow-1 pb-8">
        <div className={MainParentLayout}>
          <Breadcrumb secondLabel="Reviews Reported" className="mb-4" />
          <div className="mb-4">
            {/* Grid */}
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
              <div>
                <h4 className="font-della-respira text-2xl font-bold">Reviews Reported</h4>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="flex items-center justify-center">
            <Tabs value={statusType} onValueChange={value => setStatusType(value as ReportedReviewStatusType)}>
              <TabsList className="bg-background mb-3 h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
                <TabsTrigger
                  value="Pending"
                  className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary font-della-respira relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="Reviewed"
                  className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary font-della-respira relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
                >
                  Reviewed
                </TabsTrigger>
                <TabsTrigger
                  value="Action Taken"
                  className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary font-della-respira relative overflow-hidden rounded-none border px-4 py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
                >
                  Action Taken
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Table */}
          <ReportedReviewsListTable
            fetchReportedReviews={fetchReportedReviews}
            onPageChange={setPageNo}
            onRowsPerPageChange={setRowsPerPage}
            pageNo={pageNo}
            reportedReviewsData={reportedReviewsData}
            rowsPerPage={rowsPerPage}
            totalSize={totalCount}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewsReportedPage;

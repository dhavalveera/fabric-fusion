import { useCallback, useEffect, useState, type FC } from "react";

// API
import { getAllProductReviewApi } from "@/api/product-review-api";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";

// UI
import { MainParentLayout } from "@/ui";

// types
import type { ProductReviewsRespProps } from "@/types";

// List Table
import ProdReviewsListTable from "./list-table";

const ProductReviewsPage: FC = () => {
  const [reviewsData, setReviewsData] = useState<ProductReviewsRespProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  // State for Pagination
  const [pageNo, setPageNo] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const fetchProductReviews = useCallback(async () => {
    try {
      const response = await getAllProductReviewApi(rowsPerPage, pageNo);

      if (response && response.count > 0) {
        setReviewsData(response.rows);
        setTotalCount(response.count);
      } else {
        setReviewsData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.log("🚀 ------------------------------------------------------🚀");
      console.log("🚀 ~ index.tsx:33 ~ fetchProductReviews ~ error:", error);
      console.log("🚀 ------------------------------------------------------🚀");
    }
  }, [pageNo, rowsPerPage]);

  useEffect(() => {
    fetchProductReviews();
  }, [pageNo, rowsPerPage, fetchProductReviews]);

  return (
    <>
      <title>Product Reviews | Fabric Fusion</title>

      <div className="grow-1 pb-8">
        <div className={MainParentLayout}>
          <Breadcrumb secondLabel="Product Reviews" className="mb-4" />
          <div className="mb-4">
            {/* Grid */}
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
              <div>
                <h4 className="font-della-respira text-2xl font-bold">Product Reviews</h4>
              </div>
            </div>
          </div>

          {/* Table */}
          <ProdReviewsListTable onPageChange={setPageNo} onRowsPerPageChange={setRowsPerPage} pageNo={pageNo} reviewsData={reviewsData} rowsPerPage={rowsPerPage} totalSize={totalCount} />
        </div>
      </div>
    </>
  );
};

export default ProductReviewsPage;

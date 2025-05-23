import { useCallback, useEffect, useState, type FC } from "react";

// API
import { getAllProductRegionApi } from "@/api/product-region-api";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";

// UI
import { MainParentLayout } from "@/ui";

// types
import type { ProductRegionTagResProps } from "@/types";

// Create Region Button
import CreateRegionButton from "./create-region-btn";

// Table Component
import RegionTagListTable from "./list-table";

const ProductRegionPage: FC = () => {
  const [regionTagData, setRegionTagData] = useState<ProductRegionTagResProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [pageNo, setPageNo] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const fetchRegionTag = useCallback(async () => {
    try {
      const response = await getAllProductRegionApi(rowsPerPage, pageNo);

      if (response && response?.count > 0) {
        setRegionTagData(response?.rows);
        setTotalCount(response.count);
      }
    } catch (error) {
      console.log("🚀 -------------------------------------------------🚀");
      console.log("🚀 ~ index.tsx:28 ~ fetchRegionTag ~ error:", error);
      console.log("🚀 -------------------------------------------------🚀");
    }
  }, [pageNo, rowsPerPage]);

  useEffect(() => {
    fetchRegionTag();
  }, [pageNo, rowsPerPage, fetchRegionTag]);

  return (
    <>
      <title>Product Region | Fabric Fusion</title>

      <div className="grow-1 pb-8">
        <div className={MainParentLayout}>
          <Breadcrumb secondLabel="Product Region" className="mb-4" />
          <div className="mb-4">
            {/* Grid */}
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
              <div>
                <h4 className="font-della-respira text-2xl font-bold">Product Region</h4>
              </div>

              <div>
                <CreateRegionButton fetchRegionTag={fetchRegionTag} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-5">
            <RegionTagListTable
              onPageChange={setPageNo}
              onRowsPerPageChange={setRowsPerPage}
              pageNo={pageNo}
              regionTagData={regionTagData}
              rowsPerPage={rowsPerPage}
              totalSize={totalCount}
              fetchRegionTag={fetchRegionTag}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductRegionPage;

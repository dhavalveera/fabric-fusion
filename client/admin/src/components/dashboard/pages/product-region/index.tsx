import type { FC } from "react";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";

// UI
import { MainParentLayout } from "@/ui";

// Create Region Button
import CreateRegionButton from "./create-region-btn";

const ProductRegionPage: FC = () => {
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
                <CreateRegionButton />
              </div>
            </div>
          </div>

          {/* Table */}
        </div>
      </div>
    </>
  );
};

export default ProductRegionPage;

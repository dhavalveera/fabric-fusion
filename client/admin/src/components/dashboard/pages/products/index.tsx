import type { FC } from "react";

// react icons
import { FaPlus } from "react-icons/fa6";

// DRY
import CustomButton from "@/components/library/custom-button";

// UI
import { MainParentLayout } from "@/ui";
import Breadcrumb from "@/components/library/breadcrumb";
import { useAppNavigate } from "@/hooks/use-app-navigate";

const ProductsPage: FC = () => {
  const { goTo } = useAppNavigate();

  const handleNavigate = () => {
    goTo("/dashboard/product/create");
  };

  return (
    <>
      <title>Products | Fabric Fusion</title>

      <div className="grow-1 pb-8">
        <div className={MainParentLayout}>
          <Breadcrumb secondLabel="Products" className="mb-4" />
          <div className="mb-4">
            {/* Grid */}
            <div className="flex w-full items-center justify-between">
              <div>
                <h4 className="font-della-respira text-2xl font-bold">Products</h4>
              </div>

              <div>
                <CustomButton btnLabel="add product" btnSize="md" icon={FaPlus} iconPlacement="start" onClick={handleNavigate} />
              </div>
            </div>
          </div>

          {/* Table */}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;

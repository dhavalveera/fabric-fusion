import { useState, type FC } from "react";

// DRY
import Card from "@/components/library/card";
import Select from "@/components/library/select";

// UI
import { TwoColumnGrid } from "@/ui";

// types
import { CreateProductFormikProps } from "@/types";

import { categroyData } from "./data";

const CategorySubCategSelection: FC<CreateProductFormikProps> = ({ formik }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (value: string) => setSelectedCategory(value);

  return (
    <>
      <div>
        <div className="flex min-h-16 flex-wrap items-stretch justify-between bg-transparent px-9 py-2">
          <div className="font-della-respira m-2 flex items-center text-2xl font-medium text-[#071437]">
            <h2>Category</h2>
          </div>
        </div>

        <div>
          <div className={TwoColumnGrid}>
            <div>
              <Select data={categroyData} handleChange={handleCategoryChange} selectLabel="Product Category" selectedValue={selectedCategory} />
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySubCategSelection;

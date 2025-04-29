import { useId, useState, type FC } from "react";

// shadcn/ui Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/shadcn-components/ui/select";

// UI
import { TwoColumnGrid } from "@/ui";

// types
import { CreateProductFormikProps } from "@/types";

import { categroyData } from "./data";

const CategorySubCategSelection: FC<CreateProductFormikProps> = ({ formik }) => {
  const id = useId();

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (value: string) => {
    console.log({ value });

    setSelectedCategory(value);
  };

  console.log({ formik });

  return (
    <>
      <div>
        <div className="flex min-h-16 flex-wrap items-stretch justify-between bg-transparent py-2">
          <div className="font-della-respira flex items-center text-2xl font-medium text-[#071437]">
            <h2>Category</h2>
          </div>
        </div>

        <div className="mt-5">
          <div className={TwoColumnGrid}>
            <div>
              <div className="group relative">
                <label
                  htmlFor={id}
                  className="bg-background text-foreground font-della-respira absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Product Category
                </label>

                <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                  <SelectTrigger id={id}>
                    <SelectValue placeholder="Select Product Category" className="font-della-respira" />
                  </SelectTrigger>
                  <SelectContent>
                    {categroyData.map((category, index) => {
                      return (
                        <SelectItem value={category.value} key={index}>
                          {category.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySubCategSelection;

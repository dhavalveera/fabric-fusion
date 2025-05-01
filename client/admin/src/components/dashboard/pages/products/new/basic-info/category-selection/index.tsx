import { useId, useState, type FC } from "react";

// shadcn/ui Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/shadcn-components/ui/select";

// OWN Component
import Card from "@/components/library/card";

// UI
import { TwoColumnGrid } from "@/ui";

// types
import { CreateProductFormikProps } from "@/types";

import { categroyData } from "./data";

const CategorySubCategSelection: FC<CreateProductFormikProps> = ({ formik }) => {
  const id = useId();
  const subCategReactId = useId();

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (value: string) => {
    console.log({ value });

    setSelectedCategory(value);
  };

  return (
    <>
      <Card
        cardTitle="Category"
        cardTitleWithUnderline
        cardBody={
          <div>
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

              <div>
                {selectedCategory !== "" ? (
                  <>
                    <div>
                      <div className="group relative">
                        <label
                          htmlFor={subCategReactId}
                          className="bg-background text-foreground font-della-respira absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                        >
                          Product Sub-Category
                        </label>

                        <Select
                          onValueChange={values => {
                            formik.setFieldValue("productSubCategoryId", values);
                          }}
                          value={formik.values.productSubCategoryId}
                        >
                          <SelectTrigger id={subCategReactId}>
                            <SelectValue placeholder="Select Product Sub Category" className="font-della-respira" />
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
                  </>
                ) : null}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default CategorySubCategSelection;

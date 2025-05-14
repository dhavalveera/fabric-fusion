import { useCallback, useEffect, useId, useState, type FC } from "react";

// shadcn/ui Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/shadcn-components/ui/select";

// Sonner -> Toast Messages
import { toast } from "sonner";

// API
import { getAllProductCategoryApi } from "@/api/product-category-api";
import { getAllSubCategoryApi } from "@/api/product-sub-category-api";

// OWN Component
import Card from "@/components/library/card";

// UI
import { TwoColumnGrid } from "@/ui";

// Utils
import { cn } from "@/utils/cn";

// types
import { CreateProductCategRespProps, CreateProductFormikProps, ProductSubCategRespProps } from "@/types";

const CategorySubCategSelection: FC<CreateProductFormikProps> = ({ formik }) => {
  const id = useId();
  const subCategReactId = useId();

  const [allCategories, setAllCategories] = useState<CreateProductCategRespProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [allSubCategories, setAllSubCategories] = useState<ProductSubCategRespProps[]>([]);

  const handleCategoryChange = (value: string) => {
    console.log({ value });

    setSelectedCategory(value);

    if (value) fetchSubCategories(value);
  };

  const fetchSubCategories = useCallback(async (categId: string) => {
    try {
      const response = await getAllSubCategoryApi(categId);

      if (response && response.count > 0) {
        setAllSubCategories(response?.rows);
      } else {
        setAllSubCategories([]);
      }
    } catch (error) {
      console.log("🚀 -----------------------------------------------------🚀");
      console.log("🚀 ~ index.tsx:47 ~ fetchSubCategories ~ error:", error);
      console.log("🚀 -----------------------------------------------------🚀");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllProductCategoryApi();

        if (response && response?.count > 0) {
          setAllCategories(response.rows);
        }
      } catch (error) {
        console.log("🚀 --------------------------------🚀");
        console.log("🚀 ~ category-sub-category-selection index.tsx:64 ~ error:", error);
        console.log("🚀 --------------------------------🚀");

        toast.error("Some error occurred while fetching product categories.");
      }
    })();
  }, []);

  return (
    <>
      <Card
        cardTitle="Category"
        cardTitleWithUnderline
        cardBody={
          <div>
            <div className={cn(TwoColumnGrid, "gap-6 md:gap-4")}>
              <div>
                <div className="group relative">
                  {allCategories.length !== 0 ? (
                    <>
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
                          {allCategories.map((category, index) => {
                            return (
                              <SelectItem value={category.productCategoryId} key={index}>
                                {category.productCategoryName}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </>
                  ) : (
                    <p className="font-della-respira text-center">No Categories Found!.</p>
                  )}
                </div>
              </div>

              <div>
                {selectedCategory !== "" ? (
                  <>
                    <div>
                      <div className="group relative">
                        {allSubCategories.length !== 0 ? (
                          <>
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
                                {allSubCategories.map((category, index) => {
                                  return (
                                    <SelectItem value={category.productSubCategoryId} key={index}>
                                      {category.productSubCategoryName}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </>
                        ) : (
                          <p className="font-della-respira text-center">No Sub Categories Found!.</p>
                        )}
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

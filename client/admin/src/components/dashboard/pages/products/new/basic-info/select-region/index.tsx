import { useEffect, useId, useState, type FC } from "react";

// shadcn/ui Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/shadcn-components/ui/select";

// API
import { getAllProductRegionApi } from "@/api/product-region-api";

// Own Components
import Card from "@/components/library/card";

// UI
import { TwoColumnGrid } from "@/ui";

// types
import { CreateProductFormikProps, ProductRegionTagResProps } from "@/types";

const SelectProdRegion: FC<CreateProductFormikProps> = ({ formik }) => {
  const id = useId();

  const [regionTags, setRegionTags] = useState<ProductRegionTagResProps[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllProductRegionApi();

        if (response && response?.count > 0) {
          setRegionTags(response.rows);
        } else {
          setRegionTags([]);
        }
      } catch (error) {
        console.log("🚀 --------------------------------🚀");
        console.log("🚀 ~ index.tsx:39 (select-region) ~ error:", error);
        console.log("🚀 --------------------------------🚀");
      }
    })();
  }, []);

  return (
    <>
      <Card
        cardTitle="Product Region"
        cardTitleWithUnderline
        cardBody={
          <div className={TwoColumnGrid}>
            <div>
              <div className="group relative">
                <label
                  htmlFor={id}
                  className="bg-background text-foreground font-della-respira absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                >
                  Product Category
                </label>

                <Select
                  onValueChange={values => {
                    formik.setFieldValue("productRegionId", values);
                  }}
                  value={formik.values.productRegionId}
                >
                  <SelectTrigger id={id}>
                    <SelectValue placeholder="Select Product Region" className="font-della-respira" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionTags.map((region, index) => {
                      return (
                        <SelectItem value={region.productRegionTagId} key={index}>
                          {region.regionTagName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div></div>
          </div>
        }
      />
    </>
  );
};

export default SelectProdRegion;

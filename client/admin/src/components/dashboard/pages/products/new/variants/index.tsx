import { useId, useState, type FC } from "react";

// shadcn/ui
import { Tag, TagInput } from "emblor";
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/library/shadcn-components/ui/radio-group";

// OWN Components
import Card from "@/components/library/card";

// UI
import { TwoColumnGrid } from "@/ui";

// utils
import { cn } from "@/utils/cn";

// types
import { CreateProductFormikProps } from "@/types";

// Size Component
import ProductSizeComp from "./product-size";

const VariantsOptions: FC<CreateProductFormikProps> = ({ formik }) => {
  const genderReactId = useId();

  const [colorNewTags, setColorNewTags] = useState<Tag[]>([]);
  const [activeColorTagIndex, setActiveColorTagIndex] = useState<number | null>(null);

  const [newTags, setNewTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const genderItems = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Unisex", label: "Unisex" },
  ];

  return (
    <>
      <Card
        cardTitle="Variants"
        cardTitleWithUnderline
        cardBody={
          <div>
            <div className={TwoColumnGrid}>
              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="colorOptions">Colors</Label>

                  <TagInput
                    id="colorOptions"
                    name="colorOptions"
                    tags={colorNewTags}
                    setTags={newValue => {
                      setColorNewTags(newValue);

                      // `newValue` can be either a Tag[] or a function returning Tag[]
                      const updatedTags = typeof newValue === "function" ? newValue([]) : newValue;

                      formik.setFieldValue(
                        "colorOptions",
                        updatedTags.map(tag => tag.text),
                      );
                    }}
                    placeholder="Add a Color"
                    styleClasses={{
                      inlineTagsContainer:
                        "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
                      input: "w-full min-w-[80px] shadow-none px-2 h-7",
                      tag: {
                        body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 font-della-respira",
                        closeButton:
                          "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                      },
                    }}
                    activeTagIndex={activeColorTagIndex}
                    setActiveTagIndex={setActiveColorTagIndex}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.colorOptions && formik.errors.colorOptions ? <p className="font-della-respira mt-2 text-sm font-semibold text-red-600">{formik.errors.colorOptions}</p> : null}
              </div>

              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="fabricType">Fabric Type</Label>
                  <Input type="text" name="fabricType" id="fabricType" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fabricType} />
                </div>

                {formik.touched.fabricType && formik.errors.fabricType ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.fabricType}</p> : null}
              </div>
            </div>

            <div className={cn(TwoColumnGrid, "mt-8")}>
              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="styleOfFit">Style of Fit</Label>
                  <Input type="text" name="styleOfFit" id="styleOfFit" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.styleOfFit} />
                </div>

                {formik.touched.styleOfFit && formik.errors.styleOfFit ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.styleOfFit}</p> : null}
              </div>

              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="tags">Tags</Label>

                  <TagInput
                    id="tags"
                    name="tags"
                    tags={newTags}
                    setTags={newValue => {
                      setNewTags(newValue);

                      // `newValue` can be either a Tag[] or a function returning Tag[]
                      const updatedTags = typeof newValue === "function" ? newValue([]) : newValue;

                      formik.setFieldValue(
                        "tags",
                        updatedTags.map(tag => tag.text),
                      );
                    }}
                    placeholder="Add Tag"
                    styleClasses={{
                      inlineTagsContainer:
                        "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
                      input: "w-full min-w-[80px] shadow-none px-2 h-7",
                      tag: {
                        body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 font-della-respira",
                        closeButton:
                          "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                      },
                    }}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.tags && formik.errors.tags ? <p className="font-della-respira mt-2 text-sm font-semibold text-red-600">{formik.errors.tags}</p> : null}
              </div>
            </div>

            <div className={cn(TwoColumnGrid, "mt-8")}>
              <div>
                <fieldset className="space-y-4">
                  <legend className="text-foreground text-sm leading-none font-medium">Gender</legend>

                  <RadioGroup
                    className="flex flex-wrap gap-2"
                    onValueChange={value => {
                      formik.setFieldValue("gender", value);
                    }}
                  >
                    {genderItems.map((gender, index) => {
                      return (
                        <div
                          key={`${genderReactId}-${index}`}
                          className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem id={`${genderReactId}-${index}`} value={gender.value} className="after:absolute after:inset-0" />
                            <Label htmlFor={`${genderReactId}-${index}`}>{gender.label}</Label>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </fieldset>

                {formik.touched.gender && formik.errors.gender ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.gender}</p> : null}
              </div>

              <div>
                <ProductSizeComp formik={formik} />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default VariantsOptions;

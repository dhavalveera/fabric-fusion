import { useState, type FC } from "react";

// shadcn/ui
import { Tag, TagInput } from "emblor";
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";

// OWN Components
import Card from "@/components/library/card";
import Editor from "@/components/library/editor";

// UI
import { ThreeColumnGrid } from "@/ui";

// types
import type { CreateProductFormikProps } from "@/types";

const ReturnPolicyComp: FC<CreateProductFormikProps> = ({ formik }) => {
  const [newTags, setNewTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="mt-5">
      <Card
        cardTitle="Return Policy"
        cardTitleWithUnderline
        cardBody={
          <div>
            <div className={ThreeColumnGrid}>
              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="returnDuration">Return Duration</Label>
                  <Input
                    type="number"
                    name="returnPolicy.returnDuration"
                    id="returnDuration"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.returnPolicy.returnDuration}
                    className="no-spinner"
                  />
                </div>

                {formik.touched.returnPolicy?.returnDuration && formik.errors.returnPolicy?.returnDuration ? (
                  <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.returnPolicy?.returnDuration}</p>
                ) : null}
              </div>

              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="returnWindow">Return Window</Label>
                  <Input
                    type="number"
                    name="returnPolicy.returnWindow"
                    id="returnWindow"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.returnPolicy.returnWindow}
                    className="no-spinner"
                  />
                </div>

                {formik.touched.returnPolicy?.returnWindow && formik.errors.returnPolicy?.returnWindow ? (
                  <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.returnPolicy?.returnWindow}</p>
                ) : null}
              </div>

              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor="tags">Conditions</Label>

                  <TagInput
                    id="tags"
                    name="tags"
                    tags={newTags}
                    setTags={newValue => {
                      setNewTags(newValue);

                      // `newValue` can be either a Tag[] or a function returning Tag[]
                      const updatedTags = typeof newValue === "function" ? newValue([]) : newValue;

                      formik.setFieldValue(
                        "returnPolicy.conditions",
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

                {formik.touched.returnPolicy?.conditions && formik.errors.returnPolicy?.conditions ? (
                  <p className="font-della-respira mt-2 text-sm font-semibold text-red-600">{formik.errors.returnPolicy?.conditions}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <p className="font-della-respira mb-2">Policy Information</p>

              <Editor
                defaultValue="Type Return Policy Here...."
                onChange={content => {
                  formik.setFieldValue("returnPolicy.policyInformation", content);
                }}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ReturnPolicyComp;

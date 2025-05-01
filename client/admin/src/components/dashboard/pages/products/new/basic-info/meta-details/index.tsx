import { useId, useState, type FC } from "react";

// shadcn/ui
import { Tag, TagInput } from "emblor";
import { useCharacterLimit } from "@/components/library/shadcn-components/hooks/use-character-limit";
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";

// OWN Components
import Card from "@/components/library/card";

// UI
import { ThreeColumnGrid } from "@/ui";

// types
import { CreateProductFormikProps } from "@/types";

const MetaDetails: FC<CreateProductFormikProps> = ({ formik }) => {
  const metaTitleId = useId();
  const metaDescId = useId();
  const metaKeywordsId = useId();

  const { characterCount: metaTitleCharacterCount, handleChange: metaTitleHandleChange, maxLength: metaTitleLimit = 65 } = useCharacterLimit({ maxLength: 65, initialValue: formik.values.metaTitle });

  const {
    characterCount: metaDescCharacterCount,
    handleChange: metaDescHandleChange,
    maxLength: metaDescLimit = 155,
  } = useCharacterLimit({ maxLength: 155, initialValue: formik.values.metaDescription });

  const [newTags, setNewTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <>
      <Card
        cardTitle="Meta Details"
        cardTitleWithUnderline
        cardBody={
          <div>
            <div className={ThreeColumnGrid}>
              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor={metaTitleId}>Meta Title</Label>

                    <div className="relative">
                      <Input
                        id={metaTitleId}
                        name="metaTitle"
                        className="peer pe-14"
                        type="text"
                        value={formik.values.metaTitle}
                        maxLength={65}
                        onChange={e => {
                          formik.setFieldValue("metaTitle", e.target.value);
                          metaTitleHandleChange(e);
                        }}
                        aria-describedby={`${metaTitleId}-metaTitle`}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        id={`${metaTitleId}-metaTitle`}
                        className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums peer-disabled:opacity-50"
                        aria-live="polite"
                        role="status"
                      >
                        {metaTitleCharacterCount} / {metaTitleLimit}
                      </div>
                    </div>

                    {formik.touched.metaTitle && formik.errors.metaTitle ? <p className="font-della-respira mt-2 text-sm font-semibold text-red-600">{formik.errors.metaTitle}</p> : null}
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor={metaDescId}>Meta Description</Label>

                    <div className="relative">
                      <Input
                        id={metaDescId}
                        name="metaDescription"
                        className="peer pe-14"
                        type="text"
                        value={formik.values.metaDescription}
                        maxLength={65}
                        onChange={e => {
                          formik.setFieldValue("metaDescription", e.target.value);
                          metaDescHandleChange(e);
                        }}
                        aria-describedby={`${metaDescId}-metaDescription`}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        id={`${metaDescId}-metaTitle`}
                        className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums peer-disabled:opacity-50"
                        aria-live="polite"
                        role="status"
                      >
                        {metaDescCharacterCount} / {metaDescLimit}
                      </div>
                    </div>

                    {formik.touched.metaDescription && formik.errors.metaDescription ? (
                      <p className="font-della-respira mt-2 text-sm font-semibold text-red-600">{formik.errors.metaDescription}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor={metaKeywordsId}>Meta Keywords</Label>

                  <TagInput
                    id={metaKeywordsId}
                    name="metaKeywords"
                    tags={newTags}
                    setTags={newValue => {
                      setNewTags(newValue);

                      // `newValue` can be either a Tag[] or a function returning Tag[]
                      const updatedTags = typeof newValue === "function" ? newValue([]) : newValue;

                      formik.setFieldValue(
                        "metaKeywords",
                        updatedTags.map(tag => tag.text),
                      );
                    }}
                    placeholder="Add a Keyword"
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

                {formik.touched.metaKeywords && formik.errors.metaKeywords ? <p className="font-della-respira mt-2 text-sm font-semibold text-red-600">{formik.errors.metaKeywords}</p> : null}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default MetaDetails;

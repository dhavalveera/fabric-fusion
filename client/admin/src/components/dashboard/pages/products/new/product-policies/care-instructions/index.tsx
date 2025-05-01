import type { FC } from "react";

// shadcn/ui
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";

// OWN Components
import Card from "@/components/library/card";

// utils
import { cn } from "@/utils/cn";

// UI
import { TwoColumnGrid } from "@/ui";

// types
import type { CreateProductFormikProps } from "@/types";

const CareInstructionComp: FC<CreateProductFormikProps> = ({ formik }) => {
  return (
    <>
      <Card
        cardTitle="Care Instruction"
        cardTitleWithUnderline
        cardBody={
          <div>
            <div className={TwoColumnGrid}>
              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="bleachingInstructions">Bleaching Instruction</Label>
                    <Input
                      type="text"
                      name="careInstruction.bleachingInstructions"
                      id="bleachingInstructions"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.careInstruction.bleachingInstructions}
                    />
                  </div>
                  {formik.touched.careInstruction?.bleachingInstructions && formik.errors.careInstruction?.bleachingInstructions ? (
                    <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.careInstruction?.bleachingInstructions}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="dryCleaningInstructions">Dry Cleaning Instruction</Label>
                    <Input
                      type="text"
                      name="careInstruction.dryCleaningInstructions"
                      id="dryCleaningInstructions"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.careInstruction.dryCleaningInstructions}
                    />
                  </div>
                  {formik.touched.careInstruction?.dryCleaningInstructions && formik.errors.careInstruction?.dryCleaningInstructions ? (
                    <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.careInstruction?.dryCleaningInstructions}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className={cn(TwoColumnGrid, "mt-5")}>
              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="dryingInstructions">Drying Instruction</Label>
                    <Input
                      type="text"
                      name="careInstruction.dryingInstructions"
                      id="dryingInstructions"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.careInstruction.dryingInstructions}
                    />
                  </div>
                  {formik.touched.careInstruction?.dryingInstructions && formik.errors.careInstruction?.dryingInstructions ? (
                    <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.careInstruction?.dryingInstructions}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="ironingInstructions">Ironing Instruction</Label>
                    <Input
                      type="text"
                      name="careInstruction.ironingInstructions"
                      id="ironingInstructions"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.careInstruction.ironingInstructions}
                    />
                  </div>
                  {formik.touched.careInstruction?.ironingInstructions && formik.errors.careInstruction?.ironingInstructions ? (
                    <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.careInstruction?.ironingInstructions}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className={cn(TwoColumnGrid, "mt-5")}>
              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="storageInstructions">Storage Instruction</Label>
                    <Input
                      type="text"
                      name="careInstruction.storageInstructions"
                      id="storageInstructions"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.careInstruction.storageInstructions}
                    />
                  </div>
                  {formik.touched.careInstruction?.storageInstructions && formik.errors.careInstruction?.storageInstructions ? (
                    <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.careInstruction?.storageInstructions}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="washingInstructions">Washing Instruction</Label>
                    <Input
                      type="text"
                      name="careInstruction.washingInstructions"
                      id="washingInstructions"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.careInstruction.washingInstructions}
                    />
                  </div>
                  {formik.touched.careInstruction?.washingInstructions && formik.errors.careInstruction?.washingInstructions ? (
                    <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.careInstruction?.washingInstructions}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default CareInstructionComp;

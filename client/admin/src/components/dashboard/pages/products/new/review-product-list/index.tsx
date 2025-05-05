import type { FC } from "react";

// OWN Components
import { BentoGrid } from "@/components/library/bento-grid";
import Card from "@/components/library/card";
import DescriptionList from "@/components/library/description-list";
import DescriptionListItem from "@/components/library/description-list/item";
import Image from "@/components/library/image";

// utils
import { capitalizeWords } from "@/utils/capitalize-words";

// types
import type { CreateProductFormikProps } from "@/types";

// Function to check if all the Return Policy values are empty or not.
import { isReturnPolicyEmpty } from "./is-return-policy-empty";

const ProductFinalReview: FC<CreateProductFormikProps> = ({ formik }) => {
  return (
    <>
      <div className="rounded-md py-2">
        {/* Card Header */}
        <div className="flex flex-wrap items-stretch justify-between bg-transparent p-2">
          {/* Card Title */}
          <div className="font-della-respira m-2 flex items-center text-2xl font-medium text-[#071437] underline">
            <h2>Review</h2>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <BentoGrid>
          {/* Basic Product Details */}
          <BentoGrid.Block className="col-span-12 row-span-2 md:col-span-6">
            <Card
              cardTitle="Basic Details"
              cardTitleWithUnderline={false}
              cardBody={
                <div>
                  <DescriptionList>
                    <DescriptionListItem title="Product Name">{formik.values.productName}</DescriptionListItem>

                    <DescriptionListItem title="Product Description">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: formik.values.productDescription,
                        }}
                      />
                    </DescriptionListItem>

                    <DescriptionListItem title="Product Price">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(formik.values.productPrice))}</DescriptionListItem>

                    <DescriptionListItem title="GST Percentage">{Number(formik.values.gstPercentage)} %</DescriptionListItem>

                    <DescriptionListItem title="Meta Title">{formik.values.metaTitle}</DescriptionListItem>

                    <DescriptionListItem title="Meta Description">{formik.values.metaDescription}</DescriptionListItem>

                    <DescriptionListItem title="Meta Keywords">{formik.values.metaKeywords.join(", ")}</DescriptionListItem>
                  </DescriptionList>
                </div>
              }
            />
          </BentoGrid.Block>

          {/* Product Variants Details */}
          <BentoGrid.Block className="col-span-12 md:col-span-6">
            <Card
              cardTitle="Variant Details"
              cardTitleWithUnderline={false}
              cardBody={
                <div>
                  <DescriptionList>
                    <DescriptionListItem title="Product Colors">{formik.values.colorOptions.join(", ")}</DescriptionListItem>

                    <DescriptionListItem title="Fabric Type">{formik.values.fabricType}</DescriptionListItem>

                    <DescriptionListItem title="Syle of Fit">{formik.values.styleOfFit}</DescriptionListItem>

                    <DescriptionListItem title="Tags">{formik.values.tags.join(", ")}</DescriptionListItem>

                    <DescriptionListItem title="Gender">{capitalizeWords(formik.values.gender)}</DescriptionListItem>

                    <DescriptionListItem title="Size & Stock">
                      {formik.values.productSize.map((sizeStock, index) => {
                        return <p key={index}>{`${sizeStock.size} -- ${sizeStock.totalStock}`}</p>;
                      })}
                    </DescriptionListItem>
                  </DescriptionList>
                </div>
              }
            />
          </BentoGrid.Block>

          {/* Product Image */}
          <BentoGrid.Block className="col-span-12 leading-snug">
            <Card
              cardTitle="Product Image"
              cardTitleWithUnderline={false}
              cardBody={
                <div>
                  <DescriptionList>
                    <DescriptionListItem title="Product Thumbnail Image">
                      <Image src={formik.values.productDisplayImage} alt={formik.values.productName} className="size-64 object-contain" />
                    </DescriptionListItem>
                  </DescriptionList>
                </div>
              }
            />
          </BentoGrid.Block>

          {/* Care Instruction */}
          <BentoGrid.Block className="col-span-12 row-span-2 leading-snug md:col-span-6">
            <Card
              cardTitle="Care Instruction"
              cardTitleWithUnderline={false}
              cardBody={
                <div>
                  <DescriptionList>
                    {Object.values(formik.values.careInstruction).every(value => value.trim() !== "") ? (
                      <div>
                        <DescriptionListItem title="Bleaching Instructions">{formik.values.careInstruction.bleachingInstructions}</DescriptionListItem>

                        <DescriptionListItem title="Dry Cleaning Instructions">{formik.values.careInstruction.dryCleaningInstructions}</DescriptionListItem>

                        <DescriptionListItem title="Drying Instructions">{formik.values.careInstruction.dryingInstructions}</DescriptionListItem>

                        <DescriptionListItem title="Ironing Instructions">{formik.values.careInstruction.ironingInstructions}</DescriptionListItem>

                        <DescriptionListItem title="Storage Instructions">{formik.values.careInstruction.storageInstructions}</DescriptionListItem>

                        <DescriptionListItem title="Washing Instructions">{formik.values.careInstruction.washingInstructions}</DescriptionListItem>
                      </div>
                    ) : (
                      <DescriptionListItem title="Care Instruction">No Care Instruction Added!.</DescriptionListItem>
                    )}
                  </DescriptionList>
                </div>
              }
            />
          </BentoGrid.Block>

          {/* Return Policy */}
          <BentoGrid.Block className="col-span-12 row-span-2 leading-snug md:col-span-6">
            <Card
              cardTitle="Return Policy"
              cardTitleWithUnderline={false}
              cardBody={
                <div>
                  <DescriptionList>
                    {isReturnPolicyEmpty(formik.values.returnPolicy) ? (
                      <DescriptionListItem title="Return Policy">No Return Policy Added!.</DescriptionListItem>
                    ) : (
                      <div>
                        <DescriptionListItem title="Return Policy Conditions">{capitalizeWords(formik.values.returnPolicy.conditions.join(", "))}</DescriptionListItem>

                        <DescriptionListItem title="Return Duration">{formik.values.returnPolicy.returnDuration}</DescriptionListItem>

                        <DescriptionListItem title="Return Window">{formik.values.returnPolicy.returnWindow}</DescriptionListItem>

                        <DescriptionListItem title="Ironing Instructions">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formik.values.returnPolicy.policyInformation,
                            }}
                          />
                        </DescriptionListItem>
                      </div>
                    )}
                  </DescriptionList>
                </div>
              }
            />
          </BentoGrid.Block>
        </BentoGrid>
      </div>
    </>
  );
};

export default ProductFinalReview;

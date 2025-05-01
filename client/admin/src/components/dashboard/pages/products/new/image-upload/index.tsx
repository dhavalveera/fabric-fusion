import type { FC } from "react";

// DRY
import FileUpload from "@/components/library/file-upload";
import Card from "@/components/library/card";

// types
import type { CreateProductFormikProps } from "@/types";
import { FileMetadata } from "@/components/library/shadcn-components/hooks/use-file-upload";

const ThumbnailProductImage: FC<CreateProductFormikProps> = ({ formik }) => {
  const handleThumbnailUpload = (file: File | FileMetadata | null) => {
    console.log({ file });

    const imageUrl = "https://m.media-amazon.com/images/I/81ird6ruikL._AC_UY1100_.jpg";

    formik.setFieldTouched("productDisplayImage", true);

    formik.setFieldValue("productDisplayImage", imageUrl);
  };

  return (
    <>
      <Card
        cardTitle="Thumbnail"
        cardTitleWithUnderline
        cardBody={
          <div className="p-2">
            <FileUpload onChange={handleThumbnailUpload} />

            {formik.touched.productDisplayImage && formik.errors.productDisplayImage && <p className="font-della-respira mt-1 text-xs text-red-500">{formik.errors.productDisplayImage}</p>}
          </div>
        }
      />
    </>
  );
};

export default ThumbnailProductImage;

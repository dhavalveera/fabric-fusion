import { useState, type FC } from "react";

// DRY
import FileUpload from "@/components/library/file-upload";
import Card from "@/components/library/card";
import Image from "@/components/library/image";

// types
import type { CreateProductFormikProps } from "@/types";

const ThumbnailProductImage: FC<CreateProductFormikProps> = ({ formik }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleThumbnailUpload = (file: File | null) => {
    setUploadedImage(file);

    const imageUrl = "https://m.media-amazon.com/images/I/81ird6ruikL._AC_UY1100_.jpg";

    formik.setFieldValue("productDisplayImage", imageUrl);
  };

  return (
    <>
      <Card
        cardTitle="Thumbnail"
        cardBody={
          <div className="p-2">
            <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-[40%]">
                {uploadedImage ? (
                  <div className="flex w-full items-center justify-center">
                    <div className="size-1/4">
                      <Image src={URL.createObjectURL(uploadedImage)} alt="Fabric Fusion" />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="w-full md:w-[60%]">
                <FileUpload onChange={handleThumbnailUpload} />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default ThumbnailProductImage;

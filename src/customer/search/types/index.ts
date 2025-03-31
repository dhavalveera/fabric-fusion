export type SearchProductType = {
  productDetailsId: string;
  productName: string;
  productDescription: string;
  brandName: string;
  productPrice: number;
  productDisplayImage: string;
  productSubCategoryFk: {
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    productSubCategoryId: string;
    productSubCategoryName: string;
    productSubCategoryImage: string;
    productCategoryFk: {
      isDeleted: boolean;
      createdAt: Date;
      updatedAt: Date;
      productCategoryId: string;
      productCategoryName: string;
      productCategoryImage: string;
    };
  };
};

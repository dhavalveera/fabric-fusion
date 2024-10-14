import { ProductDetailsModel } from "../models/product.model";

export interface FindAllProducts {
  rows: ProductDetailsModel[];
  count: number;
}

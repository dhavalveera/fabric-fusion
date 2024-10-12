// Model
import { ProductSubCategory } from "../models/sub-category.model";

export interface FindAllSubCategReturnType {
  subCategories: ProductSubCategory[];
  subCategoriesCount: number;
}

// Model
import { ProductSubCategory } from "../models/sub-category.model";

export interface FindAllSubCategReturnType {
  rows: ProductSubCategory[];
  count: number;
}

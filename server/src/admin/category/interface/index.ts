// Model
import { ProductCategory } from "../models/category.model";

export interface FindAllReturnType {
  rows: ProductCategory[];
  count: number;
}

// export interface AdminUserInRequest {
//   adminId: string;
//   email: string;
//   name: string;
//   accountType: string;
//   iat: number;
//   exp: number;
// }

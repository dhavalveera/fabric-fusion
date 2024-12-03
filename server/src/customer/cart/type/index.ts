import { CartsModel } from "../entities/cart.entity";

export interface GetAllCartItems extends CartsModel {
  inStock: boolean;
}

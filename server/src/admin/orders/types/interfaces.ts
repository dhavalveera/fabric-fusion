import { OrderDetailsModel } from "../entities/order.entity";

export type OrderStatusType = "pending" | "processing" | "cancelled" | "completed";

export interface FindAllResp {
  rows: OrderDetailsModel[];
  count: number;
}

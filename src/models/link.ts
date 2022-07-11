import { Order } from "./Order";

export interface Link {
  id: number;
  code: string;
  orders: Order[];
}

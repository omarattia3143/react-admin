import { OrderItem } from "./OrderItem";

export interface Order {
  id: number;
  full_name: string;
  email: string;
  total: number;
  order_items: OrderItem[];
}

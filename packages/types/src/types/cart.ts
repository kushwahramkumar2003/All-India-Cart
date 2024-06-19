import { Product, User } from "./user";

export type Cart = {
  id: string;
  userId: string;
  user: User;
  items: CartItem[];
  totalPrice: Float64Array;
};

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  product: Product;
  quantity: number;
};

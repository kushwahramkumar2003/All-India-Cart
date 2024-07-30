// src/state/cartState.ts

import { atom, selector } from "recoil";
import axios from "axios";
import { Cart, Product } from "@repo/types";

// Define the type for CartItem

// Define the Cart State Atom
export const cartState = atom<Cart | null>({
  key: "cartState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

// Selector to get the total price
export const cartTotalSelector = selector<number>({
  key: "cartTotalSelector",
  get: ({ get }) => {
    const cart = get(cartState);
    if (!cart) return 0;
    return cart.items.reduce(
      (total, item) => total + item.product.unitPrice * item.quantity,
      0,
    );
  },
});

export const fetchCartToDb = selector<Cart>({
  key: "cartInDb",
  get: async ({ get }) => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1");
      const cart: Cart = data.cart;
      return cart;
    } catch (error) {
      console.error("Error occur while fetching store");
      throw error;
    }
  },
});

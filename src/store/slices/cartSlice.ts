import { createSlice } from "@reduxjs/toolkit";
import type { Cart, CartItem } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../utils";

const initialState: Cart = loadFromLocalStorage("cart");

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{ productName: string; item: CartItem }>
    ) => {
      const { productName, item } = action.payload;

      if (!state[productName]) {
        state[productName] = {
          items: [],
          metadata: {
            totalPrice: 0,
            totalQuantity: 0,
          },
        };
      }

      const productCart = state[productName];
      const existingItem = productCart.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        productCart.items.push(item);
      }

      productCart.metadata.totalQuantity += item.quantity;
      productCart.metadata.totalPrice += item.price * item.quantity;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeItemFromCart: (
      state,
      action: PayloadAction<{
        productName: string;
        itemId: number;
        quantity: number;
      }>
    ) => {
      const { productName, itemId, quantity } = action.payload;

      const productCart = state[productName];
      if (!productCart) return;

      const itemToRemove = productCart.items.find((item) => item.id === itemId);
      if (itemToRemove) {
        itemToRemove.quantity -= quantity;

        productCart.metadata.totalQuantity -= quantity;
        productCart.metadata.totalPrice -= quantity * itemToRemove.price;

        if (itemToRemove.quantity <= 0) {
          productCart.items = productCart.items.filter((item) => item.id !== itemId);
        }
      }

      if (productCart.items.length === 0) {
        delete state[productName];
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearProductCart: (state, action: PayloadAction<string>) => {
      const gameName = action.payload;
      delete state[gameName];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: () => {
      localStorage.removeItem("cart");
      return initialState;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearProductCart, clearCart } = cartSlice.actions;

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
      action: PayloadAction<{ gameName: string; item: CartItem }>
    ) => {
      const { gameName, item } = action.payload;

      if (!state[gameName]) {
        state[gameName] = {
          items: [],
          metadata: {
            totalPrice: 0,
            totalQuantity: 0,
          },
        };
      }

      const gameCart = state[gameName];
      const existingItem = gameCart.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        gameCart.items.push(item);
      }

      gameCart.metadata.totalQuantity += item.quantity;
      gameCart.metadata.totalPrice += item.price * item.quantity;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeItemFromCart: (
      state,
      action: PayloadAction<{
        gameName: string;
        itemId: number;
        quantity: number;
      }>
    ) => {
      const { gameName, itemId, quantity } = action.payload;

      const gameCart = state[gameName];
      if (!gameCart) return;

      const itemToRemove = gameCart.items.find((item) => item.id === itemId);
      if (itemToRemove) {
        itemToRemove.quantity -= quantity;

        gameCart.metadata.totalQuantity -= quantity;
        gameCart.metadata.totalPrice -= quantity * itemToRemove.price;

        if (itemToRemove.quantity <= 0) {
          gameCart.items = gameCart.items.filter((item) => item.id !== itemId);
        }
      }

      if (gameCart.items.length === 0) {
        delete state[gameName];
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearGameCart: (state, action: PayloadAction<string>) => {
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

export const { addItemToCart, removeItemFromCart, clearGameCart, clearCart } = cartSlice.actions;

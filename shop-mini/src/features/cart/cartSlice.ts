import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';
import type { RootState } from '../../app/store';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

export const selectTotalQuantity = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: RootState): number =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;

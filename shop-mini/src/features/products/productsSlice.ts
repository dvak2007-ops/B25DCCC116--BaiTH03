import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      return rejectWithValue(`Lỗi HTTP: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Không thể tải danh sách sản phẩm';
    return rejectWithValue(message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Đã xảy ra lỗi không xác định';
      });
  },
});

export default productsSlice.reducer;
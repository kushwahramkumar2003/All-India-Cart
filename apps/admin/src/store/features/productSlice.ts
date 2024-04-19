import { createNewProduct } from '@/services/product';
import { RootState } from '@/store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import z from 'zod';

import { ProductSchema } from '@/components/dashboard/products/new/new-product-form';

interface ProductState {
  name: string;
  description: string;
  supplierId: string;
  categoryId: string;
  quantityPerUnit: number;
  unitPrice: number;
  unitInStock: boolean;
  msrp: boolean;
  availableSize: string[];
  availableColors: string[];
  size: string;
  color: string;
  discount: number;
  unitWeight: number;
  reorderLevel: number;
  productAvailable: boolean;
  pictures: string[];
}
export interface ProductsState {
  products: ProductState[];
  status: string;
  error: string;
}
const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: '',
};

export const CreateNewProduct: any = createAsyncThunk('product', async (data: z.infer<typeof ProductSchema>) => {
  try {
    const res = await createNewProduct(data);
    console.log('response of CreateNewProduct ', res);
    return res;
  } catch (error) {
    console.error('error occur ', error);
  }
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateNewProduct.pending, (state) => {
        console.info('state --> ', state);
        state.status = 'loading';
      })
      .addCase(CreateNewProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('action.payload ', action.payload);
      })
      .addCase(CreateNewProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const {} = productSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const createNewProductStatus = (state: RootState) => state.products.status;
export const createNewProductError = (state: RootState) => state.products.error;

export default productSlice.reducer;

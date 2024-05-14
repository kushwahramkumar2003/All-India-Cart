// Define a type for the slice state
import { login } from '@/services/auth';
import { createNewProduct } from '@/services/product';
import { CreateNewProduct } from '@/store/features/productSlice';
import { RootState } from '@/store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import z from 'zod';

import { ProductSchema } from '@/components/dashboard/products/new/new-product-form';

interface User {
  email: string;
  name: string;
  companyName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
  homePage: string;
  url: string;
  picture: string;
  ranking: number;
}
export interface AuthState {
  isLoggedIn: boolean;
  status: string;
  user: User | null;
  error: string;
}

// Define the initial state using that type
export const initialState: AuthState = {
  isLoggedIn: false,
  status: 'idle',
  user: null,
  error: '',
};

export const loginUser: any = createAsyncThunk('auth/seller/login', async (data: z.infer<typeof ProductSchema>) => {
  try {
    const res = await login(data);
    console.log('response of login ', res);
    return res;
  } catch (error) {
    console.error('error occur ', error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'idle';
      state.isLoggedIn = false;
      state.user = null;
    },
    setUserInfo: (state, payload) => {
      console.log('setUserInfo state -> ', state);
      console.log('setUserInfo payload -> ', payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.info('state --> ', state);
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('action.payload ', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export const { setUserInfo } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export const loginStatus = (state: RootState) => state.products.status;
export const loginError = (state: RootState) => state.products.error;

export default userSlice.reducer;

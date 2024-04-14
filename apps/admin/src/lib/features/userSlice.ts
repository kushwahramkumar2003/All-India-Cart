import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/lib/store';

// Define a type for the slice state
export interface AuthState {
  isLoggedIn: boolean;
  status: string;
  name: string;
  company: string;
  picture: string;
  phone: string;
  email: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  status: 'idle',
  name: '',
  company: '',
  picture: '',
  email: '',
  phone: '',
};

export const counterSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.name = '';
      state.company = '';
      state.phone = '';
      state.picture = '';
      state.email = '';
      state.phone = '';
      state.isLoggedIn = false;
    },
  },
});

export const { logout } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default counterSlice.reducer;

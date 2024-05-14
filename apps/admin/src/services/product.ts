import axiosClient from '@/services/index';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';

import { ProductSchema } from '@/components/dashboard/products/new/new-product-form';

export const createNewProduct = async (data: z.infer<typeof ProductSchema>) => {
  try {
    console.log('Axios call data --> ', data);
    const response = await axiosClient.post('/product', data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log('Axios error:', error.message);
      console.log('Axios error:', error);

      if (error.response?.data) {
        throw new Error(error.response?.data.message);
      }
      throw new Error(error.message);
    }
    console.log('Unknown error:', error);
  }
};

import axiosClient from '@/services/index';
import axios from 'axios';
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

export const getAllSupplireProducts = async ({ query }: { query: string }) => {
  try {
    const response = await axiosClient.get(`/product/supplier?name=${query}`);
    return response.data.products;
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

export const deleteProduct = async ({ productId }: { productId: string }) => {
  try {
    console.log('Axios call productId --> ', productId);
    const response = await axiosClient.delete(`/product/${productId}`);
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

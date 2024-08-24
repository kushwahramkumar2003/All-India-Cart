'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@repo/types';
import axios from 'axios';

import { getAllSupplierProducts } from '@/actions/prodoctActions';
import { DataTable } from '@/components/dashboard/products/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllSupplierProducts({ searchQuery: search });
      //@ts-ignore
      setProducts(response.data);
    } catch (err) {
      setError('Error fetching data from the server.');
      toast({ title: 'Error', description: 'Error fetching data from the server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const searchHandler = async () => {
    await fetchProducts();
  };

  return (
    <div>
      <div className={'flex flex-row justify-between mb-4'}>
        <Button
          onClick={() => {
            router.push('/dashboard/products/new');
          }}
        >
          Add new Product
        </Button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchHandler();
          }}
          className={'flex flex-row gap-2'}
        >
          <Input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={'Search product'}
            className={'border-2 border-primary focus:outline-none outline-none focus-visible:outline-none'}
          />
          <Button type="submit">Search Product</Button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center items-center w-full h-full">
          <div role="status" className="flex flex-col justify-center items-center text-center">
            <svg
              aria-hidden="true"
              className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Error</div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{error}</p>
          </div>
        </div>
      )}

      {products && !loading && !error && <DataTable products={products} refetch={fetchProducts} />}
    </div>
  );
}

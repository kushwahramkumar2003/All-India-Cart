'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchForm(): React.JSX.Element {
  const router = useRouter();
  return (
    <div className={'flex flex-row justify-between'}>
      <Button
        onClick={() => {
          router.push('/dashboard/products/new');
        }}
      >
        Add new Product
      </Button>

      <form action="" className={'flex flex-row gap-2'}>
        <Input
          type="text"
          placeholder={'Search product'}
          className={'border-2 border-primary focus:outline-none outline-none focus-visible:outline-none'}
        />
        <Button>Search Product</Button>
      </form>
    </div>
  );
}

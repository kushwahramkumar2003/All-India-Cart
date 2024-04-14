import React from 'react';

import NewProductForm from '@/components/dashboard/products/new/new-product-form';

export default function Page(): React.JSX.Element {
  return (
    <div className={'flex flex-col justify-center items-center'}>
      <div>
        <h1 className={'text-4xl text-primary font-bold'}>Add New Product</h1>
        <NewProductForm />
      </div>
    </div>
  );
}

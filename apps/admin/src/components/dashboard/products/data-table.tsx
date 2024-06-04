import React from 'react';
import { Product } from '@repo/types';

import { TableDataRow } from '@/components/dashboard/products/product-table-row';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function DataTable({ products, refetch }: { products: Product[]; refetch: any }): React.JSX.Element {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((prod) => {
            return <TableDataRow product={prod} key={prod.id} refetch={refetch} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
}

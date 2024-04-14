import React from 'react';

import { TableDataRow } from '@/components/dashboard/products/product-table-row';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const products = [
  {
    name: 'Laptop',
    category: 'Electronics',
    units: 50,
    price: 800,
    discount: 10,
    ordered: 20,
    id: 'ABC123',
  },
  {
    name: 'Sneakers',
    category: 'Apparel',
    units: 100,
    price: 50,
    discount: 5,
    ordered: 40,
    id: 'DEF456',
  },
  {
    name: 'Headphones',
    category: 'Electronics',
    units: 30,
    price: 100,
    discount: 15,
    ordered: 10,
    id: 'GHI789',
  },
  {
    name: 'T-shirt',
    category: 'Apparel',
    units: 200,
    price: 20,
    discount: 0,
    ordered: 80,
    id: 'JKL012',
  },
  {
    name: 'Smartphone',
    category: 'Electronics',
    units: 80,
    price: 600,
    discount: 8,
    ordered: 30,
    id: 'MNO345',
  },
];

export function DataTable(): React.JSX.Element {
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
            return <TableDataRow {...prod} key={prod.id} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
}

import React from 'react';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface TableRowProp {
  name: string;
  category: string;
  units: number;
  price: number;
  discount: number;
  ordered: number;
  id: string;
}
export function TableDataRow({ name, category, units, price, discount, ordered, id }: TableRowProp): React.JSX.Element {
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{units}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{discount}</TableCell>
      <TableCell>{ordered}</TableCell>
      <TableCell className={'flex flex-row gap-4'}>
        <Button variant={'default'}>Edit</Button>
        <Button variant={'destructive'}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}

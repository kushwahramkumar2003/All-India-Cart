import React from 'react';
import { resolveAppleWebApp } from 'next/dist/lib/metadata/resolvers/resolve-basics';
import { useRouter } from 'next/navigation';
import { Product } from '@repo/types';
import { useMutation } from '@tanstack/react-query';

import { deleteProduct } from '@/actions/prodoctActions';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

interface TableRowProp {
  name: string;
  category: string;
  units: number;
  price: number;
  discount: number;
  ordered: number;
  id: string;
}
export function TableDataRow({ product, refetch }: { product: Product; refetch: any }): React.JSX.Element {
  const { toast } = useToast();
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);

  const deleteHandler = async () => {
    setDeleting(true);
    try {
      const res = await deleteProduct({ id: product.id });

      if (res.status === 'success') {
        toast({
          title: res.message,
        });
        refetch();
      } else {
        toast({
          title: res.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error in deleting product!!!',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };
  const editHandler = () => {
    router.push(`/dashboard/products/edit/${product.id}`);
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>{product.quantityPerUnit}</TableCell>
      <TableCell>{product.unitPrice}</TableCell>
      <TableCell>{product.discount}</TableCell>
      <TableCell>{product.unitInStock}</TableCell>
      <TableCell className={'flex flex-row gap-4'}>
        <Button variant={'default'} onClick={editHandler}>
          Edit
        </Button>
        <Button
          className={'disabled:opacity-30 disabled:cursor-not-allowed'}
          disabled={deleting}
          variant={'destructive'}
          onClick={() => {
            deleteHandler();
          }}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </TableCell>
    </TableRow>
  );
}

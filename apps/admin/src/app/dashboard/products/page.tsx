import * as React from 'react';

import { DataTable } from '@/components/dashboard/products/data-table';
import { SearchForm } from '@/components/dashboard/products/searchForm';

export default function Page(): React.JSX.Element {
  return (
    <div>
      <SearchForm />
      <DataTable />
    </div>
  );
}

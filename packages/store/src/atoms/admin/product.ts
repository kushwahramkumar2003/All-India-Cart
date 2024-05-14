import { atom } from "recoil";

interface ProductState {
  name: string;
  description: string;
  supplierId: string;
  categoryId: string;
  quantityPerUnit: number;
  unitPrice: number;
  unitInStock: boolean;
  msrp: boolean;
  availableSize: string[];
  availableColors: string[];
  size: string;
  color: string;
  discount: number;
  unitWeight: number;
  reorderLevel: number;
  productAvailable: boolean;
  pictures: string[];
}

export interface ProductsState {
  products: ProductState[];
  status: string;
  error: string;
}

export const productAtom = atom<null | ProductsState>({
  key: "productsAtom",
  default: null,
});

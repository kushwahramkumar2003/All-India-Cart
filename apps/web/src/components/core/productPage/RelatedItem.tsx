"use client";
import { getProductsViaCategory } from "@/actions/productActions";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@prisma/client";

import { useEffect, useState } from "react";

const RelatedItem = ({ categoryId }: { categoryId: string }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsViaCategory(categoryId);
      setProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  console.log("product", products);
  return (
    <div className={"flex flex-col"}>
      <div>
        <div className={"flex flex-row justify-start  items-center gap-4 mb-4"}>
          <span
            className={"bg-[#DB4444] h-6 w-3 rounded-sm shadow-slate-600"}
          />
          <p className={"text-md text-[#DB4444]"}>Related Item</p>
        </div>
      </div>

      {loading && (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="bg-gray-300 h-96 w-full rounded-md" />
          <div className="bg-gray-300 h-96 w-full rounded-md" />
          <div className="bg-gray-300 h-96 w-full rounded-md" />
        </div>
      )}
      <div
        className={"gap-2 mt-12 flex flex-row overflow-y-scroll hide-scrollbar"}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            unitPrice={product.unitPrice}
            discount={product.discount}
            picture={product.picture}
            className="w-72"
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedItem;

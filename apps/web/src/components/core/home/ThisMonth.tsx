"use client";

import { Button } from "../../ui/button";
import ProductCard from "../../common/ProductCard";
import { Product } from "@repo/types";
import { useState } from "react";

const ThisMonth = ({ productArr }: { productArr: Product[] }) => {
  const [productStateArr, setProductStateArr] = useState<Product[]>(productArr);
  function getRecentProducts(
    products: Product[],
    count: number = 5,
  ): Product[] {
    return products
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, count);
  }

  const products = getRecentProducts(productStateArr);
  return (
    <div className={"flex flex-col"}>
      <div>
        <div className={"flex flex-row justify-start  items-center gap-4 mb-4"}>
          <span
            className={"bg-[#DB4444] h-6 w-3 rounded-sm shadow-slate-600"}
          />
          <p className={"text-md text-[#DB4444]"}>This month</p>
        </div>
        <div className={"flex flex-row justify-between flex-wrap"}>
          <div className={"flex flex-row gap-16 flex-wrap"}>
            <p className={"text-3xl font-semibold "}>Flash Sales</p>
          </div>
          <Button className={"bg-[#DB4444] w-max hover:bg-red-400"}>
            View All Products
          </Button>
        </div>
      </div>
      <div className={"flex flex-row justify-center items-center"}>
        <span className={"w-6 h-[2px] bg-[#DB4444]"} />
      </div>
      <div
        className={
          "grid md:grid-cols-3 gap-8 mt-12  xmd:grid-cols-2 sm:grid-cols-1"
        }
      >
        {products.map((product: Product) => {
          return (
            <ProductCard
              name={product.name}
              unitPrice={product.unitPrice}
              discount={product.discount}
              picture={product.picture}
              id={product.id}
              wishlist={true}
              // newProduct={true}
              addToCart={true}
              off={true}
              star={true}
            />
          );
        })}
      </div>
      <div className="flex flex-row justify-center items-center text-center mt-10"></div>
    </div>
  );
};

export default ThisMonth;

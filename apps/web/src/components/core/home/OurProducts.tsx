// "use client"
import { Button } from "../../ui/button";

import { Product } from "@repo/types";
import ProductCard from "../../common/ProductCard";

const OurProducts = async ({ products }: { products: Product[] }) => {
  return (
    <div className={"flex flex-col "}>
      <div>
        <div className={"flex flex-row justify-start  items-center gap-4 mb-4"}>
          <span
            className={"bg-[#DB4444] h-6 w-3 rounded-sm shadow-slate-600"}
          />
          <p className={"text-md text-[#DB4444]"}>Our Products</p>
        </div>
        <div className={"flex flex-row justify-between flex-wrap"}>
          <div className={"flex flex-row gap-16 flex-wrap"}>
            <p className={"text-3xl font-semibold "}>Explore Our Products</p>
          </div>
        </div>
      </div>
      <div className={"flex flex-row justify-center items-center"}>
        <span className={"w-6 h-[2px] bg-[#DB4444]"} />
      </div>
      {/*<div className={"flex flex-row flex-wrap gap-20 mt-10"}>*/}
      <div
        className={
          "gap-8 mt-12 grid md:grid-cols-3  xmd:grid-cols-2 sm:grid-cols-1"
        }
      >
        {products.map((item) => {
          return <ProductCard {...item} key={item.id} addToCart={true} />;
        })}
      </div>
      <div className="flex flex-row items-center justify-center mt-10 text-center">
        <Button className={"bg-[#DB4444] w-max hover:bg-red-400"}>
          View All Products
        </Button>
      </div>
    </div>
  );
};
export default OurProducts;

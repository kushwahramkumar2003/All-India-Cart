// "use client";

import ProductCard from "../../common/ProductCard";

const RelatedItem = () => {
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

      <div className={"grid md:grid-cols-3 gap-8 mt-12 sm:grid-cols-1 "}>
        <ProductCard off={true} star={true} />
        <ProductCard off={true} star={true} addToCart={true} />
        <ProductCard off={true} star={true} />
      </div>
    </div>
  );
};

export default RelatedItem;

import ProductCard from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";

const ThisMonth = () => {
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
      <div className={"grid md:grid-cols-4 gap-8 mt-12  xmd:grid-cols-2 sm:grid-cols-1"}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />

      </div>
      <div className="flex flex-row justify-center items-center text-center mt-10"></div>
    </div>
  );
};

export default ThisMonth;

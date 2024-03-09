"use client";
import ProductCard from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";

const TodaySale = () => {
  return (
    <div className={"flex flex-col"}>
      <div>
        <div className={"flex flex-row justify-start  items-center gap-4 mb-4"}>
          <span
            className={"bg-[#DB4444] h-6 w-3 rounded-sm shadow-slate-600"}
          />
          <p className={"text-md text-[#DB4444]"}>Today's</p>
        </div>
        <div className={"flex flex-row justify-between flex-wrap"}>
          <div className={"flex flex-row gap-16 flex-wrap"}>
            <p className={"text-3xl font-semibold "}>Flash Sales</p>
            <div
              className={
                "flex flex-row gap-4 justify-center items-center text-center"
              }
            >
              <div>
                <p className={"text-sm"}>Days</p>
                <span className={"text-2xl font-semibold"}>03</span>
              </div>
              <span className={"text-2xl text-[#DB4444]"}>:</span>
              <div>
                <p className={"text-sm"}>Hours</p>
                <span className={"text-2xl font-semibold"}>23</span>
              </div>
              <span className={"text-2xl text-[#DB4444]"}>:</span>
              <div>
                <p className={"text-sm"}>Minutes</p>
                <span className={"text-2xl font-semibold"}>19</span>
              </div>
              <span className={"text-2xl text-[#DB4444]"}>:</span>
              <div>
                <p className={"text-sm"}>Seconds</p>
                <span className={"text-2xl font-semibold"}>56</span>
              </div>
            </div>
          </div>
          <span className={"text-center items-center flex"}>{"<-  ->"}</span>
        </div>
      </div>
      <div className={"flex flex-row justify-center items-center"}>
        <span className={"w-6 h-[2px] bg-[#DB4444]"} />
      </div>
      <div className={"flex flex-row flex-wrap gap-20 mt-10"}>
        <ProductCard off={true} />
        <ProductCard off={true} />
        <ProductCard off={true} />
        <ProductCard off={true} />
      </div>
      <div className="flex flex-row justify-center items-center text-center mt-10">
        <Button className={"bg-[#DB4444] w-max hover:bg-red-400"}>
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default TodaySale;

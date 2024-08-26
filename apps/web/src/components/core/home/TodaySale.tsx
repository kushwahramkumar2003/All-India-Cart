"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import ProductCard from "../../common/ProductCard";
import { Product } from "@repo/types";
import { Flipper, Flipped } from "react-flip-toolkit";

const TodaySale = ({ productArr }: { productArr: Product[] }) => {
  //eslint-disable-next-line
  const [productStateArr, setProductStateArr] = useState<Product[]>(productArr);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + 4);

    const difference = targetDate.getTime() - now.getTime();
    let timeLeft = {
      Days: 0,
      Hours: 0,
      Minutes: 0,
      Seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getRecentProducts(
    products: Product[],
    count: number = 5
  ): Product[] {
    return products
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, count);
  }

  const products = getRecentProducts(productStateArr);
  return (
    <div className={"flex flex-col"}>
      <div>
        <div className={"flex flex-row justify-start items-center gap-4 mb-4"}>
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
              {Object.entries(timeLeft).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center">
                  <p className={"text-sm"}>{key}</p>
                  <Flipper flipKey={value}>
                    <Flipped flipId={key}>
                      <span className={"text-2xl font-semibold"}>
                        {value < 10 ? `0${value}` : value}
                      </span>
                    </Flipped>
                  </Flipper>
                </div>
              ))}
            </div>
          </div>
          <span className={"text-center items-center flex"}>{"<-  ->"}</span>
        </div>
      </div>
      <div className={"flex flex-row justify-center items-center"}>
        <span className={"w-6 h-[2px] bg-[#DB4444]"} />
      </div>
      <div className={"grid md:grid-cols-3 gap-8 mt-12 sm:grid-cols-1 "}>
        {products.map((product: Product) => {
          return (
            <ProductCard
              key={product.id}
              name={product.name}
              unitPrice={product.unitPrice}
              discount={product.discount}
              picture={product.picture}
              id={product.id}
              wishlist={true}
              newProduct={true}
              addToCart={true}
            />
          );
        })}
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

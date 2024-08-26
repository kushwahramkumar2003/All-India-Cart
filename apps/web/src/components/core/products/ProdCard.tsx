"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function ({ product }: { product: Product }) {
  const router = useRouter();
  const discountPercentage = Math.round(
    ((product.msrp + product.discount - product.unitPrice) /
      (product.msrp + product.discount)) *
      100,
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300">
      <div className="w-full md:w-1/3">
        <Image
          onClick={() => {
            router.push(`/productdetail/${product.id}`);
          }}
          src={product.picture[0]}
          alt={"productImg"}
          layout="responsive"
          height={300}
          width={300}
          className="object-cover rounded-lg hover:cursor-pointer"
        />
      </div>
      <div
        className="flex flex-col gap-2 w-full md:w-2/3 hover:cursor-pointer"
        onClick={() => {
          router.push(`/productdetail/${product.id}`);
        }}
      >
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-semibold">
            {product.name}
          </span>
          <span className="text-md md:text-lg text-gray-600">
            {product.description}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span>⭐⭐⭐⭐⭐</span>
          <span>(150+)</span>
        </div>
        <div className="flex flex-col md:flex-row items-baseline gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-semibold text-red-500">
              ₹{product.unitPrice}
            </span>
            <span className="line-through text-gray-500">
              M.R.P. ₹{product.msrp + product.discount}
            </span>
          </div>
          <span className="text-green-600 text-md md:text-lg">
            ({discountPercentage}% off)
          </span>
        </div>
        <div className={"flex flex-row items-center text-center text-gray-700"}>
          <TbTruckDelivery size={20} /> &nbsp; FREE Delivery by All India Cart
        </div>
      </div>
    </div>
  );
}

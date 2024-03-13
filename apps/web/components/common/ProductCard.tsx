"use client";
import { Button } from "@/components/ui/button";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import constants from "@/constants";
import {RiDeleteBin6Line} from "react-icons/ri";

interface ProductCardProp {
  off?: boolean;
  newProduct?: boolean;
  Delete?:boolean;
  star?:boolean;
  eye?:boolean;
  wishlist?:boolean;
  colors?:boolean;
  buy?:boolean;
  addToCart?:boolean;
}

const ProductCard = ({ off = false, newProduct = false,Delete = false,star=false,eye=false,wishlist=false,colors=false,buy=false,addToCart=false }: ProductCardProp) => {
  return (
    <div className={"flex flex-col gap-4 transition-all duration-300"}>
      <div className="flex flex-row items-start justify-center gap-4 p-2 bg-gray-100 rounded-sm relative">
        {off && (
          <Button
            className={"bg-[#DB4444] text-white text-xs -mt-2 hover:bg-red-400 absolute top-0 left-0 h-6 w-12"}
          >
            -40%
          </Button>
        )}
        {newProduct && (
          <Button
            className={
              "bg-green-600 text-white text-xs  hover:bg-green-400 px-1 py-1 h-6 absolute top-0 left-0"
            }
          >
            New
          </Button>
        )}

        <Image
          src={constants.images.gamingController}
          alt={"alt img"}
          // layout="responsive"
          className="w-64 h-64 mt-8"
        />
        { Delete && <RiDeleteBin6Line className={
          "hover:text-red-500 hover:cursor-pointer"
        } size={22}/>}
        <div className={"flex flex-col top-6 gap-6"}>
          {wishlist &&  <FaRegHeart size={21} />}
          {eye
          && <MdOutlineRemoveRedEye size={25} className={
            "hover:text-blue-600 hover:cursor-pointer"
              }/>}
        </div>
      </div>
      <div className={"flex flex-col gap-4"}>
        <div className={"w-full flex flex-row "}>
          {buy &&  <Button className={"w-full"}>Buy now</Button>}
          {addToCart &&  <Button className={"w-full"}>Add To Cart</Button>}
        </div>
        <div className={"flex flex-col gap-2"}>
          <p className={"text-md font-semibold"}>HAVIT HV-G92 Gamepad</p>
          <div className={"flex flex-row gap-4 font-semibold"}>
            <span className={"text-[#DB4444] "}>$120</span>
            <span className={"line-through text-slate-600"}>$160</span>
          </div>
          {star && <div className={"flex flex-row gap-2"}>
            <span>⭐⭐⭐⭐⭐ </span>
            <span>(75)</span>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

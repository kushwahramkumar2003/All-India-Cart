"use client";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import axiosClient from "../../services";
import { Button } from "../ui/button";
import constants from "../../constants";
import {
  AddProductToWishlist,
  RemoveProductToWishlist,
} from "@/actions/wishlistActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCardProp {
  off?: boolean;
  newProduct?: boolean;
  Delete?: boolean;
  star?: boolean;
  eye?: boolean;
  wishlist?: boolean;
  colors?: boolean;
  buy?: boolean;
  addToCart?: boolean;
  name: string;
  unitPrice: number;
  discount: number;
  picture: string[];
  id: string;
  className?: string;
}

const ProductCard = ({
  off = false,
  newProduct = false,
  Delete = false,
  star = false,
  eye = false,
  wishlist = false,
  //eslint-disable-next-line
  colors = false,
  buy = false,
  addToCart = false,
  name,
  unitPrice,
  discount,
  picture,
  id,
  className,
}: ProductCardProp) => {
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const session = useSession();
  const onAddToCart = async () => {
    try {
      setAddingToCart(true);
      const promise = axiosClient.post("/cart", {
        productId: id,
        quantity: 1,
      });
      toast.promise(promise, {
        loading: "Adding to cart...",
        success: (data) => {
          console.log(data);
          setAddingToCart(false);
          return "Product added to cart!";
        },
        error: (err) => {
          console.error(err);
          return err.message || "Failed to add to cart!";
        },
      });

      // console.log("add to cart res --> ", res.data);
    } catch (e) {
      console.log("Error while adding to cart!!");
      console.error(e);
    }
  };

  return (
    <div
      className={` hover:cursor-pointer flex flex-col gap-4 transition-all duration-300 hover:shadow-lg p-4 bg-white rounded-md transform hover:scale-105 ${className}`}
    >
      <div className="relative flex items-center justify-center bg-gray-100 rounded-md overflow-hidden ">
        {off && (
          <Button className="bg-red-500 text-white text-xs absolute top-2 left-2 h-6 w-12">
            -40%
          </Button>
        )}
        {newProduct && (
          <Button className="bg-red-500 text-white text-xs absolute top-2 right-2 h-6 px-2">
            New
          </Button>
        )}
        <Image
          onClick={() => {
            router.push(`/productdetail/${id}`);
          }}
          src={
            picture && picture.length > 0
              ? picture[0]
              : constants.images.gamingController
          }
          alt="Product image"
          width={300}
          height={300}
          className="object-cover w-full h-64 transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          {wishlist && (
            <FaRegHeart
              onClick={async () => {
                if (!session) {
                  toast.error("Please login first to add product to wishlist!");
                  return;
                }
                //@ts-ignore
                const userId = session.data?.user.id as string;
                const promise = AddProductToWishlist({
                  userId,
                  productId: id,
                });
                toast.promise(promise, {
                  loading: "Adding to wishlist...",
                  success: (data) => {
                    console.log(data);
                    return "Product added to wishlist!";
                  },
                  error: (err) => {
                    console.error(err);
                    return err.message || "Failed to add to wishlist!";
                  },
                });
              }}
              size={21}
              className="hover:text-red-500 hover:cursor-pointer transition duration-300"
            />
          )}
          {eye && (
            <MdOutlineRemoveRedEye
              size={25}
              className="hover:text-blue-600 hover:cursor-pointer transition duration-300"
            />
          )}
          {Delete && (
            <RiDeleteBin6Line
              onClick={async () => {
                if (!session) {
                  toast.error(
                    "Please login first to remove product from wishlist!"
                  );
                  return;
                }
                //@ts-ignore
                const userId = session.data?.user.id as string;
                const promise = RemoveProductToWishlist({
                  userId,
                  productId: id,
                });
                toast.promise(promise, {
                  loading: "Removing from wishlist...",
                  success: (data) => {
                    console.log(data);
                    return "Product removed from wishlist!";
                  },
                  error: (err) => {
                    console.error(err);
                    return err.message || "Failed to remove from wishlist!";
                  },
                });
                router.refresh();
              }}
              size={22}
              className="hover:text-red-500 hover:cursor-pointer transition duration-300"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-row w-full gap-2">
          {buy && (
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white transition duration-300">
              Buy now
            </Button>
          )}
          {addToCart && (
            <Button
              onClick={onAddToCart}
              className="w-full bg-red-500 hover:bg-red-600 text-white transition duration-300"
              disabled={addingToCart}
            >
              {addingToCart ? "Adding To Cart..." : "Add To Cart"}
            </Button>
          )}
        </div>
        <div
          onClick={() => {
            router.push(`/productdetail/${id}`);
          }}
          className="flex flex-col gap-2"
        >
          <p className="text-md font-semibold">{name}</p>
          <div className="flex flex-row gap-4 font-semibold">
            <span className="text-red-500">₹{unitPrice - discount}</span>
            <span className="line-through text-slate-600">₹{unitPrice}</span>
          </div>
          {star && (
            <div className="flex flex-row gap-2">
              <span>⭐⭐⭐⭐⭐</span>
              <span>(75)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

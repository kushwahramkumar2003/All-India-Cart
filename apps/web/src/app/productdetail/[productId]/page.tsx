"use client";
import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import constants from "@/constants";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";
import RelatedItem from "@/components/core/productPage/RelatedItem";
import useUserDetails from "@/hook/useGetUser";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { GetUserDetails } from "@/actions/accountActions";
import {
  AddWishListOrRemove,
  GetProductDetail,
} from "@/actions/productActions";
import { bgBlack } from "next/dist/lib/picocolors";
import { FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const productdetailBreadcrumbData = [
  {
    name: "Product",
    link: "/account",
  },
  {
    name: "Gaming",
    link: "/gaming",
  },
];
export default function Index({ params }: { params: { productId: string } }) {
  const router = useRouter();
  //@ts-ignore
  const userId = useSession().data?.user?.id;
  const [product, setProduct] = useState<Product>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await GetProductDetail({
          productId: params.productId,
          userId: userId || null,
        });
        if (res.product) {
          //@ts-ignore
          setProduct(res.product);
          setIsFavorite(res.isFavorite);
        }
        console.log("product detail ", res);
      } catch (error) {
        // setError("Failed to fetch user details");
      }
    };
    fetchProduct();
  }, [userId]);
  if (!product) {
    return <SkeletonCard />;
  }
  return (
    <div className="w-full space-y-10  duration-400 transition-shadow animate-in animate-out scroll-smooth">
      <BreadCrumbs breadCrumbsData={productdetailBreadcrumbData} />
      <div className={"flex flex-row gap-4 max-sm:w-full max-sm:flex-col"}>
        <div
          className={
            "flex flex-row gap-6 max-sm:w-full max-sm:flex-col-reverse"
          }
        >
          <div
            className={
              "flex flex-col gap-4 max-sm:flex-row max-sm:flex-wrap max-h-96 overflow-y-scroll hide-scrollbar max-sm:overflow-x-scroll"
            }
          >
            {product.picture.map((item, index) => (
              <div
                onClick={() => {
                  setImageIndex(index);
                }}
                key={index + index + 4}
                className={
                  "bg-slate-100 p-2 rounded-lg items-center hover:cursor-pointer hover:shadow-2xl"
                }
              >
                <Image src={item} alt={"img"} width={100} height={100} />
              </div>
            ))}
          </div>
          <div className={"bg-slate-100 rounded-lg px-4 items-center flex"}>
            <Image
              src={product.picture[imageIndex]}
              alt={"mainController img"}
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className={"max-w-96 flex flex-col gap-4 justify-between"}>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-2xl font-semibold"}>{product.name}</p>
            <div className={"flex flex-row gap-1 justify-start items-center"}>
              <p className={"text-yellow-400 text-2xl"}>
                &#9733;&#9733;&#9733;&#9733;&#9734;
              </p>
              <p className={"text-gray-600 text-lg"}>(150 Reviews)</p>
              <span className={"bg-gray-600 h-4 w-[2px]"} />
              <p className={"text-green-500 text-lg"}>In Stock</p>
            </div>
            <p className={"text-xl text-gray-600"}>₹{product.unitPrice}</p>
            <p className={"text-sm text-gray-600"}>{product.description}</p>
          </div>
          <span className={"w-full h-[2px] bg-gray-300"} />
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row gap-4 items-center"}>
              <p className={"text-lg font-semibold"}>Colours:</p>
              <div className={"flex flex-row gap-1"}>
                {product.availableColors.length > 0 &&
                  product.availableColors.map((color, index) => {
                    return (
                      <span
                        className={`w-4 h-4  rounded-full ${color === "black" ? "bg-black" : ""} ${color === "red" ? "bg-primary" : ""} ${color === "blue" ? "bg-blue-400" : ""} ${color === "yellow" ? "bg-yellow-400" : ""}`}
                      />
                    );
                  })}
              </div>
            </div>
            <div className={"flex flex-row gap-4 items-center"}>
              <p className={"text-lg font-semibold"}>Size:</p>
              <div className={"flex flex-row gap-2"}>
                {product.availableSize.length > 0 &&
                  product.availableSize.map((size, index) => {
                    return (
                      <span
                        key={index + 7 + index}
                        className={
                          "px-2 py-1 border-2 border-gray-300 rounded-lg font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                        }
                      >
                        {sizes[Number.parseInt(size)]}
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className={"flex flex-row gap-2 "}>
              <div
                className={
                  "border-2 border-gray-300 flex flex-row  rounded-lg items-center justify-center"
                }
              >
                <span
                  onClick={() => {
                    setProductCount((val) => (val > 1 ? val - 1 : 1));
                  }}
                  className={
                    "border-r-2 border-gray-300 px-3 py-1 text-xl hover:cursor-pointer hover:bg-primary hover:text-white"
                  }
                >
                  -
                </span>
                <p className={"w-14 justify-center flex"}>{productCount}</p>
                <span
                  onClick={() => {
                    setProductCount((val) => val + 1);
                  }}
                  className={
                    "border-l-2 border-gray-300 px-3 py-1 text-xl hover:cursor-pointer hover:bg-primary hover:text-white"
                  }
                >
                  +
                </span>
              </div>
              <div>
                <Button>Buy Now</Button>
              </div>
              <span
                onClick={() => {
                  if (!userId) {
                    toast.error("Please login first!");
                    return;
                  }
                  const promise = AddWishListOrRemove({
                    productId: product.id,
                    userId,
                  });
                  toast.promise(promise, {
                    loading: "Almost done...",
                    success: (data) => {
                      console.log(data);
                      router.refresh();
                      return data.message;
                    },
                    error: (err) => {
                      console.error(err);
                      return err.message || "Failed to remove from wishlist!";
                    },
                  });
                }}
                className={
                  "text-gray-600 border-2 border-gray-300 px-3 py-1 text-xl hover:cursor-pointer flex rounded-lg items-center justify-center"
                }
              >
                {isFavorite ? (
                  <FaHeart className={"text-primary"} />
                ) : (
                  <FaRegHeart />
                )}
                {/*<FaRegHeart className={`${isFavorite && "bg-primary"}`} />*/}
              </span>
            </div>
          </div>
          <div className={"border-2 border-gray-300 flex flex-col rounded-lg"}>
            <div className={"flex flex-row gap-4 items-center p-2"}>
              <div>
                <TbTruckDelivery size={30} />
              </div>
              <div className={"flex flex-col justify-between"}>
                <p className={"font-semibold"}>Free Delivery</p>
                <Link href={""} className={"text-sm text-gray-500 underline"}>
                  Enter your postal code for Delivery Availability
                </Link>
              </div>
            </div>
            <span className={"bg-gray-300 w-full h-[1px]"} />
            <div className={"flex flex-row gap-4 items-center p-2"}>
              <div>
                <TbRefresh size={30} />
              </div>
              <div className={"flex flex-col justify-between"}>
                <p className={"font-semibold"}>Return Delivery</p>
                <p className={"text-sm text-gray-500"}>
                  Free 30 Days Delivery Returns Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RelatedItem />
      </div>
    </div>
  );
}

const sizes: Record<number, string> = {
  5: "S",
  6: "M",
  7: "X",
  8: "L",
  9: "XL",
  10: "2XL",
};

function SkeletonCard() {
  return (
    <div className="w-full space-y-10 duration-400 transition-shadow animate-in animate-out scroll-smooth">
      {/*<BreadCrumbs breadCrumbsData={productdetailBreadcrumbData} />*/}
      <Skeleton className={"h-[15px] w-[200px] rounded-lg"} />
      <div className={"flex flex-row gap-4 max-sm:w-full max-sm:flex-col"}>
        <div
          className={
            "flex flex-row gap-6 max-sm:flex-col-reverse max-sm:w-full"
          }
        >
          <div className={"flex flex-col gap-4"}>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className={"bg-slate-100 p-2 rounded-lg"}>
                <Skeleton className="h-[100px] w-[100px] rounded-lg" />
              </div>
            ))}
          </div>
          <div className={"bg-slate-100 rounded-lg px-4 items-center flex"}>
            <Skeleton className="h-[500px] w-[500px] rounded-lg" />
          </div>
        </div>
        <div className={"max-w-96 flex flex-col gap-4 justify-between"}>
          <div className={"flex flex-col gap-1"}>
            <Skeleton className="h-8 w-[200px]" />
            <div className={"flex flex-row gap-1 justify-start items-center"}>
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          {/*<span className={"w-full h-[2px] bg-gray-300"} />*/}
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row gap-4 items-center"}>
              <Skeleton className="h-6 w-[70px]" />
              <div className={"flex flex-row gap-1"}>
                {[1, 2, 3].map((_, index) => (
                  <Skeleton key={index} className={`h-4 w-4 rounded-full `} />
                ))}
              </div>
            </div>
            <div className={"flex flex-row gap-4 items-center"}>
              <Skeleton className="h-6 w-[70px]" />
              <div className={"flex flex-row gap-2"}>
                {[1, 2, 3].map((_, index) => (
                  <Skeleton key={index} className="h-6 w-6 rounded-lg" />
                ))}
              </div>
            </div>
            <div className={"flex flex-row gap-2 "}>
              <div
                className={
                  " flex flex-row rounded-lg items-center justify-center"
                }
              >
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
              <Skeleton className="h-10 w-[100px]" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
          <div className={" flex flex-col rounded-lg"}>
            <div className={"flex flex-row gap-4 items-center p-2"}>
              <Skeleton className="h-8 w-8" />
              <div className={"flex flex-col justify-between"}>
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            {/*<span className={"bg-gray-300 w-full h-[1px]"} />*/}
            <div className={"flex flex-row gap-4 items-center p-2"}>
              <Skeleton className="h-8 w-8" />
              <div className={"flex flex-col justify-between"}>
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

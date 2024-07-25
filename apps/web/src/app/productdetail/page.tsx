import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import constants from "@/constants";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";
import RelatedItem from "@/components/core/productPage/RelatedItem";

const productdetailBreadcrumbData = [
  {
    name: "Account",
    link: "/account",
  },
  {
    name: "Gaming",
    link: "/gaming",
  },
];
export default function Index() {
  return (
    <div className="w-full space-y-10">
      <BreadCrumbs breadCrumbsData={productdetailBreadcrumbData} />
      <div className={"flex flex-row gap-4"}>
        <div className={"flex flex-row gap-6"}>
          <div className={"flex flex-col gap-4"}>
            {constants.images.controllerArr.map((item, index) => (
              <div
                key={index + index + 4}
                className={"bg-slate-100 p-2 rounded-lg items-center"}
              >
                <Image src={item} alt={"img"} />
              </div>
            ))}
          </div>
          <div className={"bg-slate-100 rounded-lg px-4 items-center flex"}>
            <Image
              src={constants.images.mainControllerImg}
              alt={"mainController img"}
            />
          </div>
        </div>
        <div className={"max-w-96 flex flex-col gap-4 justify-between"}>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-2xl font-semibold"}>Havic HV G-92 Gamepad</p>
            <div className={"flex flex-row gap-1 justify-start items-center"}>
              <p className={"text-yellow-400 text-2xl"}>
                &#9733;&#9733;&#9733;&#9733;&#9734;
              </p>
              <p className={"text-gray-600 text-lg"}>(150 Reviews)</p>
              <span className={"bg-gray-600 h-4 w-[2px]"} />
              <p className={"text-green-500 text-lg"}>In Stock</p>
            </div>
            <p className={"text-xl text-gray-600"}>$192.00</p>
            <p className={"text-sm text-gray-600"}>
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive
            </p>
          </div>
          <span className={"w-full h-[2px] bg-gray-300"} />
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row gap-4 items-center"}>
              <p className={"text-lg font-semibold"}>Colours:</p>
              <div className={"flex flex-row gap-1"}>
                <span className={"w-4 h-4  rounded-full bg-blue-400 "} />
                <span className={"w-4 h-4  rounded-full bg-primary"} />
              </div>
            </div>
            <div className={"flex flex-row gap-4 items-center"}>
              <p className={"text-lg font-semibold"}>Size:</p>
              <div className={"flex flex-row gap-2"}>
                <span
                  className={
                    "px-2 py-1 border-2 border-gray-300 rounded-lg font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                  }
                >
                  XS
                </span>
                <span
                  className={
                    "px-2 py-1 border-2 border-gray-300 rounded-lg font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                  }
                >
                  S
                </span>
                <span
                  className={
                    "px-2 py-1 border-2 border-gray-300 rounded-lg font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                  }
                >
                  M
                </span>
                <span
                  className={
                    "px-2 py-1 border-2 border-gray-300 rounded-lg font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                  }
                >
                  L
                </span>
                <span
                  className={
                    "px-2 py-1 border-2 border-gray-300 rounded-lg font-semibold hover:bg-primary hover:text-white hover:cursor-pointer"
                  }
                >
                  XL
                </span>
              </div>
            </div>
            <div className={"flex flex-row gap-2 "}>
              <div
                className={
                  "border-2 border-gray-300 flex flex-row  rounded-lg items-center justify-center"
                }
              >
                <span
                  className={
                    "border-r-2 border-gray-300 px-3 py-1 text-xl hover:cursor-pointer hover:bg-primary hover:text-white"
                  }
                >
                  -
                </span>
                <p className={"w-14 justify-center flex"}>2</p>
                <span
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
                className={
                  "text-gray-600 border-2 border-gray-300 px-3 py-1 text-xl hover:cursor-pointer flex rounded-lg items-center justify-center"
                }
              >
                <FaRegHeart />
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

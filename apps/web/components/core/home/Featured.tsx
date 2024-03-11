import CustomLink from "@/components/reusable/custom-link";
import constants from "@/constants";
import Image from "next/image";
import React from "react";

const Featured = () => {
  return (
    <div>
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
      <div className={"flex flex-row gap-4"} >
        <div className="bg-black">
          <Image src={constants.images.playstation} alt="playstation" />
          <div>
            <p>PlayStation 5</p>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <CustomLink href="/">Shop Now</CustomLink>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-black">
            <Image src={constants.images.capwoman} alt="capwoman" />
          </div>
          <div className="flex flex-row justify-between ">
            <div className="bg-black">
              <Image src={constants.images.soundbox} alt="headphone" />
            </div>
            <div className="bg-black">
              <Image src={constants.images.perfume} alt="shoe" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

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
          <p className={"text-md text-[#DB4444]"}>Featured</p>
        </div>
        <div className={"flex flex-row justify-between flex-wrap"}>
          <div className={"flex flex-row gap-16 flex-wrap"}>
            <p className={"text-3xl font-semibold "}>New Arrival</p>
          </div>
        </div>
      </div>
      {/*<div className={"flex flex-row gap-4 mt-4 xmd:flex-wrap sm:flex-wrap justify-center items-center sm:w-full xmd:w-full"}>*/}
      <div className={"flex flex-row gap-4 mt-4 justify-center max-sm:items-center max-sm:flex-wrap max-xmd:flex-wrap max-[800px]:flex-wrap"}>
        <div className="bg-black relative flex justify-center items-center max-sm:w-full max-[800px]:w-full">
          <Image src={constants.images.playstation} alt="playstation" className={"w-full object-cover"} />
          <div className="absolute text-white -mt-0 bottom-0 left-0 right-0 z-10 gap-4 flex flex-col max-w-72 pl-10 mb-6">
            <p className={"text-3xl font-semibold"}>PlayStation 5</p>
            <p className={"text-sm"}>Black and White version of the PS5 coming out on sale.</p>
            <CustomLink href="/" className={"text-lg font-semibold underline"}>Shop Now</CustomLink>
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="bg-black flex flex-row relative flex-grow w-auto">
            <Image src={constants.images.capwoman} alt="capwoman" className={"border border-red-700 "}/>
            <div className={"flex flex-col gap-4 px-4 text-white absolute bottom-0 left-0 right-0 max-w-72 mb-6 z-10"}>
              <p className={"text-3xl font-semibold"}>Women’s Collections</p>
              <p className={"text-md"}>Featured woman collections that give you another vibe.</p>
              <CustomLink href="/" className={"text-lg font-semibold underline"}>Shop Now</CustomLink>
            </div>


          </div>
          <div className="flex flex-row justify-between gap-4">
            <div className="bg-black relative p-4 flex justify-center items-center
            ">
              <Image src={constants.images.soundbox} alt="headphone"/>
              <div
                  className={"flex flex-col gap-1 px-4 text-white absolute bottom-0 left-0 right-0 max-w-72 mb-6 z-10"}>
                <p className={"text-2xl font-semibold"}>Speakers</p>
                <p className={"text-sm"}>Amazon wireless speakers</p>
                <CustomLink href="/" className={"text-lg font-semibold underline"}>Shop Now</CustomLink>
              </div>
            </div>
            <div className="bg-black relative p-4 flex justify-center items-center">
              <Image src={constants.images.perfume} alt="shoe"/>
              <div
                  className={"flex flex-col gap-1 px-4 text-white absolute bottom-0 left-0 right-0 max-w-72 mb-6 z-10"}>
                <p className={"text-2xl font-semibold"}>Perfume</p>
                <p className={"text-sm"}>GUCCI INTENSE OUD EDP</p>
                <CustomLink href="/" className={"text-lg font-semibold underline"}>Shop Now</CustomLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

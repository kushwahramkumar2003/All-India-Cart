"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Card, CardContent } from "../../ui/card";
import Image from "next/image";
import { LuTwitter } from "react-icons/lu";
import { IoLogoInstagram } from "react-icons/io";
import { RiLinkedinLine } from "react-icons/ri";

import Autoplay from "embla-carousel-autoplay";
import constants from "../../../constants";

const aboutSectionPersons = [
  {
    img: constants.images.toCruise,
    name: "Tom Cruise",
    position: "Founder & Chairman",
  },
  {
    img: constants.images.emmaWatson,
    name: "Emma Watson",
    position: "Managing Director",
  },
  {
    img: constants.images.willSmith,
    name: "Will Smith",
    position: "Product Designer",
  },
];
const FoundersCrousal = () => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {aboutSectionPersons.map((item, index) => {
          return (
            <CarouselItem
              key={item.name}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center  flex-col gap-4">
                    <div
                      className={
                        "flex justify-center items-center object-cover"
                      }
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        className={" object-cover"}
                      />
                    </div>
                    <div className={"flex flex-col gap-1 justify-start"}>
                      <p className={"text-2xl font-semibold"}>{item.name}</p>
                      <p className={"text-sm"}>{item.position}</p>
                      <div className={"flex flex-row gap-3 "}>
                        <LuTwitter size={18} />
                        <IoLogoInstagram size={18} />
                        <RiLinkedinLine size={18} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FoundersCrousal;

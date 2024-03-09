"use client";
// ImageScroller.tsx

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";

interface ImageScrollerProps {
  images: {}[];
}

export function ImageScroller({ images }: { images: StaticImageData[] }) {
  return (
    <Carousel
      className="w-full "
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            <Image
              src={img}
              alt={`Image ${i + 1}`}
              className="w-full h-auto object-cover"
              layout="responsive"
              width={300}
              height={300}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/*<CarouselPrevious className="text-gray-500 hover:text-gray-700" />*/}
      {/*<CarouselNext className="text-gray-500 hover:text-gray-700" />*/}
    </Carousel>
  );
}

export default ImageScroller;

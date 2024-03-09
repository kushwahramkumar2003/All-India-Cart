// page.tsx

import CustomLink from "@/components/reusable/custom-link";
import packageJSON from "../package.json";

import constants from "@/constants";
import ImageScroller from "@/components/core/home/ImageScroller";
import TodaySale from "@/components/core/home/TodaySale";
import Categories from "@/components/core/home/Categories";
import ThisMonth from "@/components/core/home/ThisMonth";
import Promotion from "@/components/core/home/Promotion";

export default function Index() {
  return (
    <div className="space-y-10 w-full">
      <ImageScroller images={constants.images.iphoneImgArr} />
      <TodaySale />
      <Categories />
      <ThisMonth />
      <Promotion />
    </div>
  );
}

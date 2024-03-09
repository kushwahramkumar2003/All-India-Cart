// page.tsx

import CustomLink from "@/components/reusable/custom-link";
import packageJSON from "../package.json";

import constants from "@/constants";
import ImageScroller from "@/components/core/home/ImageScroller";
import TodaySale from "@/components/core/home/TodaySale";

export default function Index() {
  return (
    <div className="space-y-10 w-full">
      <ImageScroller images={constants.images.iphoneImgArr} />
      <TodaySale />
    </div>
  );
}

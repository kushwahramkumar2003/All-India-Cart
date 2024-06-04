import constants from "@/constants";
import ImageScroller from "@/components/core/home/ImageScroller";
import TodaySale from "@/components/core/home/TodaySale";
import Categories from "@/components/core/home/Categories";
import ThisMonth from "@/components/core/home/ThisMonth";
import Promotion from "@/components/core/home/Promotion";
import OurProducts from "@/components/core/home/OurProducts";
import Featured from "@/components/core/home/Featured";
import Promise from "@/components/core/home/Promise";

export default function Index() {
  return (
    <div className="w-full space-y-10">
      <ImageScroller images={constants.images.iphoneImgArr} />
      <TodaySale />
      <Categories />
      <ThisMonth />
      <Promotion />
      <OurProducts />
      <Featured />
      <Promise />
    </div>
  );
}

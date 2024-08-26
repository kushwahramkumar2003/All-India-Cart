import constants from "@/constants";
import ImageScroller from "@/components/core/home/ImageScroller";
import TodaySale from "@/components/core/home/TodaySale";
import Categories from "@/components/core/home/Categories";
import ThisMonth from "@/components/core/home/ThisMonth";
import Promotion from "@/components/core/home/Promotion";
import OurProducts from "@/components/core/home/OurProducts";
import Featured from "@/components/core/home/Featured";
import Promise from "@/components/core/home/Promise";
import { Product } from "@repo/types";
import { db } from "@/db";

export default async function Index() {
  // const user = await getSession();
  //
  // console.log("user --> ", user?.user);
  let products: Product[] = [];
  try {
    products = (await db.product.findMany({})) as Product[];
    if (!products) {
      console.log("Error occurs when product is fetching...");
    }
    // console.log("products ", products);
  } catch (err) {
    console.log("Error : ", err);
  }
  return (
    <div className="w-full space-y-10">
      <ImageScroller images={constants.images.iphoneImgArr} />
      <TodaySale productArr={products} />
      <Categories />
      <ThisMonth productArr={products} />
      <Promotion />
      <OurProducts products={products} />
      <Featured />
      <Promise />
    </div>
  );
}

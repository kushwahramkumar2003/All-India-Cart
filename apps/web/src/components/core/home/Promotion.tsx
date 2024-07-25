// "use client"
import { Button } from "../../ui/button";
import Image from "next/image";
import constants from "../../../constants";

const TimeBallData = [
  {
    title: "Days",
    value: 22,
  },
  {
    title: "Hours",
    value: 5,
  },
  {
    title: "Minutes",
    value: 59,
  },
  {
    title: "Seconds",
    value: 35,
  },
];
const Promotion = () => {
  return (
    <div
      className={
        "bg-black p-10 flex flex-row md:flex-nowrap sm:flex-wrap sm:flex-col md:flex-row flex-wrap "
      }
    >
      <div className={"flex flex-col gap-4"}>
        <p className={"text-lg text-green-600"}>Categories</p>
        <p className={"text-3xl font-semibold text-white"}>
          Enhance Your Music Experience
        </p>
        <div className={"flex flex-row flex-grow gap-4 flex-wrap"}>
          {TimeBallData.map((TimeBallDatum) => (
            <div
              key={TimeBallDatum.value}
              className={
                "flex flex-col rounded-full bg-white text-black justify-center items-center text-center p-2 w-16 h-16 gap-0"
              }
            >
              <p className={"text-lg font-semibold"}>{TimeBallDatum.value}</p>
              <p className={"text-[10px]"}>{TimeBallDatum.title}</p>
            </div>
          ))}
        </div>
        <Button className={"bg-green-600 text-white w-max hover:bg-green-500"}>
          Buy Now!
        </Button>
      </div>
      <div className={"max-sm:mt-6"}>
        <Image src={constants.images.speaker} alt={"speaker img"} />
      </div>
    </div>
  );
};
export default Promotion;

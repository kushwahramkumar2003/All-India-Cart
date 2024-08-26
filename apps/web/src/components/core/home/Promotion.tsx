"use client";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import constants from "../../../constants";

const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  let timeLeft = {
    Days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Minutes: Math.floor((difference / 1000 / 60) % 60),
      Seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Promotion = () => {
  const [targetDate, setTargetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 20);
    return date;
  });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  //eslint-disable-next-line
  const decreaseTimer = (
    amount: number,
    unit: "Days" | "Hours" | "Minutes" | "Seconds"
  ) => {
    const newTargetDate = new Date(targetDate);
    if (unit === "Days") {
      newTargetDate.setDate(newTargetDate.getDate() - amount);
    } else if (unit === "Hours") {
      newTargetDate.setHours(newTargetDate.getHours() - amount);
    } else if (unit === "Minutes") {
      newTargetDate.setMinutes(newTargetDate.getMinutes() - amount);
    } else if (unit === "Seconds") {
      newTargetDate.setSeconds(newTargetDate.getSeconds() - amount);
    }
    setTargetDate(newTargetDate);
  };

  return (
    <div className="bg-black p-10 flex flex-col md:flex-row items-center gap-4">
      <div className="flex flex-col gap-4">
        <p className="text-lg text-green-600">Categories</p>
        <p className="text-3xl font-semibold text-white">
          Enhance Your Music Experience
        </p>
        <div className="flex flex-row flex-grow gap-4 flex-wrap">
          {Object.keys(timeLeft).map((key) => (
            <div
              key={key}
              className="flex flex-col rounded-full bg-white text-black justify-center items-center text-center p-2 w-16 h-16 gap-0"
            >
              {/*//@ts-ignore*/}
              <p className="text-lg font-semibold">{timeLeft[key]}</p>
              <p className="text-[10px]">{key}</p>
            </div>
          ))}
        </div>
        <Button className="bg-green-600 text-white w-max hover:bg-green-500">
          Buy Now!
        </Button>
      </div>
      <div className="max-sm:mt-6">
        <Image src={constants.images.speaker} alt="speaker img" />
      </div>
    </div>
  );
};

export default Promotion;

import { SlScreenSmartphone } from "react-icons/sl";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { BsSmartwatch } from "react-icons/bs";
import { BsCamera } from "react-icons/bs";
import { PiHeadphonesLight } from "react-icons/pi";
import { VscGame } from "react-icons/vsc";

const categories = [
  {
    name: "Phones",
    icon: <SlScreenSmartphone size={50} />,
  },
  {
    name: "Computers",
    icon: <HiOutlineComputerDesktop size={50} />,
  },
  {
    name: "SmartWatch",
    icon: <BsSmartwatch size={50} />,
  },
  {
    name: "Camera",
    icon: <BsCamera size={50} />,
  },
  {
    name: "HeadPhones",
    icon: <PiHeadphonesLight size={50} />,
  },
  {
    name: "Gaming",
    icon: <VscGame size={50} />,
  },
];
const Categories = () => {
  return (
    <div className={"flex flex-col gap-10"}>
      <div>
        <div className={"flex flex-row justify-start  items-center gap-4 mb-4"}>
          <span
            className={"bg-[#DB4444] h-6 w-3 rounded-sm shadow-slate-600"}
          />
          <p className={"text-md text-[#DB4444]"}>Categories</p>
        </div>
        <div
          className={"flex flex-row justify-between items-center text-center"}
        >
          <div className={"flex flex-row gap-16 flex-wrap"}>
            <p className={"text-3xl font-semibold "}>Browse By Category</p>
          </div>
          <span className={"text-center items-center flex"}>{"<-  ->"}</span>
        </div>
      </div>
      <div className={"flex flex-row flex-wrap text-black gap-5"}>
        {categories.map((item) => {
          return (
            <div
              className={
                "flex flex-col justify-center items-center text-center border rounded-sm border-black gap-1 p-4 hover:cursor-pointer hover:bg-[#DB4444] transition-all duration-300 hover:text-white shadow shadow-slate-600"
              }
            >
              {item.icon}
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import Image from "next/image";
import constants from "@/constants";
import { CiShop } from "react-icons/ci";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import FoundersCrousal from "@/components/core/about/FoundersCrousal";
import Promise from "@/components/core/home/Promise";


const aboutBreadCrumbsData = [
    {
        name:"Home",
        link:"/"
    },
    {
        name:"About",
        link:"/about"

    }
]

const aboutSectionBenifits = [
    {
        icon:<CiShop size={30}/>,
        trustedUser:"10.5k",
        des:"Sallers active our site"
    },{
        icon:<AiOutlineDollarCircle size={30}/>,
        trustedUser:"33k",
        des:"Mopnthly Produduct Sale"
    },{
        icon:<IoPeopleOutline size={30}/>,
        trustedUser:"45.5k",
        des:"Customer active in our site"
    },{
        icon:<TbMoneybag size={30}/>,
        trustedUser:"25k",
        des:"Anual gross sale in our site"
    }
]


export default function Index() {
    return (
        <div className="w-full space-y-10 flex flex-col">
           <div>
               <BreadCrumbs breadCrumbsData={aboutBreadCrumbsData}/>
           </div>
           <div className={"grid grid-cols-2 gap-6 max-md:grid-cols-1"}>
               <div className={"flex flex-col gap-6"}>
                   <h2 className={"text-3xl font-semibold"}>Our Story</h2>
                   <p className={"text-sm"}>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                   <p className={"text-sm"}>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
               </div>
               <div>
                   <Image src={constants.images.twoAffGirls} alt={"affrecan girls"}/>
               </div>

           </div>
           <div className={"grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1"}>
               {aboutSectionBenifits.map((item,i)=>{
                   return (<div className={"flex flex-col justify-center items-center text-center hover:bg-destructive hover:text-white transition-all duration-400 hover:cursor-pointer p-4 rounded-lg border border-slate-400  shadow-md"}>
                       <div className={"p-2 flex justify-center items-center  rounded-full hover:text-black "}>
                           <span className={"p-1 flex justify-center items-center  rounded-full"}>
                               {item.icon}
                           </span>
                       </div>
                       <p className={"text-2xl font-semibold"}> {item.trustedUser}</p>
                       <p className={"text-sm"}>{item.des}</p>
                   </div>)
               })}
           </div>
           <div className={"flex justify-center items-center"}>
            <FoundersCrousal/>
           </div>
          <div>
              <Promise/>
          </div>
        </div>
    );
}

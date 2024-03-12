import {TbTruckDelivery} from "react-icons/tb";
import {RiCustomerService2Line} from "react-icons/ri";
import {VscWorkspaceTrusted} from "react-icons/vsc";

const promiseData = [
    {
        title:"FREE AND FAST DELIVERY",
        description:"Free delivery for all orders over $140",
        icon:<TbTruckDelivery size={30}/>

    }, {
        title:"24/7 CUSTOMER SERVICE",
        description:"Friendly 24/7 customer support",
        icon:<RiCustomerService2Line size={30}/>

    }, {
        title:"MONEY BACK GUARANTEE",
        description:"We return money within 30 days",
        icon:<VscWorkspaceTrusted size={30}/>

    },
]
const Promise = ()=>{
    return (<div className={"grid max-lg:grid-cols-3 max-md:grid-cols-3 max-xmd:grid-cols-2 max-sm:grid-cols-1 justify-center items-center grid-cols-3 mt-9 mb-10"}>
        {
            promiseData.map((promiseDatum) => (
                <div className={"flex flex-col gap-4 justify-center items-center"}>
                    <div className={"flex bg-slate-300  rounded-full h-16 w-16 justify-center items-center text-center text-white"}>
                        <span className={"p-2 rounded-full bg-black"}>
                            {promiseDatum.icon}
                        </span>
                    </div>
                    <p className={"text-lg"}>{promiseDatum.title}</p>
                    <p className={"text-sm"}>{promiseDatum.description}</p>
                </div>
            ))
        }
    </div>)
}

export default Promise

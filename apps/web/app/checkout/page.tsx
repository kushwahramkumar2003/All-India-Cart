import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import {useForm} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CheckOutForm from "@/components/core/checkout/CheckOutForm";

const billingDetailsCrumbsData = [
    {
        name:"Account",
        link:"/"
    },
    {
        name:"My Account",
        link:"/myAccount"
    },{
        name:"Product",
        link:"/product"
    },{
        name:"View Cart",
        link:"/cart"
    },{
        name:"Check Out",
        link:"/payment"
    },
]
export default function Index() {

    return (<div className={"flex flex-col gap-4"}>
        <div>
            <BreadCrumbs breadCrumbsData={billingDetailsCrumbsData}/>
        </div>
        <CheckOutForm/>
    </div>)
}

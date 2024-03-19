import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import CartProduct from "@/components/reusable/CartProduct";
import constants from "@/constants";
import {StaticImageData} from "next/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const aboutBreadCrumbsData = [
    {
        name:"Home",
        link:"/"
    },
    {
        name:"Cart",
        link:"/cart"
    }
]

export type CartProductItem={
    prodImg:StaticImageData,
    name:String,
    price:number,
    quantity?:number,

}

export const cartProdData:CartProductItem[] = [
    {
        prodImg:constants.images.monitor,
        name:"LCD Monitor",
        price:650,
        quantity:1,
    },{
        prodImg:constants.images.cartController,
        name:"H1 Gamepad",
        price:550,
        quantity:2,
    },
]

export default function Index() {
    return (
        <div className="w-full space-y-10 flex flex-col">
            <div>
                <BreadCrumbs breadCrumbsData={aboutBreadCrumbsData}/>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="flex flex-col overflow-hidden gap-3">
                            <table className="min-w-full text-left text-sm font-light ">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Product</th>
                                    <th scope="col" className="px-6 py-4">Price</th>
                                    <th scope="col" className="px-6 py-4">Quantity</th>
                                    <th scope="col" className="px-6 py-4">Subtotal</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartProdData.map((item, i) => {
                                    return (
                                        <CartProduct prodData={item}/>
                                    )
                                })}

                                </tbody>
                            </table>
                            <div className={"grid grid-cols-2"}>
                                <div className={"flex flex-row w-full justify-between items-center px-3"}>
                                    <Input placeholder={"Coupon Code"} className={"max-w-52"}/>
                                    <Button>Apply Coupon</Button>
                                </div>

                                <div className={"w-full flex flex-row justify-center items-center"}><Card className={"w-72 border border-gray-600 rounded-lg justify-center"}>
                                    <CardHeader>
                                        <CardTitle>Cart Total</CardTitle>

                                    </CardHeader>
                                    <CardContent className={"flex flex-col gap-2 text-sm font-semibold text-gray-800"}>
                                        <div className={"flex flex-row justify-between"}>
                                            <p>Subtotal:</p>
                                            <p>$1750</p>
                                        </div>
                                        <span className={"w-full h-[1px] bg-gray-400"}/>
                                        <div className={"flex flex-row justify-between"}>
                                            <p>Shipping:</p>
                                            <p>Free</p>
                                        </div>
                                        <span className={"w-full h-[1px] bg-gray-400"}/>
                                        <div className={"flex flex-row justify-between"}>
                                            <p>Total:</p>
                                            <p>$1750</p>
                                        </div>

                                    </CardContent>
                                    <CardFooter className={"flex justify-center w-full"}>
                                        <Button>Process to checkout</Button>
                                    </CardFooter>
                                </Card></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}




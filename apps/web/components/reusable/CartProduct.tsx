"use client"
import {CartProductItem} from "@/app/cart/page";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";



const CartProduct = ({prodData}:{prodData:CartProductItem})=>{
    const [productQuantity,setProductQuantity] = useState((prodData?.quantity ? prodData.quantity:1));



    return (<>
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium flex flex-row items-center gap-2 max-md:flex-col">
               <Image src={prodData.prodImg} alt={prodData.name.toString()}/>
                <p>{prodData.name}</p>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <p>${prodData.price}</p>
            </td>
            <td className="whitespace-nowrap px-6 py-4 flex flex-row  items-center gap-2 max-md:flex-col">
                <Button onClick={()=>setProductQuantity((prev)=> {
                    if(prev-1 > 0)
                   return prev - 1
                    return 1;
                })} className={"text-xl font-semibold"}>-</Button>
                <p>{productQuantity}</p>
                <Button onClick={()=>setProductQuantity((prev)=>prev+1)} className={"text-xl font-semibold"}>+</Button>
            </td>
            <td className="whitespace-nowrap px-6 py-4"><p>{productQuantity && (prodData.price * productQuantity)}</p></td>
            <td className="whitespace-nowrap px-6 py-4">
                <Button variant={"destructive"}>Delete</Button>
            </td>
        </tr>
    </>)
}

export default CartProduct;

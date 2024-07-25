import {Button} from "@/components/ui/button";
import ProductCard from "@/components/common/ProductCard";

export default function Index() {
    return (
        <div className="w-full space-y-10 transition-all duration-300 mt-4 mb-10">
           <div className={"flex flex-col"}>
               <div className={"flex flex-row justify-between mb-6" }>
                   <div>Wishlist (4)</div>
                   <Button variant={"destructive"}>Move All To Bag</Button>
               </div>
               <div className={"grid grid-cols-4 max-lg:grid-cols-4 max-md:grid-cols-4 max-xmd:grid-cols-2 max-sm:grid-cols-1 gap-3"}>
                    <ProductCard off={true} addToCart={true} Delete={true}/>
                    <ProductCard  addToCart={true} Delete={true}/>
                    <ProductCard  addToCart={true} Delete={true}/>
                    <ProductCard  addToCart={true} Delete={true}/>
               </div>
           </div>
           <div className={"mt-6"}>
               <div className={"flex flex-row justify-between mb-4"}>
                   <div className={"flex flex-row gap-4 mb-4"}>
                      <span
                          className={"bg-[#DB4444] h-6 w-3 rounded-sm shadow-slate-600"}
                      />
                       <p className={"text-lg"}>Just For You</p>
                   </div>
                   <Button variant={"destructive"}>See All</Button>
               </div>
               <div className={"grid grid-cols-4 max-lg:grid-cols-4 max-md:grid-cols-4 max-xmd:grid-cols-2 max-sm:grid-cols-1 gap-3"}>
                   <ProductCard off={true} addToCart={true} eye={true}/>
                   <ProductCard addToCart={true} eye={true}/>
                   <ProductCard addToCart={true} eye={true} newProduct={true}/>
                   <ProductCard addToCart={true} eye={true} />
               </div>
           </div>
        </div>
    );
}

"use client";
import { useState } from "react";
import CartProduct from "./CartProduct";
import axiosClient from "@/services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//@ts-ignore
export default function CartTable({ initialCart }) {
  const [cart, setCart] = useState(initialCart);
  const [deleting, setDeleting] = useState(false);

  //@ts-ignore
  const updateCart = async (productId, newQuantity) => {
    try {
      const res = await axiosClient.put("/cart", {
        productId,
        quantity: newQuantity,
      });
      setCart(res.data.cart); // Update cart with new data
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const deleteProduct = async ({ productId }: { productId: string }) => {
    try {
      setDeleting(true);
      const res = await axiosClient.delete("/cart", { data: { productId } });
      console.log("deleted cart:", res.data);
      setCart(res.data.cart);
      setDeleting(false);
    } catch (err) {
      console.error("Error deleting cart:", err);
    }
  };

  const calculateTotalPrice = () => {
    return cart.items.reduce(
      //@ts-ignore
      (total, item) => total + item.product.unitPrice * item.quantity,
      0,
    );
  };

  return (
    <>
      <div className="flex flex-col overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Subtotal</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {//@ts-ignore
            cart?.items?.map((item) => (
              <CartProduct
                deleting={deleting}
                key={item.id}
                item={item}
                updateCart={updateCart}
                deleteProduct={deleteProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={"grid grid-cols-2"}>
        <div
          className={"flex flex-row w-full justify-between items-center px-3"}
        >
          <Input placeholder={"Coupon Code"} className={"max-w-52"} />
          <Button>Apply Coupon</Button>
        </div>

        <div className={"w-full flex flex-row justify-center items-center"}>
          <Card
            className={"w-72 border border-gray-600 rounded-lg justify-center"}
          >
            <CardHeader>
              <CardTitle>Cart Total</CardTitle>
            </CardHeader>
            <CardContent
              className={
                "flex flex-col gap-2 text-sm font-semibold text-gray-800"
              }
            >
              <div className={"flex flex-row justify-between"}>
                <p>Subtotal:</p>
                <p>₹{calculateTotalPrice()}</p>
              </div>
              <span className={"w-full h-[1px] bg-gray-400"} />
              <div className={"flex flex-row justify-between"}>
                <p>Shipping:</p>
                <p>Free</p>
              </div>
              <span className={"w-full h-[1px] bg-gray-400"} />
              <div className={"flex flex-row justify-between"}>
                <p>Total:</p>
                <p>₹{calculateTotalPrice()}</p>
              </div>
            </CardContent>
            <CardFooter className={"flex justify-center w-full"}>
              <Button>Process to checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      ;
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { it } from "node:test";

const CartProduct = ({ item, updateCart, deleteProduct, deleting }) => {
  const [pending, setPending] = useState(false);

  const changeQuantity = async (newQuantity) => {
    setPending(true);
    await updateCart(item.product.id, newQuantity);
    setPending(false);
  };
  return (
    <tr className="border-b">
      <td className="whitespace-nowrap px-6 py-4 flex flex-row items-center gap-2">
        <Image
          src={item.product.picture[0]}
          alt={item.product.name}
          width={50}
          height={50}
        />
        <p>{item.product.name}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">₹{item.product.unitPrice}</td>
      <td className="whitespace-nowrap px-6 py-4 flex flex-row items-center gap-2">
        <Button
          disabled={pending || item.quantity <= 1}
          onClick={() => changeQuantity(item.quantity - 1)}
        >
          -
        </Button>
        <p>{item.quantity}</p>
        <Button
          disabled={pending}
          onClick={() => changeQuantity(item.quantity + 1)}
        >
          +
        </Button>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        ₹{item.product.unitPrice * item.quantity}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <Button
          disabled={deleting}
          variant="destructive"
          onClick={() => deleteProduct({ productId: item.productId })}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CartProduct;

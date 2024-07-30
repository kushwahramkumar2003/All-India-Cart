"use server";
import { db } from "@/db";
import z from "zod";

interface productDetailProp {
  productId: string;
  userId: string | null;
}

export async function GetProductDetail({
  productId,
  userId = null,
}: productDetailProp) {
  console.log("userId", userId);
  const wishlist = await db.wishlist.findFirst({
    where: {
      productId,
      userId: userId ? userId : "",
    },
  });
  console.log("wishlist", wishlist);
  const isFavorite: boolean = !!wishlist;
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  return {
    product,
    isFavorite,
  };
}

export async function AddWishListOrRemove({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  if (!userId)
    return {
      error: "Please Login first.",
    };
  const wishlist = await db.wishlist.findFirst({
    where: {
      productId,
      userId,
    },
  });
  if (wishlist) {
    await db.wishlist.deleteMany({
      where: {
        productId,
        userId,
      },
    });
    return {
      message: "Product removed from your wishlist!",
    };
  } else {
    await db.wishlist.create({
      data: {
        productId,
        userId,
      },
    });
    return {
      message: "Product added to your wishlist!",
    };
  }
}

"use server";
import z from "zod";
import { db } from "@/db";

const schema = z.object({
  productId: z.string({
    required_error: "Please provide a product",
  }),
  userId: z.string({
    required_error: "Please Login first.",
  }),
});

export async function AddProductToWishlist(props: any) {
  const validatedFields = schema.safeParse({
    productId: props.productId,
    userId: props.userId,
  });

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message);
  }

  let wishlist = await db.wishlist.findFirst({
    where: {
      productId: props.productId as string,
      userId: props.userId as string,
    },
  });

  if (wishlist) {
    throw new Error("Product is already in wishlist!");
  }

  wishlist = await db.wishlist.create({
    data: {
      userId: props.userId,
      productId: props.productId,
    },
  });

  return {
    message: "Product added to your wishlist!",
  };
}

export async function RemoveProductToWishlist(props: any) {
  const validatedFields = schema.safeParse({
    productId: props.productId,
    userId: props.userId,
  });

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message);
  }

  await db.wishlist.deleteMany({
    where: {
      productId: props.productId,
      userId: props.userId,
    },
  });

  return {
    message: "Product removed from your wishlist!",
  };
}

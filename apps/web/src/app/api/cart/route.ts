import z from "zod";
import { type NextRequest } from "next/server";
import { db } from "@/db";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Cart } from "@repo/types";

//Get All Products
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }
  //@ts-ignore
  const userId = session?.user.id as string;
  const cart = await db.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  return Response.json(cart);
}

//Add new product in cart
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }
  //@ts-ignore
  const userId = session?.user.id as string;

  const { productId, quantity } = NewItemBodySchema.parse(await request.json());
  const user = session?.user;

  let cart = await db.cart.findUnique({
    where: { userId: userId },
    include: { items: true },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: {
        userId: userId,
        // items: [],
        totalPrice: 0,
      },
      include: { items: true },
    });
  }

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) {
    // res.status(404).json({ message: "Product not found!" });
    Response.json({ message: "Product not found!" }, { status: 404 });
    return; // Ensure function exits after sending the response
  }

  const itemPrice = product.unitPrice * quantity;

  let cartItem = await db.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + quantity },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  cart = await db.cart.update({
    where: { id: cart.id },
    data: {
      totalPrice: {
        increment: itemPrice,
      },
    },
    include: { items: true },
  });

  // res.json(cart);

  return Response.json(cart);
}

//Update Cart
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }
  //@ts-ignore
  const userId = session?.user.id as string;

  try {
    const { productId, quantity } = UpdateItemBodySchema.parse(
      await request.json(),
    );

    const cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      return Response.json({ error: "Cart not found!" }, { status: 404 });
      // res.status(404).json({ error: "Cart not found" });
      // return;
    }

    const item = cart.items.find(
      (item: { id: string; productId: string }) => item.productId === productId,
    );

    if (!item) {
      return Response.json(
        { error: "Item not found in the cart" },
        { status: 404 },
      );
      // res.status(404).json({ error: "Item not found in the cart" });
      // return;
    }

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
      // res.status(404).json({ error: "Product not found" });
      // return;
    }

    const itemPriceDifference = product.unitPrice * (quantity - item.quantity);

    const updatedItem = await db.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });

    const updatedCart = await db.cart.update({
      where: { id: cart.id },
      data: {
        totalPrice: {
          increment: itemPriceDifference,
        },
        updatedAt: new Date(),
      },
      // include: { items: true },
      select: {
        totalPrice: true,
        items: {
          select: {
            id: true,
            cartId: true,
            quantity: true,
            productId: true,
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                sku: true,
                unitPrice: true,
                msrp: true,
                availableSize: true,
                availableColors: true,
                size: true,
                color: true,
                discount: true,
                unitWeight: true,
                unitInStock: true,
                unitsOnOrder: true,
                reorderLevel: true,
                productAvailable: true,
                currentOrder: true,
                picture: true,
                createdAt: true,
                updatedAt: true,
                ranking: true,
                notes: true,
                tag: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    picture: true,
                  },
                },
                supplier: false,
              },
            },
          },
        },
      },
    });

    return Response.json({ cart: updatedCart });
  } catch (error) {
    console.log("Error while updating cart", error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
      // res.status(400).json({ error: error.errors });
    } else {
      return Response.json({ error: "Internal server error" }, { status: 500 });
      // res.status(500).json({ error: "Internal server error" });
    }
  }

  // return Response.json({});
}

//Delete product from cart
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }
  //@ts-ignore
  const userId = session?.user.id as string;

  try {
    const { productId } = RemoveItemParamsSchema.parse(await request.json());

    const cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      // res.status(404).json({ error: "Cart not found" });
      return Response.json({ error: "Cart not found" }, { status: 404 });
      // return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );

    if (itemIndex === -1) {
      return Response.json(
        { error: "Item not found in the cart" },
        { status: 404 },
      );
      // res.status(404).json({ error: "Item not found in the cart" });
      // return;
    }

    const item = cart.items[itemIndex];

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
      // res.status(404).json({ error: "Product not found" });
      // return;
    }

    const itemPrice = product.unitPrice * item.quantity;

    await db.cartItem.delete({
      where: { id: item.id },
    });

    const updatedCart = await db.cart.update({
      where: { id: cart.id },
      data: {
        totalPrice: {
          decrement: itemPrice,
        },
        updatedAt: new Date(),
      },
      select: {
        totalPrice: true,
        items: {
          select: {
            id: true,
            cartId: true,
            quantity: true,
            productId: true,
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                sku: true,
                unitPrice: true,
                msrp: true,
                availableSize: true,
                availableColors: true,
                size: true,
                color: true,
                discount: true,
                unitWeight: true,
                unitInStock: true,
                unitsOnOrder: true,
                reorderLevel: true,
                productAvailable: true,
                currentOrder: true,
                picture: true,
                createdAt: true,
                updatedAt: true,
                ranking: true,
                notes: true,
                tag: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    picture: true,
                  },
                },
                supplier: false,
              },
            },
          },
        },
      },
    });
    return Response.json({ cart: updatedCart }, { status: 200 });
    // res.json(updatedCart);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 500 });
      // res.status(400).json({ error: error.errors });
    } else {
      return Response.json({ error: "Internal server error" }, { status: 500 });
      // res.status(500).json({ error: "Internal server error" });
    }
  }
}

const NewItemBodySchema = z.object({
  // userId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1),
});

const UpdateItemBodySchema = z.object({
  // userId: z.string(),
  productId: z.string(),
  quantity: z.number().int().min(1, { message: "Quantity must be at least 1" }),
});

const RemoveItemParamsSchema = z.object({
  // userId: z.string(),
  productId: z.string(),
});

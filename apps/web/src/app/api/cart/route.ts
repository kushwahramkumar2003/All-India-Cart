import z from "zod";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

//Get All Products
//eslint-disable-next-line
export async function GET(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }
  const userId = session?.user.id as string;
  const cart = await db.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  return Response.json(cart);
}

//Add new product in cart
export async function POST(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }

  const userId = session?.user.id as string;

  const { productId, quantity } = NewItemBodySchema.parse(await request.json());

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
    return Response.json({ message: "Product not found!" }, { status: 404 });
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
export async function PUT(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }
  //@ts-ignore
  const userId = session?.user.id as string;

  try {
    const { productId, quantity } = UpdateItemBodySchema.parse(
      await request.json()
    );

    const cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      return Response.json({ error: "Cart not found!" }, { status: 404 });
    }

    const item = cart.items.find(
      (item: { id: string; productId: string }) => item.productId === productId
    );

    if (!item) {
      return Response.json(
        { error: "Item not found in the cart" },
        { status: 404 }
      );
    }

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const itemPriceDifference = product.unitPrice * (quantity - item.quantity);

    await db.cartItem.update({
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
    } else {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

//Delete product from cart
export async function DELETE(request: Request): Promise<Response> {
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
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    const itemIndex: number = cart.items.findIndex(
      //@ts-ignore
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return Response.json(
        { error: "Item not found in the cart" },
        { status: 404 }
      );
    }

    const item = cart.items[itemIndex];

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    //@ts-ignore
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 500 });
    } else {
      return Response.json({ error: "Internal server error" }, { status: 500 });
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

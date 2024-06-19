import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import z from 'zod'
import asyncHandler from '../utils/asyncHandler'
const prisma = new PrismaClient()

const NewItemBodySchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1)
})

const UpdateItemBodySchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' })
})

const RemoveItemParamsSchema = z.object({
  userId: z.string(),
  productId: z.string()
})

//AddNewProductToCart controller
export const addItemToCart = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId, quantity } = NewItemBodySchema.parse(req.body)

  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true }
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        // items: [],
        totalPrice: 0
      },
      include: { items: true }
    })
  }

  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) {
    res.status(404).json({ message: 'Product not found!' })
    return
  }

  const itemPrice = product.unitPrice * quantity

  let cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId
    }
  })

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + quantity }
    })
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity
      }
    })
  }

  cart = await prisma.cart.update({
    where: { id: cart.id },
    data: {
      totalPrice: {
        increment: itemPrice
      }
    },
    include: { items: true }
  })

  res.json(cart)
})

//Get Full Cart details controller
export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  })
  res.json(cart)
}

//Update Cart Item controller
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = UpdateItemBodySchema.parse(req.body)

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    })

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' })
      return
    }

    const item = cart.items.find((item) => item.productId === productId)

    if (!item) {
      res.status(404).json({ error: 'Item not found in the cart' })
      return
    }

    const product = await prisma.product.findUnique({ where: { id: productId } })

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    const itemPriceDifference = product.unitPrice * (quantity - item.quantity)

    const updatedItem = await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity }
    })

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        totalPrice: {
          increment: itemPriceDifference
        },
        updatedAt: new Date()
      },
      include: { items: true }
    })

    res.json(updatedCart)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

//Remove Cart Item
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = RemoveItemParamsSchema.parse(req.params)

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    })

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' })
      return
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId)

    if (itemIndex === -1) {
      res.status(404).json({ error: 'Item not found in the cart' })
      return
    }

    const item = cart.items[itemIndex]

    const product = await prisma.product.findUnique({ where: { id: productId } })

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    const itemPrice = product.unitPrice * item.quantity

    await prisma.cartItem.delete({
      where: { id: item.id }
    })

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        totalPrice: {
          decrement: itemPrice
        },
        updatedAt: new Date()
      },
      include: { items: true }
    })

    res.json(updatedCart)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

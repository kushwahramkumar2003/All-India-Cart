import asyncHandler from '../utils/asyncHandler'
import { Request, Response } from 'express'
import { CouponSchema } from '../types/coupon'
import { prisma } from '../utils/prisma'
import z from 'zod'

const updateCouponSchema = z.object({
  active: z.boolean(),
  discount: z.number()
})
export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code, discount } = CouponSchema.parse(req.body)

  const coupon = await prisma.coupon.create({
    data: {
      code: code,
      discount: discount
    }
  })
  if (!coupon) {
    throw new Error('Error in creating new Coupon!!')
  }
  res.status(200).json({
    message: 'coupon created successfully!!',
    coupon
  })
})

export const getAllCoupons = asyncHandler(async (req: Request, res: Response) => {
  const allCoupons = await prisma.coupon.findMany()
  if (!allCoupons) {
    throw new Error('No coupon found')
  }

  res.status(200).json({
    message: 'Coupon fetched successfully',
    coupons: allCoupons
  })
})

export const getCouponById = asyncHandler(async (req: Request, res: Response) => {
  const couponId = req.params.couponId
  if (!couponId) {
    throw new Error('Please provide coupon Id')
  }

  const coupon = await prisma.coupon.findUnique({
    where: {
      id: couponId
    }
  })

  if (!coupon) {
    throw new Error('Coupon Not found!')
  }

  res.status(200).json({
    message: 'coupon fetched successfully',
    coupon
  })
})

export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const couponId = req.params.couponId

  const { active, discount } = updateCouponSchema.parse(req.body)

  const updatedCoupon = await prisma.coupon.update({
    where: {
      id: couponId
    },
    data: {
      active,
      discount
    }
  })

  if (!updatedCoupon) {
    throw new Error('Error in updating in Coupon!')
  }

  res.status(200).json({
    message: 'coupon updated successfully',
    coupon: updatedCoupon
  })
})

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  const couponId = req.params.couponId
  const coupon = await prisma.coupon.delete({
    where: {
      id: couponId
    }
  })
  if (!coupon) {
    throw new Error('Coupon Not Found!!')
  }

  res.status(200).json({
    message: 'Coupon deleted successfully'
  })
})

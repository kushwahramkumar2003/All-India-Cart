import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authMiddleware } from '@/middlewares/authMiddleware';
import z from 'zod';

import { CategorySchema } from '@/types/caegory';

const updateCouponSchema = z.object({
  active: z.boolean(),
  discount: z.number(),
});

export async function PUT(req: NextRequest, { params }: { params: { couponId: string[] } }) {
  try {
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Access user info from headers
    const userId = response.headers.get('x-user-id');
    const userEmail = response.headers.get('x-user-email');

    const couponId = Array.isArray(params.couponId) ? params.couponId[0] : params.couponId;

    const { active, discount } = updateCouponSchema.parse(req.body);

    const updatedCoupon = await db.coupon.update({
      where: {
        id: couponId,
      },
      data: {
        active,
        discount,
      },
    });

    if (!updatedCoupon) {
      throw new Error('Error in updating in Coupon!');
    }
    return NextResponse.json(
      {
        message: 'coupon updated successfully',
        coupon: updatedCoupon,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { couponId: string[] } }) {
  try {
    // Check authentication
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    const couponId = Array.isArray(params.couponId) ? params.couponId[0] : params.couponId;

    const coupon = await db.coupon.delete({
      where: {
        id: couponId,
      },
    });
    if (!coupon) {
      throw new Error('Coupon Not Found!!');
    }
    return NextResponse.json(
      {
        message: 'Coupon deleted successfully',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
export async function GET(req: NextRequest, { params }: { params: { couponId: string[] } }) {
  try {
    // Check authentication
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    const couponId = Array.isArray(params.couponId) ? params.couponId[0] : params.couponId;

    if (!couponId) {
      throw new Error('Please provide coupon Id');
    }

    const coupon = await db.coupon.findUnique({
      where: {
        id: couponId,
      },
    });

    if (!coupon) {
      throw new Error('Coupon Not found!');
    }

    return NextResponse.json(
      {
        message: 'coupon fetched successfully',
        coupon,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

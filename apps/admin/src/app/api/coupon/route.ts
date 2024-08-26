import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { azureUpload } from '@/services/azure';

import { CouponSchema } from '@/types/coupon';
import { ProductSchema } from '@/types/product';

export async function POST(req: NextRequest) {
  try {
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Access user info from headers
    const userId = response.headers.get('x-user-id');
    const userEmail = response.headers.get('x-user-email');

    const { code, discount } = CouponSchema.parse(await req.json());

    const coupon = await db.coupon.create({
      data: {
        code: code,
        discount: discount,
      },
    });
    if (!coupon) {
      throw new Error('Error in creating new Coupon!!');
    }

    return NextResponse.json(
      {
        message: 'coupon created successfully!!',
        coupon,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const allCoupons = await db.coupon.findMany();
    if (!allCoupons) {
      throw new Error('No coupon found');
    }
    return NextResponse.json(
      {
        message: 'Coupon fetched successfully',
        coupons: allCoupons,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

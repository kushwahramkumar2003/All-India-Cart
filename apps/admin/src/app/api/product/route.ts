import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authMiddleware } from '@/middlewares/authMiddleware';

import { ProductSchema } from '@/types/product';

export async function GET(req: NextRequest) {
  try {
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Access user info from headers
    const userId = response.headers.get('x-user-id');
    const userEmail = response.headers.get('x-user-email');

    const params = req.nextUrl.searchParams;
    const name = params.get('name');
    console.log('params', params.get('name'));
    const products = await db.product.findMany({
      where: {
        supplierId: userId || '',
        name: {
          contains: name || '',
        },
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      message: 'Products fetched successfully!',
      products,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Access user info from headers
    const userId = response.headers.get('x-user-id');
    const userEmail = response.headers.get('x-user-email');

    const {
      name,
      description,
      // sku,
      categoryId,
      quantityPerUnit,
      unitPrice,
      unitInStock,
      msrp,
      availableSize,
      availableColors,
      size,
      color,
      discount,
      // discountAvailable,
      unitWeight,
      // unitsOnOrder,
      reorderLevel,
      productAvailable,
      picture,
    } = ProductSchema.parse(await req.json());

    // const files = req.files as Express.Multer.File[]

    // const productImages = await imageArrUploader(files)

    //@ts-ignore

    // const supplier = req.user as Supplier

    const product = await db.product.create({
      data: {
        name,
        description,
        // sku,
        categoryId,
        quantityPerUnit,
        unitPrice,
        unitInStock,
        msrp,
        availableSize,
        availableColors,
        size,
        color,
        discount,
        unitWeight,
        // unitsOnOrder,
        reorderLevel,
        productAvailable,
        // discountAvailable,
        picture,
        // supplierId: supplier.id,
        supplierId: userId || '',
      },
    });

    if (!product) {
      throw new Error('Error in creating new Product.');
    }
    return NextResponse.json(
      {
        message: 'Product added Succesfully.',
        product: product,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authMiddleware } from '@/middlewares/authMiddleware';

import { ProductSchema } from '@/types/product';

export async function DELETE(req: NextRequest, { params }: { params: { productId: string[] } }) {
  try {
    // Check authentication
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Extracting productId from params (assuming it's an array of strings)
    const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Check if the product exists
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Perform the deletion within a transaction to ensure data consistency
    await db.$transaction(async (prisma) => {
      // Delete related CartItem entries
      await prisma.cartItem.deleteMany({
        where: {
          productId: productId,
        },
      });

      // Now delete the Product
      await prisma.product.delete({
        where: { id: productId },
      });
    });

    return NextResponse.json(
      {
        message: 'Product and related cart items deleted successfully!',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { productId: string[] } }) {
  try {
    // Check authentication
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Extracting productId from params (assuming it's an array of strings)
    const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Check if the product exists
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        supplier: {
          select: {
            companyName: true,
            contactName: true,
          },
        },
      },
    });
    if (!product) {
      throw new Error('Product not found!!');
    }
    return NextResponse.json(
      {
        message: 'Product fetched successfully',
        product: product,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { productId: string[] } }) {
  try {
    // Check authentication
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Extracting productId from params (assuming it's an array of strings)
    const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Check if the product exists
    const {
      id,
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
    } = ProductSchema.parse(req.body);

    // const productId = req.params.productId

    //@ts-ignore
    const user = req.user as Supplier;

    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const updatedProduct = db.product.update({
      where: {
        id: id,
      },
      data: {
        name: name || product.name,
        description: description || product.description,
        // sku: sku || product.sku,
        categoryId: categoryId || product.categoryId,
        quantityPerUnit: quantityPerUnit || product.quantityPerUnit,
        unitPrice: unitPrice || product.unitPrice,
        unitInStock: unitInStock || product.unitInStock,
        msrp: msrp || product.msrp,
        availableSize: availableSize || product.availableSize,
        availableColors: availableColors || product.availableColors,
        size: size || product.size,
        color: color || product.color,
        discount: discount || product.discount,
        // discountAvailable: discountAvailable || product.discountAvailable,
        unitWeight: unitWeight || product.unitWeight,
        // unitsOnOrder: unitsOnOrder || product.unitsOnOrder,
        reorderLevel: reorderLevel || product.reorderLevel,
        productAvailable: productAvailable || product.productAvailable,
      },
    });

    if (!updatedProduct) {
      throw new Error('Error in updating product!');
    }
    return NextResponse.json(
      {
        message: 'Product updated Successfully.',
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

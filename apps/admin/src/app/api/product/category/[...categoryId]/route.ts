import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authMiddleware } from '@/middlewares/authMiddleware';

import { CategorySchema } from '@/types/caegory';

export async function PUT(req: NextRequest, { params }: { params: { categoryId: string[] } }) {
  try {
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Access user info from headers
    const userId = response.headers.get('x-user-id');
    const userEmail = response.headers.get('x-user-email');

    const id = Array.isArray(params.categoryId) ? params.categoryId[0] : params.categoryId;

    const { name, description } = CategorySchema.parse(req.body);

    const category = await db.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(
      {
        message: 'Category updated',
        category,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { categoryId: string[] } }) {
  try {
    // Check authentication
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    const id = Array.isArray(params.categoryId) ? params.categoryId[0] : params.categoryId;

    await db.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: 'Category deleted successfully!',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
export async function GET(req: NextRequest, { params }: { params: { categoryId: string[] } }) {
  try {
    // Check authentication
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    const id = Array.isArray(params.categoryId) ? params.categoryId[0] : params.categoryId;

    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

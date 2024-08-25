import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { azureUpload } from '@/services/azure';

import { ProductSchema } from '@/types/product';

export async function POST(req: NextRequest) {
  try {
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Access user info from headers
    const userId = response.headers.get('x-user-id');
    const userEmail = response.headers.get('x-user-email');

    const { name, description } = await req.json();

    //@ts-ignore
    const icon = req.files ? (req.files[0] as Express.Multer.File) : null;

    let iconUrl: string | null = null;

    if (icon) {
      // iconUrl = await azureUpload(icon);
    }

    const category = await db.category.create({
      data: {
        name,
        description,
        picture: iconUrl,
      },
    });
    return NextResponse.json(
      {
        message: 'Category created',
        category,
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
    const categories = await db.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

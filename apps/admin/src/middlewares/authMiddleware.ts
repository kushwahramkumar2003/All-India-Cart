import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Adjust based on your setup
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token');
  console.log('token', token);
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token.value, process.env.JWT_SECRET!);
    //@ts-ignore
    const userId = decodedToken.userId;
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.supplier.findUnique({ where: { id: userId as string } });
    // console.log('user', user);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Pass user info to the next route via headers
    const response = NextResponse.next();
    response.headers.set('x-user-id', user.id);
    response.headers.set('x-user-email', user.email);

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

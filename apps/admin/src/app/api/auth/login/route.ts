import { cookies } from 'next/headers';
import { db } from '@/db';
import bcrypt from 'bcrypt';

import { SupplierLoginSchema } from '@/types/supplier';
import { getNewToken } from '@/lib/jwtToken';

export async function POST(req: Request) {
  try {
    const { email, password } = SupplierLoginSchema.parse(await req.json());

    const user = await db.supplier.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    user.password = '';

    const token = await getNewToken(user);

    cookies().set({
      name: 'token',
      httpOnly: true,
      value: token,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    return Response.json(
      {
        message: 'User logged in successfully',
        user: {
          email: user.email,
          name: user.contactName,
          companyName: user.companyName,
          contactTitle: user.contactTitle,
          address: user.address,
          city: user.city,
          region: user.region,
          postalCode: user.postalCode,
          country: user.country,
          phone: user.phone,
          fax: user.fax,
          homePage: user.homePage,
          url: user.url,
          picture: user.picture,
          ranking: user.ranking,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: err }, { status: 500 });
  }
}

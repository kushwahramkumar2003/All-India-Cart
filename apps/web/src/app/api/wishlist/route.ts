import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

//eslint-disable-next-line
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Session not found!" }, { status: 404 });
  }
  //@ts-ignore
  // const userId = session?.user.id as string;
  // const { productId } = await req.json();
  //
  // let wishlist = await db.wishlist.findUnique({
  //   where: {
  //     productId: productId as string,
  //     userId: userId as string,
  //   },
  // });
  // if (wishlist) {
  //   return Response.json(
  //     { message: "Product is already in wishlist!" },
  //     { status: 404 },
  //   );
  // }
  // wishlist = await db.wishlist.create({
  //   userId,
  //   productId,
  // });
  return Response.json({ message: "Session not found!" }, { status: 404 });
}

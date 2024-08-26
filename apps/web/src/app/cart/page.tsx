import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CartTable from "@/components/core/cart/CartTable";

const aboutBreadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Cart", link: "/cart" },
];

export default async function Index() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
    return null;
  }

  const userId = session.user?.id;
  const cart = await db.cart.findUnique({
    where: { userId },
    select: {
      totalPrice: true,
      items: {
        select: {
          id: true,
          cartId: true,
          quantity: true,
          productId: true,
          product: {
            select: {
              id: true,
              name: true,
              unitPrice: true,
              picture: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="w-full space-y-10 flex flex-col">
      <BreadCrumbs breadCrumbsData={aboutBreadCrumbsData} />
      <CartTable initialCart={cart} />
    </div>
  );
}

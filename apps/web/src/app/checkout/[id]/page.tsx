import BreadCrumbs from "@/components/reusable/BreadCrumbs";

import CheckOutForm from "@/components/core/checkout/CheckOutForm";
import { db } from "@/db";

const billingDetailsCrumbsData = [
  {
    name: "Account",
    link: "/",
  },
  {
    name: "My Account",
    link: "/myAccount",
  },
  {
    name: "Product",
    link: "/product",
  },
  {
    name: "View Cart",
    link: "/cart",
  },
  {
    name: "Check Out",
    link: "/payment",
  },
];
export default async function Index({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!product) {
    return {
      notFound: true,
    };
  }
  console.log("product", product);
  return (
    <div className={"flex flex-col gap-4"}>
      <div>
        <BreadCrumbs breadCrumbsData={billingDetailsCrumbsData} />
      </div>
      {/* @ts-ignore */}
      <CheckOutForm product={product} />
    </div>
  );
}

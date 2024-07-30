import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import CheckOutForm from "@/components/core/checkout/CheckOutForm";
import { db } from "@/db";
import ProdCard from "@/components/core/products/ProdCard";
import { ProdctCardSkeleton } from "@/components/core/products/ProdctCardSkeleton";
import Image from "next/image";
import constants from "@/constants";

export default async function Index({ params }: { params: { name: string } }) {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: params.name || "",
      },
    },
  });

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <Image
          src={constants.images.not_found_1}
          alt="Not Found"
          width={400}
          height={400}
          className="object-cover"
        />
        <h2 className="text-2xl font-semibold">No products found</h2>
        <p className="text-gray-600">
          Sorry, we couldn't find any products matching your search.
        </p>
        <p className="text-gray-600">
          Please try searching with different keywords or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {products.map((prod) => (
        <ProdCard product={prod} key={prod.id} />
      ))}
    </div>
  );
}

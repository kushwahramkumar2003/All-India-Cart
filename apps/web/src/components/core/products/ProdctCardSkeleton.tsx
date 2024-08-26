import { TbTruckDelivery } from "react-icons/tb";
import { Skeleton } from "@/components/ui/skeleton";

export function ProdctCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300">
      <div className="w-full md:w-1/3">
        <Skeleton className="w-full h-72 md:h-80 rounded-lg" />
      </div>
      <div className="flex flex-col gap-2 w-full md:w-2/3">
        <div className="flex flex-col">
          <Skeleton className="h-8 w-3/4 md:w-2/3" />
          <Skeleton className="h-6 w-2/3 md:w-1/2 mt-2" />
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-10" />
        </div>
        <div className="flex flex-col md:flex-row items-baseline gap-2 mt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex flex-row items-center text-center text-gray-700 mt-2">
          <TbTruckDelivery size={20} />
          <Skeleton className="h-6 w-36 ml-2" />
        </div>
      </div>
    </div>
  );
}

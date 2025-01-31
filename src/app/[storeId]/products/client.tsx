"use client";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetProducts } from "@/features/products/api/use-get-products";
import { columns } from "@/features/products/components/columns";
import { DataTable } from "@/features/products/components/data-table";
import { useStoreId } from "@/hooks/use-store-id";

export const ProductClient = () => {
  const storeId = useStoreId();
  const { data: result, isLoading } = useGetProducts(storeId);
  if (isLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <DataTable columns={columns} data={result ? result.data : []} />
    </div>
  );
};

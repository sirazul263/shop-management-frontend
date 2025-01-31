"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { columns } from "@/features/categories/components/columns";
import { DataTable } from "@/features/categories/components/data-table";
import { useStoreId } from "@/hooks/use-store-id";

export const CategoryClient = () => {
  const storeId = useStoreId();
  const { data: result, isLoading } = useGetCategories(storeId);
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

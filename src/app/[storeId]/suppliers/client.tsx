"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetSuppliers } from "@/features/suppliers/api/use-get-suppliers";
import { columns } from "@/features/suppliers/components/columns";
import { DataTable } from "@/features/suppliers/components/data-table";
import { useStoreId } from "@/hooks/use-store-id";

export const SupplierClient = () => {
  const storeId = useStoreId();
  const { data: result, isLoading } = useGetSuppliers(storeId);
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

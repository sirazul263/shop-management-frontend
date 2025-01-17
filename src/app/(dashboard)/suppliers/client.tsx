"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetSuppliers } from "@/features/suppliers/api/use-get-suppliers";
import { columns } from "@/features/suppliers/components/columns";
import { DataTable } from "@/features/suppliers/components/data-table";

export const SupplierClient = () => {
  const { data: result, isLoading } = useGetSuppliers();
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

"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetBrands } from "@/features/brands/api/use-get-brands";
import { columns } from "@/features/brands/components/columns";
import { DataTable } from "@/features/brands/components/data-table";

export const BrandClient = () => {
  const { data: result, isLoading } = useGetBrands();
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

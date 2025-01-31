"use client";

import PageLoader from "@/components/page-loader";
import { useGetProducts } from "@/features/products/api/use-get-products";
import { useGetSuppliers } from "@/features/suppliers/api/use-get-suppliers";
import { CreatePurchaseForm } from "./create-purchase-form";
import { useStoreId } from "@/hooks/use-store-id";

export const CreatePurchaseFormWrapper = () => {
  const storeId = useStoreId();
  const { data: products, isLoading: isLoadingProducts } =
    useGetProducts(storeId);
  const { data: suppliers, isLoading: isLoadingSuppliers } =
    useGetSuppliers(storeId);
  const isLoading = isLoadingProducts || isLoadingSuppliers;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <CreatePurchaseForm products={products.data} suppliers={suppliers.data} />
    </div>
  );
};

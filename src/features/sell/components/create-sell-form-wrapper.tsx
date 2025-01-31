"use client";

import PageLoader from "@/components/page-loader";
import { useGetProducts } from "@/features/products/api/use-get-products";
import { CreateSellForm } from "./create-sell-form";
import { useStoreId } from "@/hooks/use-store-id";

export const CreateSellFormWrapper = () => {
  const storeId = useStoreId();
  const { data: products, isLoading: isLoadingProducts } =
    useGetProducts(storeId);
  const isLoading = isLoadingProducts;

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div>
      <CreateSellForm products={products.data} />
    </div>
  );
};

"use client";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetProductById } from "@/features/products/api/use-get-product-by-id";
import { ProductFormWrapper } from "@/features/products/components/product-form-wrapper";
import { useProductId } from "@/features/products/hooks/use-product-id";
import { useStoreId } from "@/hooks/use-store-id";

export const ProductIdClient = () => {
  const storeId = useStoreId();
  const productId = useProductId();
  const { data: result, isLoading } = useGetProductById({ storeId, productId });

  if (isLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <ProductFormWrapper initialValue={result.data} />
    </div>
  );
};

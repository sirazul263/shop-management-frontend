"use client";

import PageLoader from "@/components/page-loader";
import { useGetBrands } from "@/features/brands/api/use-get-brands";
import { Brand } from "@/features/brands/types";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Category } from "@/features/categories/types";
import { CreateProductForm } from "./create-product-form";
import { Product } from "../types";
import { UpdateProductForm } from "./update-product-form";
import { useStoreId } from "@/hooks/use-store-id";
interface ProductFormWrapperProps {
  initialValue?: Product | undefined;
}

export const ProductFormWrapper = ({
  initialValue,
}: ProductFormWrapperProps) => {
  const storeId = useStoreId();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories(storeId);
  const { data: brands, isLoading: isLoadingBrands } = useGetBrands(storeId);

  const isLoading = isLoadingCategories || isLoadingBrands;

  const categoryOptions = categories?.data.map((category: Category) => ({
    id: category.id.toString(),
    name: category.name,
    imageUrl: category.image,
  }));

  const brandOptions = brands?.data.map((brand: Brand) => ({
    id: brand.id.toString(),
    name: brand.name,
    imageUrl: brand.image,
  }));

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      {initialValue ? (
        <UpdateProductForm
          initialValue={initialValue}
          categoryOptions={categoryOptions}
          brandOptions={brandOptions}
        />
      ) : (
        <CreateProductForm
          categoryOptions={categoryOptions}
          brandOptions={brandOptions}
        />
      )}
    </div>
  );
};

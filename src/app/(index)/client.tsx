"use client";
import { StoreMain } from "@/features/store/components/store-main";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetStores } from "@/features/store/api/use-get-stores";
const StoreClient = () => {
  const { data: result, isLoading } = useGetStores();
  if (isLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <main className="bg-neutral-100 min-h-screen">
      <StoreMain stores={result ? result.data : []} />
    </main>
  );
};
export default StoreClient;

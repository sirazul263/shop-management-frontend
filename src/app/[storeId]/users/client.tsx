"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetUsers } from "@/features/members/api/use-get-users";
import { columns } from "@/features/members/components/columns";
import { DataTable } from "@/features/members/components/data-table";
import { useGetStores } from "@/features/store/api/use-get-stores";
import { useStoreId } from "@/hooks/use-store-id";

export const UserClient = () => {
  const storeId = useStoreId();
  const { data: users, isLoading: isLoadingUsers } = useGetUsers(storeId);
  const { data: stores, isLoading } = useGetStores();
  if (isLoadingUsers || isLoading) {
    return <PageLoader />;
  }
  if (!users) {
    return <PageError message="Something went wrong!" />;
  }
  return (
    <div>
      <DataTable
        columns={columns}
        data={users ? users.data : []}
        stores={stores ? stores.data : []}
      />
    </div>
  );
};

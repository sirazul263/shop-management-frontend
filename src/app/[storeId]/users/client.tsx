"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { getCurrent } from "@/features/auth/queries";
import { useGetUsers } from "@/features/members/api/use-get-users";
import { getColumns } from "@/features/members/components/columns";
import { DataTable } from "@/features/members/components/data-table";
import { useGetStores } from "@/features/store/api/use-get-stores";
import { useStoreId } from "@/hooks/use-store-id";
import { useEffect, useState } from "react";

export const UserClient = () => {
  const storeId = useStoreId();
  const { data: users, isLoading: isLoadingUsers } = useGetUsers(storeId);
  const { data: stores, isLoading } = useGetStores();

  const [isClient, setIsClient] = useState(false);
  const user = isClient ? getCurrent() : null;

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client
  }, []);

  if (!isClient) return null;
  if (!user) return null;
  const { role } = user;

  const columns = getColumns(role); // 🔥

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

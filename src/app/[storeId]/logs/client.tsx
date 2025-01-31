"use client";
import { DatePicker } from "@/components/date-picker";
import { DefaultAvatar } from "@/components/default-avatar";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetLogs } from "@/features/logs/api/use-get-logs";
import { columns } from "@/features/logs/components/columns";
import { DataTable } from "@/features/logs/components/data-table";
import { useGetUsers } from "@/features/members/api/use-get-users";
import { UserAvatar } from "@/features/members/components/user-avatar";
import { User } from "@/features/members/types";
import { useStoreId } from "@/hooks/use-store-id";
import { useState } from "react";

export const LogsClient = () => {
  const storeId = useStoreId();
  const [page, setPage] = useState(1); // Current page
  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  const [logDate, setLogDate] = useState<Date | undefined>(undefined);
  const { data: result, isLoading: logsLoading } = useGetLogs(
    storeId,
    page,
    type,
    user,
    logDate
  );
  const { data: users, isLoading: userLoading } = useGetUsers(storeId);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const clearFilter = () => {
    setPage(1);
    setType("");
    setUser("");
    setLogDate(undefined);
  };

  if (logsLoading || userLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> Category</p>
          <Select value={type} onValueChange={(value) => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Category">
                <div className="flex items-center gap-x-2">
                  <DefaultAvatar className="size-6" name={"Category"} />
                  Category
                </div>
              </SelectItem>
              <SelectItem value="Brand">
                <div className="flex items-center gap-x-2">
                  <DefaultAvatar className="size-6" name={"Brand"} />
                  Brand
                </div>
              </SelectItem>
              <SelectItem value="Product">
                <div className="flex items-center gap-x-2">
                  <DefaultAvatar className="size-6" name={"Product"} />
                  Product
                </div>
              </SelectItem>
              <SelectItem value="Supplier">
                <div className="flex items-center gap-x-2">
                  <DefaultAvatar className="size-6" name={"Supplier"} />
                  Supplier
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> User</p>
          <Select value={user} onValueChange={(value) => setUser(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {users &&
                users.data &&
                users.data.map((item: User, i: number) => (
                  <SelectItem value={`${item.id}`} key={i}>
                    <div className="flex items-center gap-x-2 text-sm font-medium">
                      <UserAvatar
                        className="size-6"
                        fallbackClassName="text-sm"
                        name={item.name}
                      />
                      <p className="line-champ-1">{item.name}</p>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <div className="col-span-4 flex flex-col">
            <p className="mb-1 text-sm font-semibold"> Date</p>
            <DatePicker value={logDate} onChange={(date) => setLogDate(date)} />
          </div>
        </div>
        <div className="flex flex-col">
          <Button className="h-12 md:mt-6" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>
      <DataTable
        page={page}
        handlePageChange={handlePageChange}
        columns={columns}
        data={result ? result.data.data : []}
        totalPages={result ? result.data.last_page : 0}
        total={result ? result.data.total : 0}
      />
    </div>
  );
};

"use client";
import { DatePicker } from "@/components/date-picker";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUsers } from "@/features/members/api/use-get-users";
import { UserAvatar } from "@/features/members/components/user-avatar";
import { User } from "@/features/members/types";
import { useGetSells } from "@/features/sell/api/use-get-sells";
import { columns } from "@/features/sell/components/columns";
import { DataTable } from "@/features/sell/components/data-table";
import { useStoreId } from "@/hooks/use-store-id";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

export const SellClient = () => {
  const router = useRouter();
  const storeId = useStoreId();
  const [page, setPage] = useState(1); // Current page
  const [invoiceId, setInvoiceId] = useState("");
  const [customer, setCustomer] = useState("");
  const [soldBy, setSoldBy] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [sellDate, setSellDate] = useState<Date | undefined>(undefined);

  const { data: result, isLoading: sellLoading } = useGetSells(
    storeId,
    page,
    invoiceId,
    customer,
    soldBy,
    paymentStatus,
    sellDate
  );
  const { data: users, isLoading: usersLoading } = useGetUsers(storeId);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const clearFilter = () => {
    setPage(1);
    setInvoiceId("");
    setSoldBy("");
    setCustomer("");
    setPaymentStatus("");
    setSellDate(undefined);
  };

  if (sellLoading || usersLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> Invoice </p>
          <Input
            placeholder="Invoice "
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> Customer</p>
          <Input
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> Sold By</p>
          <Select value={soldBy} onValueChange={(value) => setSoldBy(value)}>
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
            <p className="mb-1 text-sm font-semibold">Sold On </p>
            <DatePicker
              value={sellDate}
              onChange={(date) => setSellDate(date)}
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold">Payment Status</p>
          <Select
            value={paymentStatus}
            onValueChange={(value) => setPaymentStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"PAID"}>
                <p className="line-champ-1">Paid</p>
              </SelectItem>
              <SelectItem value={"UNPAID"}>
                <p className="line-champ-1">Unpaid</p>
              </SelectItem>
              <SelectItem value={"DUE"}>
                <p className="line-champ-1">Due</p>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Button className="h-12 md:mt-6" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
        <div />
        <div className="flex items-center justify-end md:mt-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => router.push(`/${storeId}/sells/create`)}
          >
            <p className="text-xs uppercase font-bold text-neutral-500 ">
              Add New Sell
            </p>
            <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition ms-1" />
          </div>
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

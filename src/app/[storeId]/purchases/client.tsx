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
import { useGetUsers } from "@/features/members/api/use-get-users";
import { UserAvatar } from "@/features/members/components/user-avatar";
import { User } from "@/features/members/types";
import { useGetPurchases } from "@/features/purchases/api/use-get-purchases";
import { columns } from "@/features/purchases/components/columns";
import { DataTable } from "@/features/purchases/components/data-table";
import { useGetSuppliers } from "@/features/suppliers/api/use-get-suppliers";
import { Supplier } from "@/features/suppliers/types";
import { useStoreId } from "@/hooks/use-store-id";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

export const PurchaseClient = () => {
  const router = useRouter();
  const storeId = useStoreId();
  const [page, setPage] = useState(1); // Current page
  const [supplier, setSupplier] = useState("");
  const [purchasedBy, setPurchasedBy] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { data: result, isLoading: purchaseLoading } = useGetPurchases(
    storeId,
    page,
    supplier,
    purchasedBy,
    paymentMethod,
    paymentStatus,
    date
  );
  const { data: suppliers, isLoading: supplierLoading } =
    useGetSuppliers(storeId);
  const { data: users, isLoading: usersLoading } = useGetUsers(storeId);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const clearFilter = () => {
    setPage(1);
    setSupplier("");
    setPurchasedBy("");
    setPaymentMethod("");
    setPaymentStatus("");
    setDate(undefined);
  };

  const isLoading = purchaseLoading || supplierLoading || usersLoading;
  if (isLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> Supplier</p>
          <Select
            value={supplier}
            onValueChange={(value) => setSupplier(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers &&
                suppliers.data &&
                suppliers.data.map((item: Supplier, i: number) => (
                  <SelectItem value={`${item.id}`} key={i}>
                    <div className="flex items-center gap-x-2">
                      <DefaultAvatar className="size-6" name={item.name} />
                      {item.name}
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> Purchased By</p>
          <Select
            value={purchasedBy}
            onValueChange={(value) => setPurchasedBy(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
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
            <p className="mb-1 text-sm font-semibold">Purchased Date</p>
            <DatePicker value={date} onChange={(date) => setDate(date)} />
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="mb-1 text-sm font-semibold"> Payment Method</p>
          <Select
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CASH">Cash</SelectItem>
              <SelectItem value="CARD">Card</SelectItem>
              <SelectItem value="CHEQUE">Cheque</SelectItem>
              <SelectItem value="BANK">Bank Transfer</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
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
            onClick={() => router.push(`/${storeId}/purchases/create`)}
          >
            <p className="text-xs uppercase font-bold text-neutral-500 ">
              Add New Purchase
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

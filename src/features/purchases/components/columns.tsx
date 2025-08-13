"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, InfoIcon } from "lucide-react";
import { format } from "date-fns";
import { UserAvatar } from "@/features/members/components/user-avatar";
import { Purchase } from "../types";
import { numberWithCommas, snakeCaseToTitleCase } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;

      return <p className="line-clamp-1">{id}</p>;
    },
  },

  {
    accessorKey: "supplier",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supplier
        </Button>
      );
    },
    cell: ({ row }) => {
      const supplier = row.original.supplier;
      return (
        <div className="flex items-center">
          <p className="line-clamp-1 pe-2 font-bold">{supplier.name}</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-0">
                <InfoIcon className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{supplier.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {supplier.address}
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Email</Label>
                    <Input
                      id="width"
                      defaultValue={supplier.email}
                      className="col-span-2 h-8"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Phone</Label>
                    <Input
                      id="maxWidth"
                      defaultValue={supplier.phone}
                      className="col-span-2 h-8"
                      disabled
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Added on</Label>
                    <Input
                      id="maxHeight"
                      defaultValue={format(
                        new Date(supplier.created_at),
                        "dd/MM/yyyy"
                      )}
                      className="col-span-2 h-8"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Products
        </Button>
      );
    },
    cell: ({ row }) => {
      const products = row.original.items;
      return (
        <div className="flex items-center">
          <p className="line-clamp-1 pe-2"> Total : {products.length}</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-0">
                <InfoIcon className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              {products.map((item, i) => (
                <div className="grid gap-4" key={i}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-x-4">
                      <div className="flex items-center gap-x-2 ">
                        {item.product.image && (
                          <div className="size-16 relative rounded-md overflow-hidden">
                            <Image
                              src={item.product.image}
                              alt="Image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium leading-none pb-1">
                          {item.product.brand.name} {item.product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          ৳{" "}
                          {numberWithCommas(
                            Number(item.product.sell_price || 0)
                          )}{" "}
                          (Selling Price)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Category</Label>
                      <Input
                        id="width"
                        defaultValue={item.product.category.name}
                        className="col-span-2 h-8"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Unit Price</Label>
                      <Input
                        id="maxWidth"
                        defaultValue={`৳ ${numberWithCommas(item.unit_amount)}`}
                        className="col-span-2 h-8"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Quantity</Label>
                      <Input
                        id="maxWidth"
                        defaultValue={item.quantity}
                        className="col-span-2 h-8"
                        disabled
                      />
                    </div>
                    {item.imei && (
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">IMEI</Label>
                        <div>
                          {item.imei.split(",").map((imei) => (
                            <Input
                              key={imei}
                              id="maxWidth"
                              defaultValue={imei}
                              className="col-span-4 h-8 mb-2"
                              disabled
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Total Price</Label>
                      <Input
                        id="maxWidth"
                        defaultValue={`৳ ${numberWithCommas(
                          item.total_amount
                        )}`}
                        className="col-span-2 h-8"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total = row.original.total;
      const discount_amount = row.original.discount_amount;
      const discount_type = row.original.discount_type;
      let total_amount = Number(total);
      if (discount_amount && discount_type) {
        if (discount_type === "FIXED") {
          total_amount = total_amount + Number(discount_amount);
        } else {
          total_amount =
            total_amount + (total_amount * Number(discount_amount)) / 100;
        }
      }
      return (
        <p className="line-champ-1">
          ৳ {numberWithCommas(Number(total_amount))}
        </p>
      );
    },
  },
  {
    accessorKey: "discount_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Discount
        </Button>
      );
    },
    cell: ({ row }) => {
      const discount_amount = row.original.discount_amount;
      const discount_type = row.original.discount_type;
      return (
        <p className="line-champ-1">
          {discount_amount && discount_type
            ? discount_type === "FIXED"
              ? `৳ ${Number(discount_amount)}`
              : `${Number(discount_amount)}%`
            : 0}
        </p>
      );
    },
  },
  {
    accessorKey: "purchase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Purchase Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total = row.original.total;
      return (
        <p className="line-champ-1">৳ {numberWithCommas(Number(total))}</p>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Payment Method
        </Button>
      );
    },
    cell: ({ row }) => {
      const payment_method = row.original.payment_method;
      return <p className="line-champ-1">{payment_method}</p>;
    },
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Payment Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const payment_status = row.original.payment_status;
      return (
        <Badge variant={payment_status}>
          {snakeCaseToTitleCase(payment_status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Purchased By
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <UserAvatar
            className="size-6"
            fallbackClassName="text-sm"
            name={user.name}
          />
          <p className="line-champ-1">{user.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "purchase_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Purchase Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const purchase_date = row.original.purchase_date;
      return (
        <div>
          <p className="line-champ-1">
            {format(new Date(purchase_date), "dd/MM/yyyy")}
          </p>
        </div>
      );
    },
  },
];

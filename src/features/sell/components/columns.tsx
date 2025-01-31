"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, numberWithCommas, snakeCaseToTitleCase } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Sell } from "../types";

export const columns: ColumnDef<Sell>[] = [
  {
    accessorKey: "invoice_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Invoice Id
        </Button>
      );
    },
    cell: ({ row }) => {
      const invoice_id = row.original.invoice_id;

      return (
        <div>
          <p className="line-clamp-1">{invoice_id}</p>
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
          <p className="line-clamp-1 pe-2"> {products.length}</p>
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
                          ৳ {numberWithCommas(item.product.sell_price)} (Selling
                          Price)
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
                    </div>{" "}
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
    accessorKey: "sell",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Sell Amount
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
    accessorKey: "total_paid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Total Paid
        </Button>
      );
    },
    cell: ({ row }) => {
      const total_paid = Number(row.original.total_paid);
      return (
        <p className="line-champ-1">৳ {numberWithCommas(Number(total_paid))}</p>
      );
    },
  },
  {
    accessorKey: "due",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Due Amount
        </Button>
      );
    },
    cell: ({ row }) => {
      const sell_amount = Number(row.original.total);
      const due_amount = sell_amount - Number(row.original.total_paid);
      return (
        <p
          className={cn(
            "line-champ-1",
            Number(due_amount) > 0 ? "text-red-700 font-bold" : ""
          )}
        >
          ৳ {numberWithCommas(Number(due_amount))}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Customer
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <p className="line-champ-1">{name}</p>
        </div>
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
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Selling Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const created_at = row.original.created_at;
      return (
        <div>
          <p className="line-champ-1">{format(created_at, "dd/MM/yyyy")}</p>
        </div>
      );
    },
  },
];

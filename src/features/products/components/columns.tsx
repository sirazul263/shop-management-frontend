"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { UserAvatar } from "@/features/members/components/user-avatar";
import { DefaultAvatar } from "@/components/default-avatar";
import { Product } from "../types";
import { ProductActions } from "./product-actions";
import Image from "next/image";
import { numberWithCommas } from "@/lib/utils";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return <p className="line-clamp-1">{name}</p>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className="flex items-center gap-x-2 ">
          <DefaultAvatar
            className="size-8"
            fallbackClassName="text-sm"
            name={category.name}
            image={category.image || undefined}
          />
          <p className="line-clamp-1">{category.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const brand = row.original.brand;
      return (
        <div className="flex items-center gap-x-2 ">
          <DefaultAvatar
            className="size-8"
            fallbackClassName="text-sm"
            name={brand.name}
            image={brand.image || undefined}
          />
          <p className="line-clamp-1">{brand.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image
        </Button>
      );
    },
    cell: ({ row }) => {
      const image = row.original.image;
      return (
        <div className="flex items-center gap-x-2 ">
          {image ? (
            <div className="size-16 relative rounded-md overflow-hidden">
              <Image src={image} alt="Image" fill className="object-cover" />
            </div>
          ) : (
            <p>-----</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      return <p className="line-champ-1">{quantity}</p>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Unit Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.price;
      return (
        <p className="line-champ-1">৳ {numberWithCommas(Number(price))}</p>
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
          Created By
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      const updatedAt = row.original.updated_at;
      return (
        <div>
          <p className="line-champ-1">
            <span className="font-bold">Added on :</span>{" "}
            {format(createdAt, "dd/MM/yyyy HH:mm:ss")}
          </p>
          <p className="line-champ-1">
            <span className="font-bold">Last Updated :</span>{" "}
            {format(updatedAt, "dd/MM/yyyy HH:mm:ss")}
          </p>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ProductActions data={row.original}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </ProductActions>
      );
    },
  },
];

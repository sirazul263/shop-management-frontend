"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { UserAvatar } from "@/features/members/components/user-avatar";
import { Log } from "../types";

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Type
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center gap-x-2 ">
          <p className="line-clamp-1">{type}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "operation",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Operation
        </Button>
      );
    },
    cell: ({ row }) => {
      const operation = row.original.operation;
      return <p className="line-clamp-1">{operation}</p>;
    },
  },
  {
    accessorKey: "remark",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
        </Button>
      );
    },
    cell: ({ row }) => {
      const remark = row.original.remark;
      return <p className="line-clamp-1">{remark}</p>;
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
          Created On
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return (
        <p className="line-champ-1">
          {format(createdAt, "dd/MM/yyyy HH:mm:ss")}
        </p>
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
];

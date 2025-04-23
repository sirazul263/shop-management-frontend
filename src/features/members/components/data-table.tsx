"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Store } from "@/features/store/types";
import { RiAddCircleFill } from "react-icons/ri";
import { useCreateUserModal } from "../hooks/use-create-user-modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  stores: Store[];
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  stores,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const { open } = useCreateUserModal();

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div>
          <p className="mb-1 text-sm font-semibold">Search by User Name</p>
          <Input
            placeholder="Filter users..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold">Search by User Name</p>
          <Select
            value={
              (table.getColumn("stores")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table.getColumn("stores")?.setFilterValue(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Store" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((item, i) => (
                <SelectItem value={item.id} key={i}>
                  <p className="line-champ-1">{item.name}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Button
            className="h-12 md:mt-6"
            onClick={() => {
              table.getColumn("stores")?.setFilterValue("");
              table.getColumn("name")?.setFilterValue("");
            }}
          >
            Clear Filter
          </Button>
        </div>
        <div className="flex items-center justify-end md:mt-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={open}
          >
            <p className="text-xs uppercase font-bold text-neutral-500 ">
              Add New User
            </p>
            <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition ms-1" />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

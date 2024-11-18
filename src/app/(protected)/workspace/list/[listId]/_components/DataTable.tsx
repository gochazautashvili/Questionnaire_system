"use client";
import {
  flexRender,
  getCoreRowModel,
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
import { Column, List, UserRole } from "@prisma/client";
import { TListResponse } from "@/lib/types";
import { getColumns } from "./columns/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Pagination from "./Pagination";
import { usePage } from "../hooks/usePage";
import { Loader2 } from "lucide-react";

interface DataTableProps {
  list: List;
  columns: Column[];
  isPublic: boolean;
  role: UserRole;
}

export function DataTable({ columns, list, isPublic, role }: DataTableProps) {
  const { page } = usePage();
  const table_columns = getColumns(columns, isPublic, role);

  const { data, isLoading } = useQuery({
    queryKey: ["data_table", list.id, page],
    queryFn: () =>
      axios
        .get<TListResponse>(`/api/lists/${list.id}?page=${page}`)
        .then((res) => res.data),
  });

  const table = useReactTable({
    data: data?.data || [],
    columns: table_columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-nowrap border-r border-gray-400 last:border-none"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading && <TableLoading length={columns.length} />}
          {!isLoading &&
            table.getRowModel().rows?.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="border-r border-gray-400" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!isLoading && table.getRowModel().rows?.length < 1 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + 3}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination hasNextPage={data?.hasNextPage} />
    </>
  );
}

interface TableLoadingProps {
  length: number;
}

const TableLoading = ({ length }: TableLoadingProps) => {
  return (
    <TableRow>
      <TableCell colSpan={length + 3} className="h-24">
        <Loader2 className="mx-auto size-7 animate-spin text-primary" />
      </TableCell>
    </TableRow>
  );
};

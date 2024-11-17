"use client";
import {
  ColumnDef,
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
import { Form, Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import useListId from "@/hooks/use-listId";
import axios from "axios";
import LinkDialog from "./LinkDialog";
import { Loader2 } from "lucide-react";
import Navigator from "@/components/Navigator";

interface DataTableProps {
  columns: ColumnDef<Link>[];
}

export type TFormLinks = Form & { links: Link[] };

export function DataTable({ columns }: DataTableProps) {
  const listId = useListId();

  const { data, isLoading } = useQuery({
    queryKey: ["list_form_links", listId],
    queryFn: () =>
      axios
        .get<TFormLinks>(`/api/lists/${listId}/links`)
        .then((res) => res.data),
  });

  const table = useReactTable({
    data: data?.links || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <Navigator name="Back" left url={`/workspace/list/${listId}/form`} />
        <LinkDialog formId={data?.id} />
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
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="mx-auto size-6 animate-spin text-primary" />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && table.getRowModel().rows?.length < 1 && (
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
    </>
  );
}

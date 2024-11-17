"use client";
import { Link } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import LinkActions from "./LinkActions";
import Cell from "./Cell";

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "name",
    header: () => <div>Link name</div>,
    cell: ({ row }) => {
      return (
        <Cell
          type="name"
          linkId={row.original.id}
          value={row.getValue("name")}
        />
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div>Link location</div>,
    cell: ({ row }) => {
      return (
        <Cell
          type="location"
          linkId={row.original.id}
          value={row.getValue("location")}
        />
      );
    },
  },
  {
    accessorKey: "code",
    header: () => <div>Link code</div>,
    cell: ({ row }) => {
      return (
        <Cell
          type="code"
          linkId={row.original.id}
          value={row.getValue("code")}
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return <LinkActions link={row.original} />;
    },
  },
];

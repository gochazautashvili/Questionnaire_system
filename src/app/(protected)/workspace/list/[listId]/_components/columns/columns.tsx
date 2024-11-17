"use client";
import { TListData } from "@/lib/types";
import { Column, UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "./ColumnHeader";
import TableElements from "../TableElements";
import RowMoreButton from "../rows/RowMoreButton";
import { getWhatCanUsers } from "@/lib/utils";
import LinkElement from "../elements/LinkElement";

export const getColumns = (
  columns: Column[],
  isPublic: boolean,
  role: UserRole,
) => {
  const { canActions } = getWhatCanUsers(role);

  const generatedColumns = columns.map((column) => {
    return {
      accessorKey: column.id,
      header: () => (
        <ColumnHeader isPublic={isPublic} value={column.name} column={column} />
      ),
      cell: ({ row }) => (
        <TableElements
          row={row}
          type={column.type}
          isPublic={isPublic}
          columnId={column.id}
        />
      ),
    };
  }) as ColumnDef<TListData>[];

  return [...generatedColumns, ...generateStaticColumns(canActions, isPublic)];
};

const generateStaticColumns = (canActions: boolean, isPUblic: boolean) => {
  const linkName: ColumnDef<TListData> = {
    accessorKey: "link_name",
    header: () => <h1 className="font-bold text-black">Link name</h1>,
    cell: ({ row }) => (
      <LinkElement type="name" linkId={row.getValue("link_name")} />
    ),
  };

  const linkLocation: ColumnDef<TListData> = {
    accessorKey: "link_location",
    header: () => <h1 className="font-bold text-black">Link location</h1>,
    cell: ({ row }) => (
      <LinkElement type="location" linkId={row.getValue("link_location")} />
    ),
  };

  const actions: ColumnDef<TListData> = {
    accessorKey: "actions",
    header: () => <h1 className="text-center font-bold text-black">Actions</h1>,
    cell: ({ row }) => <RowMoreButton rowId={row.original.id} />,
  };

  if (canActions && isPUblic) {
    return [linkName, linkLocation, actions] as ColumnDef<TListData>[];
  }

  if (!isPUblic) {
    return [actions] as ColumnDef<TListData>[];
  }

  return [];
};

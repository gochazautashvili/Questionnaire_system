import EditInput from "@/components/EditInput";
import { TListData } from "@/lib/types";
import { Column, ColumnType } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import useEditRow from "../hooks/useEditRow";
import ChoiceElement from "./elements/ChoiceElement";
import UserElement from "./elements/UserElement";
import BigTextElement from "./elements/BigTextElement";
import RatingElement from "./elements/RatingElement";
import MultipleChoiceElement from "./elements/MultipleChoiceElement";
import NPSElement from "./elements/NPSElement";
import MatrixElement from "./elements/MatrixElement";

interface TableElementsProps {
  row: Row<TListData>;
  type: ColumnType;
  column: Column;
  isPublic: boolean;
}

const TableElements = ({ row, type, column, isPublic }: TableElementsProps) => {
  const { mutate } = useEditRow();

  const onEditText = (value: string) => {
    mutate({ columnId: column.id, row: row.original, value });
  };

  switch (type) {
    case "TEXT":
      return (
        <EditInput
          editable={!isPublic}
          onSubmit={onEditText}
          value={row.getValue(column.id) || "empty"}
        />
      );
    case "NUMBER":
      return (
        <EditInput
          editable={!isPublic}
          onSubmit={onEditText}
          value={row.getValue(column.id) || "empty"}
        />
      );
    case "USERS":
      return (
        <UserElement
          row={row.original}
          columnId={column.id}
          selectedId={row.getValue(column.id)}
        />
      );
    case "BIG_TEXT":
      return (
        <BigTextElement
          editable={!isPublic}
          row={row.original}
          columnId={column.id}
          value={row.getValue(column.id)}
        />
      );
    case "DATETIME":
      return <h1>{row.getValue(column.id)}</h1>;
    case "RATING":
      return (
        <RatingElement
          row={row.original}
          editable={!isPublic}
          columnId={column.id}
          rate_type={column.rate_type}
          rate_range={column.rate_range}
          value={row.getValue(column.id)}
        />
      );
    case "MULTIPLE_CHOICE":
      return (
        <MultipleChoiceElement
          editable={!isPublic}
          row={row.original}
          columnId={column.id}
          selectedIds={row.getValue(column.id)}
        />
      );
    case "CHOICE":
      return (
        <ChoiceElement
          editable={!isPublic}
          row={row.original}
          columnId={column.id}
          selectedId={row.getValue(column.id)}
        />
      );
    case "NPS":
      return (
        <NPSElement
          nps_end={column.nps_end}
          nps_start={column.nps_start}
          value={row.getValue(column.id)}
        />
      );
    case "MATRIX":
      return <MatrixElement value={row.getValue(column.id)} />;
    default:
      return (
        <p className="text-xs font-semibold text-destructive">
          Error: Delete this column and try again.
        </p>
      );
  }
};

export default TableElements;

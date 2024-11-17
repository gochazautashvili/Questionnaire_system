import EditInput from "@/components/EditInput";
import { TListData } from "@/lib/types";
import { ColumnType } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import useEditRow from "../hooks/useEditRow";
import ChoiceElement from "./elements/ChoiceElement";
import UserElement from "./elements/UserElement";
import BigTextElement from "./elements/BigTextElement";
import RatingElement from "./elements/RatingElement";

interface TableElementsProps {
  row: Row<TListData>;
  type: ColumnType;
  columnId: string;
  isPublic: boolean;
}

const TableElements = ({
  row,
  type,
  columnId,
  isPublic,
}: TableElementsProps) => {
  const { mutate } = useEditRow();
  const onEditText = (value: string) => {
    mutate({ columnId, row: row.original, value });
  };

  switch (type) {
    case "TEXT":
      return (
        <EditInput
          editable={!isPublic}
          onSubmit={onEditText}
          value={row.getValue(columnId) || "empty"}
        />
      );
    case "CHOICE":
      return (
        <ChoiceElement
          editable={!isPublic}
          row={row.original}
          columnId={columnId}
          selectedId={row.getValue(columnId)}
        />
      );
    case "USERS":
      return (
        <UserElement
          row={row.original}
          columnId={columnId}
          selectedId={row.getValue(columnId)}
        />
      );
    case "BIG_TEXT":
      return (
        <BigTextElement
          editable={!isPublic}
          row={row.original}
          columnId={columnId}
          value={row.getValue(columnId)}
        />
      );
    case "DATETIME":
      return <h1>{row.getValue(columnId)}</h1>;
    case "RATING":
      return (
        <RatingElement
          editable={!isPublic}
          row={row.original}
          columnId={columnId}
          value={row.getValue(columnId)}
        />
      );
    default:
      return "Error";
  }
};

export default TableElements;

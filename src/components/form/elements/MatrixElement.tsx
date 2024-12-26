import EditInput from "@/components/EditInput";
import { toast } from "@/hooks/use-toast";
import { TMatrixContent } from "@/lib/types";
import { parseJson } from "@/lib/utils";
import { edit_matrix } from "@/server/actions/form";
import { Plus, Trash, X } from "lucide-react";
import { useState, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";

interface MatrixElementProps {
  value: string;
  columnId: string;
  editable: boolean;
  text_color: string;
  border_color: string;
  onChange?: (e: string) => void;
}

interface TOnSelect {
  columnId: string;
  rowId: string;
}

type TOnEditEnum =
  | "edit_row"
  | "edit_column"
  | "create_row"
  | "create_column"
  | "delete_row"
  | "delete_column";

interface TOnEdit {
  id: string;
  value: string;
  type: TOnEditEnum;
}

interface ColumnsProps {
  columns: { id: string; value: string }[];
  onChange: (e: TOnEdit) => void;
  border_color: string;
  editable: boolean;
}

interface BodyProps {
  editable: boolean;
  border_color: string;
  content: TMatrixContent;
  onEdit: (e: TOnEdit) => void;
  onSelect: ({ columnId, rowId }: TOnSelect) => void;
}

interface TGetContent {
  content: TMatrixContent;
  type: TOnEditEnum;
  value: string;
  id: string;
}

const getContent = ({ content, type, id, value }: TGetContent) => {
  let matrix_table: TMatrixContent = content;

  switch (type) {
    case "edit_row":
      matrix_table = {
        columns: content.columns,
        rows: content.rows.map((rows) => {
          if (rows.id === id) return { ...rows, value };
          return rows;
        }),
      };
      break;
    case "edit_column":
      matrix_table = {
        rows: content.rows,
        columns: content.columns.map((column) => {
          if (column.id === id) return { ...column, value };

          return column;
        }),
      };
      break;
    case "create_column":
      matrix_table = {
        rows: content.rows,
        columns: [...content.columns, { id: uuidV4(), value }],
      };
      break;
    case "create_row":
      matrix_table = {
        rows: [...content.rows, { id: uuidV4(), selectedColumnId: "", value }],
        columns: content.columns,
      };
      break;
    case "delete_column":
      matrix_table = {
        rows: content.rows,
        columns: content.columns.filter((column) => column.id !== id),
      };
      break;
    case "delete_row":
      matrix_table = {
        rows: content.rows.filter((row) => row.id !== id),
        columns: content.columns,
      };
      break;
    default:
      break;
  }

  return matrix_table;
};

const MatrixElement = (e: MatrixElementProps) => {
  const [isLoading, startTransition] = useTransition();
  const { border_color, text_color, value, columnId, editable, onChange } = e;
  const [content, setContent] = useState(parseJson<TMatrixContent>(value));

  if (!content) return <p>Error. content not found: 404!</p>;

  const onSelect = ({ columnId, rowId }: TOnSelect) => {
    const newContent = {
      columns: content.columns,
      rows: content.rows.map((row) => {
        if (row.id === rowId) return { ...row, selectedColumnId: columnId };

        return row;
      }),
    };

    setContent(newContent);
    onChange?.(JSON.stringify(newContent));
  };

  const onEdit = ({ id, type, value }: TOnEdit) => {
    if (isLoading || !editable) return;

    const prevContent = content;
    const newContent = getContent({ content, id, type, value });

    setContent(newContent);
    const matrix_table = JSON.stringify(newContent);

    const data = { columnId, matrix_table };

    startTransition(() => {
      edit_matrix(data).then((res) => {
        toast({
          description: res.message,
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
        });

        if (res.column) {
          setContent(parseJson<TMatrixContent>(res.column.matrix_table));
        }

        if (!res.success) setContent(prevContent);
      });
    });
  };

  return (
    <div className="overflow-x-auto pb-1">
      <table
        style={{ color: text_color, borderColor: border_color }}
        className="w-full text-nowrap rounded-md border"
      >
        <Columns
          border_color={border_color}
          columns={content.columns}
          editable={editable}
          onChange={onEdit}
        />
        <Body
          onEdit={onEdit}
          content={content}
          editable={editable}
          onSelect={onSelect}
          border_color={border_color}
        />
        <tfoot>
          <tr>
            {editable && (
              <td
                colSpan={content.columns.length + 2}
                onClick={() =>
                  onEdit({ id: "", type: "create_row", value: "new row" })
                }
                className="cursor-pointer select-none border-t font-mono font-semibold hover:bg-primary/20"
                style={{ borderColor: border_color }}
              >
                <span className="flex items-center gap-2 px-1">
                  <Plus className="size-4" /> add row
                </span>
              </td>
            )}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MatrixElement;

// components
const Columns = (props: ColumnsProps) => {
  const { border_color, columns, editable, onChange } = props;

  return (
    <thead>
      <tr>
        <th
          style={{ borderColor: border_color }}
          className="border-b border-r px-2 font-mono text-sm font-bold"
        >
          Matrix Table
        </th>
        {columns.map((column) => (
          <th
            key={column.id}
            style={{ borderColor: border_color }}
            className="border-b border-r px-2"
          >
            <div className="flex items-center justify-between gap-5">
              {editable ? (
                <EditInput
                  editable={editable}
                  value={column.value}
                  onSubmit={(value) =>
                    onChange({ id: column.id, type: "edit_column", value })
                  }
                  class="h-6 rounded-none border-0 bg-none p-0 shadow-none outline-none"
                />
              ) : (
                <span>{column.value}</span>
              )}
              {editable && (
                <X
                  style={{ color: border_color }}
                  className="size-4 cursor-pointer hover:scale-110"
                  onClick={() =>
                    onChange({
                      id: column.id,
                      type: "delete_column",
                      value: "",
                    })
                  }
                />
              )}
            </div>
          </th>
        ))}
        {editable && (
          <th
            onClick={() =>
              onChange({ id: "", type: "create_column", value: "new column" })
            }
            className="cursor-pointer border-b px-2 font-mono font-semibold hover:bg-primary/20"
            style={{ borderColor: border_color }}
          >
            <Plus className="size-4" />
          </th>
        )}
      </tr>
    </thead>
  );
};

const Body = (props: BodyProps) => {
  const { border_color, content, editable, onEdit, onSelect } = props;
  const { columns, rows } = content;

  return (
    <tbody>
      {rows.map((row) => {
        return (
          <tr key={row.id}>
            <td
              style={{ borderColor: border_color }}
              className="border-b border-r px-2 text-sm font-medium"
            >
              {editable ? (
                <EditInput
                  key={row.id}
                  value={row.value}
                  editable={editable}
                  onSubmit={(value) =>
                    onEdit({ id: row.id, type: "edit_row", value })
                  }
                  class="rounded-none border-0 bg-none p-0 py-1 shadow-none outline-none"
                />
              ) : (
                <span style={{ borderColor: border_color }} key={row.id}>
                  {row.value}
                </span>
              )}
            </td>
            {columns.map((column) => {
              return (
                <td
                  key={column.id}
                  style={{ borderColor: border_color }}
                  className="border-b border-r px-2"
                >
                  <div
                    style={{ borderColor: border_color }}
                    onClick={() =>
                      onSelect({ columnId: column.id, rowId: row.id })
                    }
                    className="flex size-4 cursor-pointer items-center justify-center rounded-full border"
                  >
                    {row.selectedColumnId === column.id && (
                      <div className="size-3 rounded-full bg-primary" />
                    )}
                  </div>
                </td>
              );
            })}
            {editable && (
              <td
                onClick={() =>
                  onEdit({ id: row.id, type: "delete_row", value: "" })
                }
                className="cursor-pointer gap-2 border-b px-2 font-mono font-semibold hover:bg-primary/20"
                style={{ borderColor: border_color }}
              >
                <span className="flex items-center gap-2">
                  <Trash className="size-4" />
                </span>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

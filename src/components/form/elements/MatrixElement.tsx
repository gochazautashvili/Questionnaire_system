import EditInput from "@/components/EditInput";
import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { TMatrixContent } from "@/lib/types";
import { parseJson } from "@/lib/utils";
import { edit_matrix } from "@/server/actions/form";
import { useState, useTransition } from "react";

interface MatrixElementProps {
  value: string;
  columnId: string;
  editable: boolean;
  text_color: string;
  border_color: string;
  onChange?: () => void;
}

interface TOnSelect {
  columnId: string;
  rowId: string;
}

interface TOnChangeName {
  id: string;
  value: string;
  type: "row" | "column";
}

interface ColumnsProps {
  columns: { id: string; value: string }[];
  onChange: (e: TOnChangeName) => void;
  border_color: string;
  editable: boolean;
}

interface RowsProps {
  rows: { id: string; value: string; selectedColumnId: string }[];
  onChange: (e: TOnChangeName) => void;
  border_color: string;
  editable: boolean;
}

interface BodyProps {
  border_color: string;
  content: TMatrixContent;
  onSelect: ({ columnId, rowId }: TOnSelect) => void;
}

const MatrixElement = (props: MatrixElementProps) => {
  const listId = useListId();
  const [isLoading, startTransition] = useTransition();
  const { border_color, text_color, value, columnId, editable } = props;
  const [content, setContent] = useState(parseJson<TMatrixContent>(value));

  if (!content) return <p>Error. content not found: 404!</p>;

  const onSelect = ({ columnId, rowId }: TOnSelect) => {
    setContent({
      columns: content.columns,
      rows: content.rows.map((row) => {
        if (row.id === rowId) return { ...row, selectedColumnId: columnId };

        return row;
      }),
    });
  };

  const onChangeName = ({ id, type, value }: TOnChangeName) => {
    if (isLoading && !editable) return;

    let matrix_table: TMatrixContent = content;

    if (type === "column") {
      matrix_table = {
        rows: content.rows,
        columns: content.columns.map((column) => {
          if (column.id === id) return { ...column, value };

          return column;
        }),
      };
    }

    if (type === "row") {
      matrix_table = {
        columns: content.columns,
        rows: content.rows.map((rows) => {
          if (rows.id === id) return { ...rows, value };
          return rows;
        }),
      };
    }

    const data = {
      listId,
      columnId,
      matrix_table: JSON.stringify(matrix_table),
    };

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
      });
    });
  };

  return (
    <div
      style={{ color: text_color, borderColor: border_color }}
      className="flex w-full text-nowrap rounded-sm border"
    >
      <Rows
        border_color={border_color}
        onChange={onChangeName}
        rows={content.rows}
        editable={editable}
      />
      <div className="w-full">
        <Columns
          border_color={border_color}
          columns={content.columns}
          onChange={onChangeName}
          editable={editable}
        />
        <Body
          content={content}
          onSelect={onSelect}
          border_color={border_color}
        />
      </div>
    </div>
  );
};

export default MatrixElement;

// components
const Columns = (props: ColumnsProps) => {
  const { border_color, columns, editable, onChange } = props;

  return (
    <div className="flex w-full items-center">
      {columns.map((column) => (
        <EditInput
          editable={editable}
          key={column.id}
          value={column.value}
          onSubmit={(value) =>
            onChange({ id: column.id, type: "column", value })
          }
          styles={{ borderColor: border_color }}
          className="h-6 w-full border-b border-r px-2"
          class="h-6 w-full rounded-none bg-none p-0 px-2 shadow-none outline-none"
        />
      ))}
    </div>
  );
};

const Rows = (props: RowsProps) => {
  const { border_color, rows, editable, onChange } = props;

  return (
    <div className="flex flex-col">
      <p
        style={{ borderColor: border_color }}
        className="flex h-6 items-center justify-center border-b border-r px-2 font-mono text-sm font-semibold"
      >
        Matrix
      </p>
      {rows.map((row) => (
        <EditInput
          key={row.id}
          value={row.value}
          editable={editable}
          className="h-6 border-b border-r px-2"
          styles={{ borderColor: border_color }}
          onSubmit={(value) => onChange({ id: row.id, type: "row", value })}
          class="h-6 rounded-none bg-none p-0 px-2 shadow-none outline-none"
        />
      ))}
    </div>
  );
};

const Body = ({ content, border_color, onSelect }: BodyProps) => {
  const { columns, rows } = content;

  return (
    <div className="w-full">
      {rows.map((row) => {
        return (
          <div className="flex w-full items-center" key={row.id}>
            {columns.map((column) => {
              return (
                <div
                  key={column.id}
                  style={{ borderColor: border_color }}
                  className="flex h-6 w-full items-center border-b border-r px-2"
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
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

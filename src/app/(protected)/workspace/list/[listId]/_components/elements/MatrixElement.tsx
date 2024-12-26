import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TMatrixContent } from "@/lib/types";
import { parseJson } from "@/lib/utils";

interface MatrixElementProps {
  value: string;
}

interface ColumnsProps {
  columns: { id: string; value: string }[];
}

interface RowsProps {
  rows: { id: string; value: string; selectedColumnId: string }[];
}

interface BodyProps {
  content: TMatrixContent;
}

const MatrixElement = ({ value }: MatrixElementProps) => {
  const content = parseJson<TMatrixContent>(value);

  if (!content) return <Badge>answer not found</Badge>;

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Badge className="flex w-full justify-center">See answer</Badge>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        <div className="flex w-full text-nowrap rounded-sm border">
          <Rows rows={content.rows} />
          <div className="w-full overflow-x-auto">
            <Columns columns={content.columns} />
            <Body content={content} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MatrixElement;

const Columns = ({ columns }: ColumnsProps) => {
  return (
    <div className="flex w-full items-center">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex h-6 w-full items-center justify-between gap-3 border-b border-r px-2"
        >
          <span>{column.value}</span>
        </div>
      ))}
    </div>
  );
};

const Rows = ({ rows }: RowsProps) => {
  return (
    <div className="flex flex-col">
      <p className="flex h-6 items-center justify-center border-b border-r px-2 font-mono text-sm font-bold">
        Matrix
      </p>
      {rows.map((row) => (
        <span
          className="h-6 border-b border-r px-2 text-sm font-semibold"
          key={row.id}
        >
          {row.value}
        </span>
      ))}
    </div>
  );
};

const Body = ({ content }: BodyProps) => {
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
                  className="flex h-6 w-full items-center border-b border-r px-2"
                >
                  <div className="flex size-4 items-center justify-center rounded-full border">
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

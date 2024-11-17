import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import useListColumns from "../hooks/useListColumns";

interface ListColumnsProps {
  listId: string;
  columnIds: string[];
  handleSetColumnIds: (columnId: string) => void;
}

const ListColumns = (props: ListColumnsProps) => {
  const { columnIds, handleSetColumnIds, listId } = props;
  const { data: columns, isLoading } = useListColumns(listId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="h-6 w-full animate-pulse rounded-md bg-gray-400" />
        <div className="h-6 w-full animate-pulse rounded-md bg-gray-400" />
        <div className="h-6 w-full animate-pulse rounded-md bg-gray-400" />
      </div>
    );
  }

  return (
    <div className="grid max-h-[400px] grid-cols-2 gap-3 overflow-y-auto">
      {columns?.map((column) => (
        <FormLabel
          htmlFor={column.id}
          className="flex w-full items-center gap-1 rounded-md bg-slate-100 px-3 py-3"
        >
          <Checkbox
            id={column.id}
            checked={columnIds.includes(column.id)}
            onCheckedChange={() => handleSetColumnIds(column.id)}
          />
          <p className="line-clamp-1 font-semibold">{column.name}</p>
        </FormLabel>
      ))}
    </div>
  );
};

export default ListColumns;

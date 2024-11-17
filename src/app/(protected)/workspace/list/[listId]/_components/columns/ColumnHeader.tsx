import EditInput from "@/components/EditInput";
import { toast } from "@/hooks/use-toast";
import { edit_column } from "@/server/actions/list";
import { Column } from "@prisma/client";
import ColumnSettings from "./ColumnSettings";

interface ColumnHeaderProps {
  value: string;
  column: Column;
  isPublic: boolean;
}

const ColumnHeader = ({ value, column, isPublic }: ColumnHeaderProps) => {
  const onEdit = (name: string) => {
    edit_column({
      columnId: column.id,
      listId: column.listId,
      name,
    }).then((res) => {
      toast({
        title: res.success ? "Success" : "Error",
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <EditInput
        className="font-semibold capitalize text-black"
        value={value}
        onSubmit={onEdit}
      />
      <ColumnSettings column={column} isPublic={isPublic} />
    </div>
  );
};

export default ColumnHeader;

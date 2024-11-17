"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column } from "@prisma/client";
import { Settings2 } from "lucide-react";
import ColumnSheet from "./ColumnSheet";
import useUser from "@/hooks/use-user";
import { getWhatCanUsers } from "@/lib/utils";
import DeleteColumnDialog from "./DeleteColumnDialog";

interface ColumnSettingsProps {
  column: Column;
  isPublic: boolean;
}

const ColumnSettings = ({ column, isPublic }: ColumnSettingsProps) => {
  const { role } = useUser();

  const { canActions } = getWhatCanUsers(role);

  if (!canActions) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Settings2 className="size-5" />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[110px] flex-col gap-1 p-1">
        <ColumnSheet
          column={column}
          isPublic={isPublic}
          formId={column.formId || undefined}
        />
        <DeleteColumnDialog columnId={column.id} />
      </PopoverContent>
    </Popover>
  );
};

export default ColumnSettings;

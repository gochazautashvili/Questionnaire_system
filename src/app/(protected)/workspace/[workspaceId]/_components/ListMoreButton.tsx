import { MoreVertical } from "lucide-react";
import DeleteListDialog from "./DeleteListDialog";
import { List, UserRole } from "@prisma/client";
import CreateListDialog from "./CreateListDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getWhatCanUsers } from "@/lib/utils";

interface ListMoreButtonProps {
  list: List;
  role: UserRole;
}

const ListMoreButton = ({ list, role }: ListMoreButtonProps) => {
  const { canActions } = getWhatCanUsers(role);
  if (!canActions) return null;

  return (
    <Popover>
      <PopoverTrigger className="outline-none">
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="flex w-32 flex-col gap-2">
        <DeleteListDialog listId={list.id} />
        <CreateListDialog list={list} workspaceId={list.id} />
      </PopoverContent>
    </Popover>
  );
};

export default ListMoreButton;

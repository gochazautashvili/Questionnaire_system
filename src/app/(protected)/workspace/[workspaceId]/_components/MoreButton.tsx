import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import CreateListDialog from "./CreateListDialog";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";
import { getWorkspaceById } from "@/server/db/workspace";
import CreateWorkspaceDialog from "@/app/(protected)/_components/workspaces/CreateWorkspaceDialog";
import { getUser } from "@/lib/auth";
import { getWhatCanUsers } from "@/lib/utils";

interface MoreButtonProps {
  workspaceId: string;
}

const MoreButton = async ({ workspaceId }: MoreButtonProps) => {
  const workspace = await getWorkspaceById(workspaceId);
  const currentUser = await getUser();

  if (!workspace || !currentUser) return null;

  const { canActions } = getWhatCanUsers(currentUser.role);

  if (!canActions) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[150px] flex-col gap-2 p-1">
        <DeleteWorkspaceDialog
          organizationId={workspace.organizationId}
          workspaceId={workspace.id}
        />
        <CreateListDialog workspaceId={workspace.id} />
        <CreateWorkspaceDialog workspace={workspace} />
      </PopoverContent>
    </Popover>
  );
};

export default MoreButton;

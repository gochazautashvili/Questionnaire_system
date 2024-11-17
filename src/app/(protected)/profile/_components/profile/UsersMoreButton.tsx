import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import UserEditDialog from "./UserEditDialog";
import UserDeleteDialog from "./UserDeleteDialog";
import { User } from "@prisma/client";

interface UsersMoreButtonProps {
  user: User;
}

const UsersMoreButton = ({ user }: UsersMoreButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[100px] flex-col items-center gap-1 p-1">
        <UserEditDialog user={user} />
        <UserDeleteDialog userId={user.id} />
      </PopoverContent>
    </Popover>
  );
};

export default UsersMoreButton;

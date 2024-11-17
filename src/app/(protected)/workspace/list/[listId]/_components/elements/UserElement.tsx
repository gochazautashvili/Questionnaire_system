import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TListData } from "@/lib/types";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useSelectChoice from "../../hooks/useSelectChoice";
import useUser from "@/hooks/use-user";
import { cn, getWhatCanUsers } from "@/lib/utils";

interface UserElementProps {
  columnId: string;
  selectedId: string;
  row: TListData;
}

const UserElement = ({ columnId, row, selectedId }: UserElementProps) => {
  const currentUser = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["organization_users"],
    queryFn: () => axios.get<User[]>("/api/users").then((r) => r.data),
  });

  const { mutate } = useSelectChoice();

  if (isLoading) {
    return <Badge>loading...</Badge>;
  }

  if (!data) {
    return <Badge>Empty</Badge>;
  }

  const selectedUser = data.find((d) => d.id === selectedId);

  const { canActions } = getWhatCanUsers(currentUser.role);

  if (!canActions) {
    return <Badge>{selectedUser?.email || "Not Selected"}</Badge>;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Badge
          className={cn(
            selectedUser?.id === currentUser.id &&
              "bg-emerald-500 hover:bg-emerald-600",
          )}
        >
          {selectedUser?.email || "Not Selected"}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="flex max-h-[280px] w-fit flex-col items-center gap-1 overflow-y-auto p-1">
        {!data.length && (
          <h1 className="text-center text-sm text-destructive">
            You have&apos;t any user
          </h1>
        )}
        {data.map((user) => (
          <Badge
            key={user.id}
            className="w-full cursor-pointer"
            onClick={() => mutate({ choiceId: user.id, columnId, row, type: "user" })}
            variant={user.id === currentUser.id ? "secondary" : "default"}
          >
            {user.email}
          </Badge>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default UserElement;

"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import LinkDialog from "./LinkDialog";
import LinkDeleteDialog from "./LinkDeleteDialog";
import Navigator from "@/components/Navigator";
import useUser from "@/hooks/use-user";
import { getWhatCanUsers } from "@/lib/utils";

interface LinkActionsProps {
  link: Link;
}

const LinkActions = ({ link }: LinkActionsProps) => {
  const user = useUser();
  const { canActions } = getWhatCanUsers(user.role);

  if (!canActions) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="ml-auto mr-4 cursor-pointer text-right" />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[100px] flex-col items-center gap-1 p-1">
        <LinkDialog formId={link.formId} link={link} />
        <LinkDeleteDialog linkId={link.id} />
        <Navigator
          right
          name="View"
          className="w-full"
          url={`/public/form/${link.id}`}
        />
      </PopoverContent>
    </Popover>
  );
};

export default LinkActions;

import { PropsWithChildren } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PopoverCardProps extends PropsWithChildren {
  content: string;
}

const PopoverCard = ({ content, children }: PopoverCardProps) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="max-w-[150px] text-xs text-gray-500">
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCard;

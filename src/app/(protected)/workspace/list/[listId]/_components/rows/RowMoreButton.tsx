"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import DeleteRowButton from "./DeleteRowButton";

interface RowMoreButtonProps {
  rowId: string;
}

const RowMoreButton = ({ rowId }: RowMoreButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="mx-auto cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        <DeleteRowButton rowId={rowId} />
      </PopoverContent>
    </Popover>
  );
};

export default RowMoreButton;

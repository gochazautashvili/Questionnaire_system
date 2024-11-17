"use client";
import useChoices from "@/hooks/use-choices";
import CreateChoice from "./CreateChoice";
import { Badge } from "./ui/badge";
import { Trash } from "lucide-react";
import useDeleteChoice from "@/hooks/use-delete-choice";
import ColorPicker from "./ColorPicker";

interface ChoicesProps {
  columnId: string;
}

const Choices = ({ columnId }: ChoicesProps) => {
  const { data, isLoading } = useChoices(columnId);
  const { mutate } = useDeleteChoice(columnId);

  if (isLoading) {
    return (
      <div className="mt-3 flex flex-col gap-1">
        <div className="h-4 w-full rounded-md bg-gray-400" />
        <div className="h-4 w-full rounded-md bg-gray-400" />
        <div className="h-4 w-full rounded-md bg-gray-400" />
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-1">
      {data?.map((item) => (
        <Badge
          key={item.id}
          style={{ background: item.color }}
          className="flex items-center justify-between gap-4 py-1"
        >
          {item.name}
          <div className="flex items-center gap-2">
            <ColorPicker choice={item} />
            <Trash
              onClick={() => mutate(item.id)}
              className="size-4 cursor-pointer"
            />
          </div>
        </Badge>
      ))}
      <CreateChoice columnId={columnId} />
    </div>
  );
};

export default Choices;

import { colors } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Palette } from "lucide-react";
import useChoiceColor from "@/hooks/use-choice-color";
import { Choice } from "@prisma/client";
import { useState } from "react";

interface ColorPickerProps {
  choice: Choice;
}

const ColorPicker = ({ choice }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useChoiceColor(choice.columnId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Palette className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="grid max-w-[200px] grid-cols-4 gap-1 p-1">
        {colors.map((color, i) => (
          <div
            key={color}
            onClick={() => {
              mutate({ choiceId: choice.id, color });
              setOpen(false);
            }}
            className="flex size-8 cursor-pointer items-center justify-center rounded text-white"
            style={{ background: color }}
          >
            {choice.color === color ? "S" : i + 1}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Palette } from "lucide-react";
import useChoiceColor from "@/hooks/use-choice-color";
import { Choice } from "@prisma/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ColorPickerBox from "./ColorPickerBox";
import { colors } from "@/constants";

interface ColorPickerProps {
  choice: Choice;
}

const ColorPicker = ({ choice }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useChoiceColor(choice.columnId);
  const [selectedColor, setSelectedColor] = useState(choice.color);

  const onSelectColor = () => {
    mutate({ choiceId: choice.id, color: selectedColor });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Palette className="size-4" />
      </PopoverTrigger>
      <PopoverContent>
        <h1
          className="mb-4 flex h-8 w-full items-center justify-center rounded text-white"
          style={{ background: selectedColor }}
        >
          Selected color
        </h1>
        <div className="grid max-w-[200px] grid-cols-4 gap-1 p-1">
          {colors.map((color, i) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              className="flex size-8 cursor-pointer items-center justify-center rounded text-white"
              style={{ background: color }}
            >
              {choice.color === color ? "S" : i + 1}
            </div>
          ))}
        </div>
        <Input
          className="mt-2 h-8 w-full"
          placeholder="Enter here color..."
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <ColorPickerBox
          color={selectedColor}
          onSelectColor={(color: string) => setSelectedColor(color)}
        />
        <Button
          size="sm"
          type="button"
          onClick={onSelectColor}
          className="mt-2 w-full text-sm font-bold"
        >
          Select color
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;

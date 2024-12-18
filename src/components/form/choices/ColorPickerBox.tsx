import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";

interface ColorPickerBoxProps {
  color: string;
  onSelectColor: (color: string) => void;
}

const ColorPickerBox = ({ color, onSelectColor }: ColorPickerBoxProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="mt-2 w-full text-sm font-bold"
        >
          Color picker
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-20 p-1">
        <HexAlphaColorPicker color={color} onChange={onSelectColor} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPickerBox;

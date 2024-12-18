import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";

interface ColorPickerCardProps {
  name: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPickerCard = ({ color, name, onChange }: ColorPickerCardProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="w-full">
          {name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-20">
        <HexAlphaColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPickerCard;

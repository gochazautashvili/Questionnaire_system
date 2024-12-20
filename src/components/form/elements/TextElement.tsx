import { Input } from "@/components/ui/input";

interface TextElementProps {
  value?: string;
  border_color: string;
  onChange?: () => void;
}

const TextElement = ({ onChange, value, border_color }: TextElementProps) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder="Enter here..."
      style={{ borderColor: border_color }}
    />
  );
};

export default TextElement;

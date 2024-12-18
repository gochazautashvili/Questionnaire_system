import { Textarea } from "../ui/textarea";

interface TextareaElementProps {
  value?: string;
  border_color: string;
  onChange?: () => void;
}

const TextareaElement = ({
  onChange,
  value,
  border_color,
}: TextareaElementProps) => {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      className="resize-none"
      placeholder="Enter here..."
      style={{ borderColor: border_color }}
    />
  );
};

export default TextareaElement;

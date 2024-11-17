import { FieldValues, UseFormRegister } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface TextareaElementProps {
  register?: UseFormRegister<FieldValues>;
  columnId?: string;
}

const TextareaElement = ({ register, columnId }: TextareaElementProps) => {
  return (
    <Textarea
      {...register?.(columnId || "")}
      className="resize-none"
      placeholder="Enter here..."
    />
  );
};

export default TextareaElement;

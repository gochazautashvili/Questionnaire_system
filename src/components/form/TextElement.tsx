import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

interface TextElementProps {
  register?: UseFormRegister<FieldValues>;
  columnId?: string;
}

const TextElement = ({ register, columnId }: TextElementProps) => {
  return <Input {...register?.(columnId || "")} placeholder="Enter here..." />;
};

export default TextElement;

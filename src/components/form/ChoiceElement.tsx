import { Choice } from "@prisma/client";
import { Label } from "../ui/label";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ChoiceElementProps {
  choices: Choice[];
  register?: UseFormRegister<FieldValues>;
  columnId?: string;
}

const ChoiceElement = ({ choices, register, columnId }: ChoiceElementProps) => {
  if (!choices.length) {
    return <p className="text-sm text-destructive">There is not any choice</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {choices.map((choice) => (
        <div key={choice.id} className="flex items-center space-x-2">
          <input
            name="radio"
            type="radio"
            id={choice.id}
            value={choice.id}
            {...register?.(columnId || "")}
            defaultChecked={choices[0].id === choice.id}
          />
          <Label htmlFor={choice.id}>{choice.name}</Label>
        </div>
      ))}
    </div>
  );
};

export default ChoiceElement;

import { Choice } from "@prisma/client";
import { Label } from "../ui/label";

interface ChoiceElementProps {
  choices: Choice[];
  border_color: string;
  onChange?: () => void;
}

const ChoiceElement = ({
  choices,
  onChange,
  border_color,
}: ChoiceElementProps) => {
  if (!choices.length) {
    return <p className="text-sm text-destructive">There is not any choice</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {choices.map((choice) => {
        if (choice.type === "NORMAL") {
          return (
            <div key={choice.id} className="flex items-center space-x-2">
              <input
                name="radio"
                type="radio"
                title="radio"
                id={choice.id}
                value={choice.id}
                onChange={onChange}
                style={{ borderColor: border_color }}
                defaultChecked={choices[0].id === choice.id}
              />
              <Label htmlFor={choice.id}>{choice.name}</Label>
            </div>
          );
        }
      })}

      {choices.map((choice) => {
        if (choice.type === "OTHER") {
          return (
            <input
              id={choice.id}
              key={choice.id}
              onChange={onChange}
              style={{ borderColor: border_color }}
              placeholder="Enter here other answer..."
              className="max-w-[200px] border-b border-black bg-transparent px-2 py-1 text-sm outline-none"
            />
          );
        }
      })}
    </div>
  );
};

export default ChoiceElement;

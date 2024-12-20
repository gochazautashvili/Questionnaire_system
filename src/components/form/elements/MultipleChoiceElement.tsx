import { Label } from "@/components/ui/label";
import { Choice } from "@prisma/client";

interface MultipleChoiceElementProps {
  choices: Choice[];
  border_color: string;
  onChange?: () => void;
}

const MultipleChoiceElement = (props: MultipleChoiceElementProps) => {
  const { choices, onChange, border_color } = props;

  if (!choices.length) {
    return <p className="text-sm text-destructive">There is not any choice</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {choices.map((choice) => (
        <div key={choice.id} className="flex items-center space-x-2">
          <input
            id={choice.id}
            name="checkbox"
            type="checkbox"
            title="checkbox"
            value={choice.id}
            onChange={onChange}
            style={{ borderColor: border_color }}
            defaultChecked={choices[0].id === choice.id}
          />
          <Label htmlFor={choice.id}>{choice.name}</Label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceElement;

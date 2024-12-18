import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface NumberInputProps {
  max: number;
  min: number;
  value: number;
  onChange: (num: number) => void;
}

const NumberInput = ({ onChange, value, max, min }: NumberInputProps) => {
  return (
    <div className="flex h-8 items-center justify-between gap-1 rounded-md border">
      <RateButton
        disabled={value <= min}
        onClick={() => {
          if (value > min) {
            onChange(value - 1);
          }
        }}
      >
        <Minus />
      </RateButton>
      <div>{value}</div>
      <RateButton
        disabled={value >= max}
        onClick={() => {
          if (value < max) {
            onChange(value + 1);
          }
        }}
      >
        <Plus />
      </RateButton>
    </div>
  );
};

export default NumberInput;

interface RateButtonProps extends PropsWithChildren {
  disabled: boolean;
  onClick: () => void;
}

const RateButton = ({ onClick, disabled, children }: RateButtonProps) => {
  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={onClick}
      className="h-full"
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

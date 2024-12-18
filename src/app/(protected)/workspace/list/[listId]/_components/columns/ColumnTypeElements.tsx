import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { column_rate_types } from "@/constants";
import { TColumnSchema } from "@/server/validations";
import { ColumnType } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { PropsWithChildren } from "react";
import { Control } from "react-hook-form";

interface ColumnTypeElementsProps {
  control: Control<TColumnSchema>;
  type: ColumnType;
  show: boolean;
}

const ColumnTypeElements = (props: ColumnTypeElementsProps) => {
  const { control, type } = props;

  switch (type) {
    case "RATING":
      return (
        <div className="grid grid-cols-2 gap-2">
          <CostumeSelect
            control={control}
            label="Rate range*"
            data={column_rate_types}
          />
          <FormField
            control={control}
            name="rate_range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate range*</FormLabel>
                <FormControl>
                  <div className="flex h-8 items-center justify-between gap-1">
                    <RateButton
                      value={field.value}
                      onClick={() => field.onChange(field.value - 1)}
                    >
                      <Minus />
                    </RateButton>
                    <Input
                      min="3"
                      max="10"
                      {...field}
                      value={field.value}
                      placeholder="Rate range..."
                      className="h-full w-full text-center"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                    <RateButton
                      value={field.value}
                      onClick={() => field.onChange(field.value + 1)}
                    >
                      <Plus />
                    </RateButton>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );
    case "CHOICE":
    case "MULTIPLE_CHOICE":
      return (
        <FormDescription>
          After create this columns you need to add them choices
        </FormDescription>
      );
    case "USERS":
      return (
        <FormDescription>
          This type is only for list, you can&apos;t create this column on form
        </FormDescription>
      );
    default:
      return;
  }
};

export default ColumnTypeElements;

interface CostumeSelectProps {
  control: Control<TColumnSchema>;
  label: string;
  data: { name: string; value: string }[];
}

const CostumeSelect = ({ control, label, data }: CostumeSelectProps) => {
  return (
    <FormField
      control={control}
      name="rate_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Rate type..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface RateButtonProps extends PropsWithChildren {
  value: number;
  onClick: () => void;
}

const RateButton = ({ onClick, value, children }: RateButtonProps) => {
  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={onClick}
      className="h-full"
      disabled={value >= 10}
    >
      {children}
    </Button>
  );
};

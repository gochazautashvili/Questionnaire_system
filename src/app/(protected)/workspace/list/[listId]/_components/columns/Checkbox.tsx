import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { TColumnSchema } from "@/server/validations";
import { Control } from "react-hook-form";

interface CheckboxProps {
  label: string;
  className?: string;
  description?: string;
  name: keyof TColumnSchema;
  control: Control<TColumnSchema, any>;
}

const FormCheckbox = (props: CheckboxProps) => {
  const { control, label, name, className, description } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
            className,
          )}
        >
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;

"use client";
import { Choice, Column } from "@prisma/client";
import TextElement from "./TextElement";
import TextareaElement from "./TextareaElement";
import ChoiceElement from "./ChoiceElement";
import RatingElement from "./RatingElement";
import { Input } from "../ui/input";
import MultipleChoiceElement from "./MultipleChoiceElement";
import { ControllerRenderProps } from "react-hook-form";
import { TGeneratedForm } from "@/server/validations";
import { TStyles } from "@/lib/types";

interface FormElementsProps {
  styles: TStyles;
  column: Column & { choices: Choice[] };
  field?: ControllerRenderProps<TGeneratedForm, string>;
}

const FormElements = ({ column, field, styles }: FormElementsProps) => {
  const onRatingChange = (rate: number) => {
    field?.onChange(rate);
  };

  switch (column.type) {
    case "TEXT":
      return (
        <TextElement
          onChange={field?.onChange}
          value={field?.value?.toString()}
          border_color={styles.border_color}
        />
      );
    case "BIG_TEXT":
      return (
        <TextareaElement
          onChange={field?.onChange}
          value={field?.value?.toString()}
          border_color={styles.border_color}
        />
      );
    case "CHOICE":
      return (
        <ChoiceElement
          border_color={styles.border_color}
          onChange={field?.onChange}
          choices={column.choices}
        />
      );
    case "RATING":
      return (
        <RatingElement
          rate_type={column.rate_type}
          rate_range={column.rate_range}
          onRatingChange={onRatingChange}
        />
      );
    case "DATETIME":
      return (
        <Input
          type="date"
          className="w-full"
          onChange={field?.onChange}
          value={field?.value as string}
          style={{ borderColor: styles.border_color }}
        />
      );
    case "NUMBER":
      return (
        <Input
          type="number"
          className="w-full"
          placeholder="Enter here..."
          value={field?.value as number}
          style={{ borderColor: styles.border_color }}
          onChange={(e) => field?.onChange(e.target.valueAsNumber)}
        />
      );
    case "MULTIPLE_CHOICE":
      return (
        <MultipleChoiceElement
          choices={column.choices}
          onChange={field?.onChange}
          border_color={styles.border_color}
        />
      );
    default:
      return null;
  }
};

export default FormElements;

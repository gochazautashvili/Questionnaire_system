"use client";
import { Choice, Column } from "@prisma/client";
import ChoiceElement from "./elements/ChoiceElement";
import { Input } from "../ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { TGeneratedForm } from "@/server/validations";
import { TStyles } from "@/lib/types";
import RatingElement from "./elements/RatingElement";
import NPSElement from "./elements/NPSElement";
import TextElement from "./elements/TextElement";
import TextareaElement from "./elements/TextareaElement";
import MultipleChoiceElement from "./elements/MultipleChoiceElement";
import MatrixElement from "./elements/MatrixElement";

interface FormElementsProps {
  styles: TStyles;
  type: "Edit" | "Public";
  column: Column & { choices: Choice[] };
  field?: ControllerRenderProps<TGeneratedForm, string>;
}

const FormElements = ({ column, field, styles, type }: FormElementsProps) => {
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
          name={column.name}
        />
      );
    case "RATING":
      return (
        <RatingElement
          rate_type={column.rate_type}
          rate_range={column.rate_range}
          onRatingChange={onRatingChange}
          border_color={styles.border_color}
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
          name={column.name}
          choices={column.choices}
          onChange={field?.onChange}
          border_color={styles.border_color}
        />
      );
    case "NPS":
      return (
        <NPSElement
          nps_end={column.nps_end}
          onChange={onRatingChange}
          nps_start={column.nps_start}
          text_color={styles.text_color}
          border_color={styles.border_color}
        />
      );
    case "MATRIX":
      return (
        <MatrixElement
          columnId={column.id}
          editable={type === "Edit"}
          onChange={field?.onChange}
          value={column.matrix_table}
          text_color={styles.text_color}
          border_color={styles.border_color}
        />
      );
    default:
      return (
        <p className="text-xs font-semibold text-destructive">
          Error: Delete this columns and try again.
        </p>
      );
  }
};

export default FormElements;

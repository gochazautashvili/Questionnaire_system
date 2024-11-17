"use client";
import { Choice, Column } from "@prisma/client";
import TextElement from "./TextElement";
import TextareaElement from "./TextareaElement";
import ChoiceElement from "./ChoiceElement";
import RatingElement from "./RatingElement";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FormElementsProps {
  column: Column & { choices: Choice[] };
  form?: UseFormReturn<FieldValues, any, undefined>;
}

const FormElements = ({ column, form }: FormElementsProps) => {
  const onRatingChange = (rate: number) => {
    form?.setValue(column.id, rate);
  };

  switch (column.type) {
    case "TEXT":
      return <TextElement columnId={column.id} register={form?.register} />;
    case "BIG_TEXT":
      return <TextareaElement columnId={column.id} register={form?.register} />;
    case "CHOICE":
      return (
        <ChoiceElement
          columnId={column.id}
          register={form?.register}
          choices={column.choices}
        />
      );
    case "RATING":
      return <RatingElement onRatingChange={onRatingChange} />;
    default:
      return null;
  }
};

export default FormElements;

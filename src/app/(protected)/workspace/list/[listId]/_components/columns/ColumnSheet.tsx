"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { column_schema, TColumnSchema } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column, ColumnType } from "@prisma/client";
import { Pen, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useState, useTransition } from "react";
import { column_action } from "@/server/actions/list";
import { toast } from "@/hooks/use-toast";
import useListId from "@/hooks/use-listId";
import LoadingButton from "@/components/LoadingButton";
import Choices from "../../../../../../../components/form/choices/Choices";
import ColumnTypeElements from "./ColumnTypeElements";
import FormCheckbox from "./Checkbox";
import { column_types, default_matrix_table } from "@/constants";

interface ColumnEditSheetProps {
  column?: Column;
  formId?: string;
  isPublic: boolean;
}

const ColumnSheet = ({ column, formId, isPublic }: ColumnEditSheetProps) => {
  const listId = useListId();
  const [isLoading, startTransition] = useTransition();
  const [type, setType] = useState<ColumnType>(column?.type || "TEXT");

  const form = useForm<TColumnSchema>({
    resolver: zodResolver(column_schema),
    defaultValues: {
      name: column?.name || "",
      type: column?.type || "TEXT",
      nps_end: column?.nps_end || "End",
      required: column?.required || true,
      rate_range: column?.rate_range || 5,
      nps_start: column?.nps_start || "Start",
      rate_type: column?.rate_type || "STARS",
      matrix_table: column?.matrix_table || default_matrix_table,
      withFormColumn: column?.use_type === "BOTH" || formId ? true : false,
    },
  });

  const onSubmit = (values: TColumnSchema) => {
    startTransition(() => {
      column_action({ listId, values, columnId: column?.id, formId }).then(
        (res) => {
          toast({
            title: res.success ? "Success" : "Error",
            variant: res.success ? "default" : "destructive",
            description: res.message,
          });

          if (res.success) form.reset();
        },
      );
    });
  };

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" className="justify-start">
          {column ? (
            <>
              <Pen /> Edit
            </>
          ) : (
            <>
              <Plus /> Create column
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{column?.name || "Create column"}</SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here..." {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column type*</FormLabel>
                  <Select
                    onValueChange={(value: ColumnType) => {
                      field.onChange(value);
                      setType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select column type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {column_types.map((type) => {
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            {type.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ColumnTypeElements
              type={type}
              control={form.control}
              show={!!column}
            />
            {formId && type !== "USERS" && isPublic && (
              <div className="mt-3 flex flex-col gap-2">
                <FormCheckbox
                  name="withFormColumn"
                  control={form.control}
                  label="Add to the form as well"
                />
                <FormCheckbox
                  name="required"
                  label="Required"
                  control={form.control}
                />
              </div>
            )}
            <LoadingButton
              className="fixed bottom-10 self-end"
              isLoading={isLoading}
              type="submit"
            >
              {column ? "Edit column" : "Create column"}
            </LoadingButton>
          </form>
        </Form>
        {(type === "CHOICE" || type === "MULTIPLE_CHOICE") && column && (
          <Choices columnId={column.id} type={type} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ColumnSheet;

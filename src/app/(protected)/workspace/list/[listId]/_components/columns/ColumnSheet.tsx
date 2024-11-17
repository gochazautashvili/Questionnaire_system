"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { column_schema, TColumnSchema, types } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column } from "@prisma/client";
import { Pen, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { useTransition } from "react";
import { column_action } from "@/server/actions/list";
import { toast } from "@/hooks/use-toast";
import useListId from "@/hooks/use-listId";
import LoadingButton from "@/components/LoadingButton";
import Choices from "../../../../../../../components/Choices";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnEditSheetProps {
  column?: Column;
  formId?: string;
  isPublic: boolean;
}

const ColumnSheet = ({ column, formId, isPublic }: ColumnEditSheetProps) => {
  const listId = useListId();
  const [isLoading, startTransition] = useTransition();
  const form = useForm<TColumnSchema>({
    resolver: zodResolver(column_schema),
    defaultValues: {
      name: column?.name || "",
      type: column?.type || "TEXT",
      withFormColumn: column?.use_type === "BOTH" || false,
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select column type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!column && form.getValues("type") === "CHOICE" && (
                    <FormDescription>
                      After create this columns you need to add them choices
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {formId && form.getValues("type") !== "USERS" && isPublic && (
              <FormField
                control={form.control}
                name="withFormColumn"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>With form column</FormLabel>
                      <FormDescription>
                        This will create column also for form
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
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
        {form.getValues("type") === "CHOICE" && column && (
          <Choices columnId={column.id} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ColumnSheet;

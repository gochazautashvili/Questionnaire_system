"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Column, Form } from "@prisma/client";
import {
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { form_schema, TFormSchema } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/LoadingButton";
import { Plus } from "lucide-react";
import { useState } from "react";
import ListColumns from "./ListColumns";
import { Separator } from "@/components/ui/separator";
import { create_form } from "@/server/actions/form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CreateFormButtonProps {
  listId: string;
  currentForm?: Form & { columns: Column[] };
}

const CreateFormButton = (data: CreateFormButtonProps) => {
  const { listId, currentForm } = data;

  const router = useRouter();
  const [columnIds, setColumnIds] = useState(
    currentForm?.columns.flatMap((c) => c.id) || [],
  );

  const form = useForm<TFormSchema>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      title: currentForm?.title || "",
      subtitle: currentForm?.subtitle || "",
    },
  });

  const handleSetColumnIds = (columnId: string) => {
    if (columnIds.includes(columnId)) {
      setColumnIds((prev) => prev.filter((p) => p !== columnId));
    } else {
      setColumnIds((prev) => [...prev, columnId]);
    }
  };

  const onSubmit = async (values: TFormSchema) => {
    const res = await create_form({ columnIds, listId, values });

    toast({
      title: res.success ? "Success" : "Error",
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });

    if (res.url) router.push(res.url);
    if (res.success) {
      form.reset();
      setColumnIds([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus /> {currentForm ? "Edit form" : "Create form"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentForm ? "Edit form" : "Create form"} for user responses
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form subtitle*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="mt-3 font-semibold">
              Select list columns for form
              <Separator className="h-[2px] w-full rounded-md bg-emerald-500" />
            </h1>
            {!currentForm && (
              <ListColumns
                handleSetColumnIds={handleSetColumnIds}
                columnIds={columnIds}
                listId={listId}
              />
            )}
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              className="self-end"
              type="submit"
            >
              {currentForm ? "Edit form" : "Create form"}
            </LoadingButton>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;

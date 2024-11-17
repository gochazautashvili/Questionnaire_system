"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { list_schema, TList_schema } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { useState, useTransition } from "react";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { create_list } from "@/server/actions/list";
import { toast } from "@/hooks/use-toast";
import { List } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateListDialogProps {
  workspaceId: string;
  list?: List;
}

const CreateListDialog = ({ workspaceId, list }: CreateListDialogProps) => {
  const [open, setOpen] = useState(false);
  const [withForm, setWithForm] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const form = useForm<TList_schema>({
    resolver: zodResolver(list_schema),
    defaultValues: {
      title: list?.title || "",
      description: list?.description || "",
      isPublic: true,
    },
  });

  const onSubmit = (values: TList_schema) => {
    const data = { values, workspaceId, listId: list?.id, withForm };

    startTransition(() => {
      create_list(data).then((res) => {
        toast({
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });

        if (res.success) {
          form.reset();
          setOpen(false);
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full justify-start" variant="outline">
          <Pen /> {list ? "Edit list" : "Create list"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{list ? "Edit" : "Create"} workspace list</DialogTitle>
          <DialogDescription>
            Ypu can create lists for good data reading, and user experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter list title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List description*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter list description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!list && (
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>List for user responses</FormLabel>
                      <FormDescription>
                        If you wont to get user responses check this field
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            )}
            {!list && form.getValues("isPublic") && (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={withForm}
                    onCheckedChange={() => setWithForm(!withForm)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Create with form</FormLabel>
                  <FormDescription>
                    If you want to automatically create form check this field
                  </FormDescription>
                </div>
              </FormItem>
            )}
            <LoadingButton
              type="submit"
              className="self-end"
              isLoading={isLoading}
            >
              {list ? "Edit list" : "Crete list"}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListDialog;

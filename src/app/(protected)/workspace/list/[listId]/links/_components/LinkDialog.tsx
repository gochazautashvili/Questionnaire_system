import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { link_schema, TLinkSchema } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@prisma/client";
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
import LoadingButton from "@/components/LoadingButton";
import useCreateLink from "../hooks/use-create-link";
import useEditLink from "../hooks/use-edit-link";
import { Pen } from "lucide-react";
import { useState } from "react";

interface LinkDialogProps {
  formId: string | undefined;
  link?: Link;
}

const LinkDialog = ({ formId, link }: LinkDialogProps) => {
  const [open, setOpen] = useState(false);
  const create = useCreateLink();
  const edit = useEditLink();
  const form = useForm<TLinkSchema>({
    resolver: zodResolver(link_schema),
    defaultValues: {
      name: link?.name || "",
      location: link?.location || "",
      code: link?.code || undefined,
    },
  });

  const onSubmit = (values: TLinkSchema) => {
    if (link) {
      edit.mutate(
        { linkId: link.id, values },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
          },
        },
      );
    }

    if (formId && !link) {
      create.mutate(
        { formId, values },
        {
          onSuccess() {
            setOpen(false);
            form.reset();
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={link && "w-full justify-start"}
        >
          <Pen /> {link ? "Edit" : "Create link"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link location*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link code*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here..." {...field} />
                  </FormControl>
                  <FormDescription>
                    If you wont you can set unique code, but if you don&apos;t
                    set here it will automatically generate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              isLoading={create.isLoading || edit.isLoading}
              disabled={!form.formState.isValid}
              className="self-end"
              type="submit"
            >
              {link ? "Edit" : "Create"} link
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkDialog;

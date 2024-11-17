"use client";
import { TUserSchema, user_schema } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
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
import { edit_name } from "@/server/actions/user";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "@/components/LoadingButton";
import { UserPen } from "lucide-react";

interface EditUserProps {
  user: User;
}

const EditUser = ({ user }: EditUserProps) => {
  const form = useForm<TUserSchema>({
    resolver: zodResolver(user_schema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = async (data: TUserSchema) => {
    const res = await edit_name({ name: data.name, userId: user.id });

    toast({
      title: res.success ? "Success" : "Error",
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });
  };

  return (
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
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input placeholder="name..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          disabled={form.getValues("name") === user.name}
          isLoading={form.formState.isSubmitting}
          className="self-end"
          RightIcon={UserPen}
          type="submit"
        >
          Edit Name
        </LoadingButton>
      </form>
    </Form>
  );
};

export default EditUser;

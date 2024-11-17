"use client";
import { password_schema, TEditPassword } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { KeyRound } from "lucide-react";
import { edit_password } from "@/server/actions/user";
import { toast } from "@/hooks/use-toast";
import PasswordInput from "@/components/PasswordInput";

const EditPassword = () => {
  const form = useForm<TEditPassword>({
    resolver: zodResolver(password_schema),
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

  const onSubmit = async (values: TEditPassword) => {
    const res = await edit_password({ ...values });

    toast({
      title: res.success ? "Success" : "Error",
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });

    if (res.success) form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your old password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your new password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
          RightIcon={KeyRound}
          className="self-end"
          type="submit"
        >
          Edit Password
        </LoadingButton>
      </form>
    </Form>
  );
};

export default EditPassword;

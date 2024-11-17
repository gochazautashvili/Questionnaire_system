"use client";
import { sign_up_schema, TSign_up_schema } from "@/server/validations";
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
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import LoadingButton from "@/components/LoadingButton";
import { sign_up } from "@/server/actions/auth";
import { toast } from "@/hooks/use-toast";
import PasswordInput from "@/components/PasswordInput";

const SignUp = () => {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<TSign_up_schema>({
    resolver: zodResolver(sign_up_schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TSign_up_schema) => {
    startTransition(() => {
      sign_up(values).then((res) => {
        toast({
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });

        if (res.success) form.reset();
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="Enter password..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isLoading} type="submit" className="self-end">
          Sign up
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignUp;

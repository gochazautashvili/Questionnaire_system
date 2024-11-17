"use client";
import { sign_in_schema, TSign_in_schema } from "@/server/validations";
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
import { sign_in } from "@/server/actions/auth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<TSign_in_schema>({
    resolver: zodResolver(sign_in_schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TSign_in_schema) => {
    startTransition(() => {
      sign_in(values).then((res) => {
        toast({
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });

        if (res.success) form.reset();
        if (res.redirect) router.push("/");
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
          Sign in
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignIn;

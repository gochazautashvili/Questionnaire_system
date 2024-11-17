"use client";
import LoadingButton from "@/components/LoadingButton";
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
import { toast } from "@/hooks/use-toast";
import { create_user } from "@/server/actions/user";
import { person_schema, roles, TPersonSchema } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

interface CreateUserProps {
  organizationId: string;
  userId: string;
}

const CreateUser = ({ organizationId, userId }: CreateUserProps) => {
  const form = useForm<TPersonSchema>({
    resolver: zodResolver(person_schema),
    defaultValues: {
      name: "",
      email: "",
      role: "MEMBER"
    },
  });

  const onSubmit = async (values: TPersonSchema) => {
    const res = await create_user({
      values,
      organizationId,
      profileId: userId,
    });

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
        <h1 className="text-xl font-bold">
          Create organization users
          <Separator className="h-[2px] rounded-md bg-emerald-500" />
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter here..." {...field} />
              </FormControl>
              <FormDescription>
                This is your created user public display name.
              </FormDescription>
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
                <Input type="email" placeholder="Enter here..." {...field} />
              </FormControl>
              <FormDescription>
                This is your created user email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is user roles, user can do multiple thing but and you can
                select what they can
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
          RightIcon={UserRoundPlus}
          className="self-end"
          type="submit"
        >
          Create user
        </LoadingButton>
      </form>
    </Form>
  );
};

export default CreateUser;

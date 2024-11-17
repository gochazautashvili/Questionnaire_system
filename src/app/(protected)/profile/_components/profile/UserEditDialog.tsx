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
import { Pen, UserPen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { person_schema, roles, TPersonSchema } from "@/server/validations";
import { User } from "@prisma/client";
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
import { edit_user } from "@/server/actions/user";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import useUser from "@/hooks/use-user";

interface UserEditDialogProps {
  user: User;
}

const UserEditDialog = ({ user }: UserEditDialogProps) => {
  const { id } = useUser();
  const [open, setOpen] = useState(false);
  const form = useForm<TPersonSchema>({
    resolver: zodResolver(person_schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const onSubmit = async (values: TPersonSchema) => {
    const res = await edit_user({ profileId: id, userId: user.id, values });

    toast({
      title: res.success ? "Success" : "Error",
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });

    if (res.success) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full justify-start" variant="outline">
          <Pen /> Edit
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
                    <Input
                      type="email"
                      placeholder="Enter here..."
                      {...field}
                    />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                    This is user roles, user can do multiple thing but and you
                    can select what they can
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
              RightIcon={UserPen}
              className="self-end"
              type="submit"
            >
              Edit user
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;

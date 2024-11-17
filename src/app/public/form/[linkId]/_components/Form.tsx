"use client";
import FormElements from "@/components/form/FormElements";
import LoadingButton from "@/components/LoadingButton";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { TLinkInclude } from "@/lib/types";
import { send_user_response } from "@/server/actions/link";
import { useForm } from "react-hook-form";

interface FormProps {
  link: TLinkInclude;
}
const Form = ({ link }: FormProps) => {
  const form = useForm();

  const onSubmit = async (values: { [x: string]: string }) => {
    const res = await send_user_response({
      listId: link.form.listId,
      linkId: link.id,
      values,
    });

    toast({
      title: res.success ? "Success" : "Error",
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });
  };

  return (
    <form
      className="mx-auto my-10 flex w-full max-w-[700px] flex-col gap-4 rounded-md bg-stone-50 p-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold">{link.form.title}</h1>
        <p className="text-sm font-semibold text-gray-500">
          {link.form.subtitle}
        </p>
      </div>
      {link.form.columns.map((column) => {
        return (
          <div className="flex flex-col gap-1" key={column.id}>
            <Label className="font-semibold" htmlFor={column.id}>
              {column.name}
            </Label>
            <FormElements form={form} column={column} />
          </div>
        );
      })}
      <LoadingButton isLoading={form.formState.isSubmitting} type="submit">
        Submit
      </LoadingButton>
    </form>
  );
};

export default Form;

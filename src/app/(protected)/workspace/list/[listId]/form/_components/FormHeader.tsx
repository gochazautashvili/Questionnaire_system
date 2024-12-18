"use client";
import EditInput from "@/components/EditInput";
import { toast } from "@/hooks/use-toast";
import { TStyles } from "@/lib/types";
import { edit_form_header } from "@/server/actions/form";
import { useTransition } from "react";

interface FormHeaderProps {
  title: string;
  listId: string;
  styles: TStyles;
  subtitle: string;
}

interface TData {
  value: string;
  type: "title" | "subtitle";
}

const FormHeader = ({ title, subtitle, listId, styles }: FormHeaderProps) => {
  const [isLoading, startTransition] = useTransition();

  const handelEdit = ({ type, value }: TData) => {
    startTransition(() => {
      edit_form_header({ listId, value, type }).then(({ message, success }) => {
        toast({
          description: message,
          title: success ? "Success" : "Error",
          variant: success ? "default" : "destructive",
        });
      });
    });
  };

  return (
    <div className="mb-4 text-center">
      <EditInput
        value={title}
        editable={!isLoading}
        className="text-xl font-bold"
        inputClassname="w-full text-center"
        styles={{ fontSize: styles.title_size }}
        onSubmit={(value) => handelEdit({ value, type: "title" })}
      />
      <EditInput
        value={subtitle}
        editable={!isLoading}
        inputClassname="w-full text-center"
        styles={{ fontSize: styles.subtitle_size }}
        className="text-sm font-semibold opacity-70"
        onSubmit={(value) => handelEdit({ value, type: "subtitle" })}
      />
    </div>
  );
};

export default FormHeader;

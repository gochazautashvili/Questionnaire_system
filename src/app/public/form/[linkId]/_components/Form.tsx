"use client";
import FormElements from "@/components/form/FormElements";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "@/hooks/use-toast";
import { TLinkInclude } from "@/lib/types";
import { send_user_response } from "@/server/actions/link";
import { generateFormSchema, TGeneratedForm } from "@/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormWrapper,
} from "@/components/ui/form";
import { useQueryState } from "nuqs";
import Image from "next/image";

interface FormProps {
  link: TLinkInclude;
}

const Form = ({ link }: FormProps) => {
  const [linkType] = useQueryState("link_type", { defaultValue: "link" });
  const { form } = link;

  const styles = {
    logo: form.form_styles?.logo || "",
    title_size: form.form_styles?.title_size || 20,
    background: form.form_styles?.background || "",
    text_color: form.form_styles?.text_color || "",
    border_size: form.form_styles?.border_size || 1,
    button_color: form.form_styles?.button_color || "",
    border_color: form.form_styles?.border_color || "",
    subtitle_size: form.form_styles?.subtitle_size || 12,
    button_text: form.form_styles?.button_text || "Submit",
    form_background: form.form_styles?.form_background || "",
    background_image: form.form_styles?.background_image || "",
    form_border_radius: form.form_styles?.form_border_radius || 0,
    form_background_image: form.form_styles?.form_background_image || "",
  };

  const generatedForm = useForm<TGeneratedForm>({
    resolver: zodResolver(generateFormSchema(link.form.columns)),
    defaultValues: link.form.columns.reduce((acc, column) => {
      switch (column.type) {
        case "CHOICE":
          acc[column.id] = column.choices[0].id;
          break;
        case "RATING":
          acc[column.id] = 1;
          break;
        case "NUMBER":
          acc[column.id] = 0;
          break;
        default:
          acc[column.id] = "";
          break;
      }

      return acc;
    }, {} as TGeneratedForm),
  });

  const onSubmit = async (values: TGeneratedForm) => {
    if (!linkType) return;

    const res = await send_user_response({
      listId: link.form.listId,
      linkId: link.id,
      linkType,
      values,
    });

    toast({
      title: res.success ? "Success" : "Error",
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });

    if (res.success) generatedForm.reset();
  };

  return (
    <FormWrapper {...generatedForm}>
      <section
        className="relative h-screen w-full py-10"
        style={{ background: styles.background }}
      >
        {styles.background_image && (
          <Image
            fill
            alt="Wallpaper"
            src={styles.background_image}
            className="size-full object-cover"
          />
        )}
        <form
          className="relative mx-auto w-full max-w-[700px] overflow-hidden p-6"
          onSubmit={generatedForm.handleSubmit(onSubmit)}
          style={{
            color: styles.text_color,
            borderWidth: styles.border_size,
            borderColor: styles.border_color,
            background: styles.form_background,
            borderRadius: styles.form_border_radius,
          }}
        >
          {styles.form_background_image && (
            <Image
              fill
              alt="Form Wallpaper"
              src={styles.form_background_image}
              className="size-full object-cover"
            />
          )}
          {styles.logo && (
            <Image
              width={80}
              height={80}
              alt="Wallpaper"
              src={styles.logo}
              className="absolute left-4 top-4 z-20 size-10 object-cover"
            />
          )}
          <div className="relative z-10 flex flex-col gap-4">
            <div className="mb-4 text-center">
              <h1
                style={{ fontSize: styles.title_size }}
                className="text-xl font-bold"
              >
                {link.form.title}
              </h1>
              <p
                style={{ fontSize: styles.subtitle_size }}
                className="text-sm font-semibold opacity-80"
              >
                {link.form.subtitle}
              </p>
            </div>
            {link.form.columns.map((column) => {
              return (
                <FormField
                  key={column.id}
                  name={column.id}
                  control={generatedForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{column.name}</FormLabel>
                      <FormControl>
                        <FormElements
                          type="Public"
                          field={field}
                          styles={styles}
                          column={column}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            <LoadingButton
              style={{ background: styles.button_color }}
              isLoading={generatedForm.formState.isSubmitting}
              type="submit"
            >
              {styles.button_text}
            </LoadingButton>
          </div>
        </form>
      </section>
    </FormWrapper>
  );
};

export default Form;

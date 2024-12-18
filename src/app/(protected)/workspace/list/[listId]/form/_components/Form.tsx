"use client";
import FormElements from "@/components/form/FormElements";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "./Navbar";
import FormHeader from "./FormHeader";
import ColumnSettings from "../../_components/columns/ColumnSettings";
import { TFormInclude, TStyles } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";

interface FormProps {
  form: TFormInclude;
}

const Form = ({ form }: FormProps) => {
  const [styles, setStyles] = useState<TStyles>({
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
  });

  interface TEditStyles {
    key: keyof TStyles;
    value: string | number;
  }

  const handleEditStyles = ({ key, value }: TEditStyles) => {
    setStyles((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section
      className="absolute left-0 top-0 h-full w-full p-2"
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
      <div className="relative">
        <Navbar
          styles={styles}
          formId={form.id}
          listId={form.listId}
          handleEditStyles={handleEditStyles}
        />
        <div
          style={{
            color: styles.text_color,
            borderWidth: styles.border_size,
            borderColor: styles.border_color,
            background: styles.form_background,
            borderRadius: styles.form_border_radius,
          }}
          className="relative mx-auto w-full max-w-[700px] overflow-hidden rounded-md"
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
          <div className="relative z-10 flex flex-col gap-4 p-4">
            <FormHeader
              title={form.title}
              listId={form.listId}
              subtitle={form.subtitle}
              styles={styles}
            />
            {form.columns.map((column) => (
              <div key={column.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Label className="font-semibold">{column.name}</Label>
                  <ColumnSettings isPublic={true} column={column} />
                </div>
                <FormElements styles={styles} key={column.id} column={column} />
              </div>
            ))}
            <Button
              style={{ background: styles.button_color }}
              className="self-end"
            >
              {styles.button_text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;

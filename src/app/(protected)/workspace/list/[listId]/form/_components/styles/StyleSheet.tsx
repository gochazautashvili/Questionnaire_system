"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TStyles, TUploadImageButtonType } from "@/lib/types";
import { PaintBucket } from "lucide-react";
import ColorPickerCard from "./ColorPickerCard";
import NumberInput from "@/components/NumberInput";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/LoadingButton";
import { useTransition } from "react";
import { edit_form_styles, upload_file } from "@/server/actions/form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ImageUploadButton from "../../../_components/ImageUploadButton";

interface StyleSheetProps {
  formId: string;
  styles: TStyles;
  handleEditStyles: ({}: {
    key: keyof TStyles;
    value: string | number;
  }) => void;
}

interface TOnUpload {
  url: string;
  type: TUploadImageButtonType;
}

const StyleSheet = ({ handleEditStyles, styles, formId }: StyleSheetProps) => {
  const [isLoading, startTRansition] = useTransition();

  const onSave = () => {
    startTRansition(() => {
      edit_form_styles({ formId, styles }).then((res) => {
        toast({
          description: res.message,
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
        });
      });
    });
  };

  const onUpload = ({ type, url }: TOnUpload) => {
    if (url === "" || !url) return;

    upload_file({ formId, type, url }).then(() => {});
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <PaintBucket /> Styles
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto px-2">
        <SheetHeader>
          <SheetTitle>Form Styles</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div>
            <Label className="text-xs font-semibold">Background</Label>
            <ColorPickerCard
              name="Background"
              color={styles.background}
              onChange={(value: string) =>
                handleEditStyles({ key: "background", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Form background</Label>
            <ColorPickerCard
              name="Form background"
              color={styles.form_background}
              onChange={(value: string) =>
                handleEditStyles({ key: "form_background", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Border color</Label>
            <ColorPickerCard
              name="Border color"
              color={styles.border_color}
              onChange={(value: string) =>
                handleEditStyles({ key: "border_color", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Text color</Label>
            <ColorPickerCard
              name="Text color"
              color={styles.text_color}
              onChange={(value: string) =>
                handleEditStyles({ key: "text_color", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Button background</Label>
            <ColorPickerCard
              name="Button background"
              color={styles.button_color}
              onChange={(value: string) =>
                handleEditStyles({ key: "button_color", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Border size</Label>
            <NumberInput
              min={0}
              max={10}
              value={styles.border_size}
              onChange={(value: number) =>
                handleEditStyles({ key: "border_size", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Title size</Label>
            <NumberInput
              min={16}
              max={70}
              value={styles.title_size}
              onChange={(value: number) =>
                handleEditStyles({ key: "title_size", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Subtitle size</Label>
            <NumberInput
              min={8}
              max={32}
              value={styles.subtitle_size}
              onChange={(value: number) =>
                handleEditStyles({ key: "subtitle_size", value })
              }
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Button text</Label>
            <Input
              className="Enter here..."
              value={styles.button_text}
              onChange={(e) =>
                handleEditStyles({ key: "button_text", value: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <Label className="text-xs font-semibold">
            Form border radius: {styles.form_border_radius}px
          </Label>
          <Slider
            step={1}
            max={100}
            defaultValue={[styles.form_border_radius]}
            onValueChange={(num) =>
              handleEditStyles({ key: "form_border_radius", value: num[0] })
            }
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <ImageUploadButton
            id={formId}
            width={1920}
            height={640}
            type="background_image"
            name="Background image"
            url={styles.background_image}
            onUpload={(value: string) => {
              handleEditStyles({ key: "background_image", value });
              onUpload({ type: "background_image", url: value });
            }}
          />
          <ImageUploadButton
            id={formId}
            width={1240}
            height={640}
            type="form_background_image"
            name="Form background image"
            url={styles.form_background_image}
            onUpload={(value: string) => {
              handleEditStyles({ key: "form_background_image", value });
              onUpload({ type: "form_background_image", url: value });
            }}
          />
          <ImageUploadButton
            name="Logo"
            type="logo"
            id={formId}
            width={100}
            height={100}
            url={styles.logo}
            onUpload={(value: string) => {
              handleEditStyles({ key: "logo", value });
              onUpload({ type: "logo", url: value });
            }}
          />
        </div>
        <LoadingButton
          onClick={onSave}
          isLoading={isLoading}
          className="mt-10 w-full"
        >
          Save
        </LoadingButton>
      </SheetContent>
    </Sheet>
  );
};

export default StyleSheet;

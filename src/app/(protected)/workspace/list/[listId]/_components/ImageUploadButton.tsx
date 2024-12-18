"use client";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { resizeFile } from "@/lib/utils";
import DeleteImageButton from "./DeleteImageButton";
import { TUploadImageButtonType } from "@/lib/types";

interface ImageUploadButtonProps {
  id?: string;
  url?: string;
  name: string;
  width: number;
  height: number;
  type: TUploadImageButtonType;
  onUpload: (url: string) => void;
}

const ImageUploadButton = (props: ImageUploadButtonProps) => {
  const { name, onUpload, url, height, width, type, id } = props;
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("image", {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `questionnaire_${crypto.randomUUID()}.${extension}`,
          { type: file.type },
        );
      });

      return renamedFiles;
    },
    onClientUploadComplete: (event) => {
      onUpload(event[0].serverData.url);

      toast({
        title: "Success",
        description: "Image successfully uploaded",
      });
    },
    onUploadProgress: setProgress,
    onUploadBegin: () => setProgress(1),
    onUploadError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const handleStartUpload = async (file: File | undefined) => {
    if (!file) return;

    const resizedFile = (await resizeFile({ file, height, width })) as File;

    startUpload([resizedFile]);
  };

  if (url && id) {
    return (
      <div className="relative size-full">
        <DeleteImageButton
          id={id}
          url={url}
          type={type}
          onDelete={() => onUpload("")}
        />
        <Label className="text-xs font-bold">{name}</Label>
        <Image
          src={url}
          width={300}
          height={300}
          loading="eager"
          alt="uploaded image"
          className="rounded-md bg-slate-400 object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <input
        max={1}
        ref={ref}
        type="file"
        accept="image/*"
        multiple={false}
        className="hidden"
        title="upload image"
        disabled={isUploading}
        onChange={(e) => handleStartUpload(e.target.files?.[0])}
      />
      <Button
        size="sm"
        type="button"
        variant="outline"
        className="w-full"
        disabled={isUploading}
        onClick={() => ref.current?.click()}
      >
        {isUploading ? (
          <div className="flex w-full flex-col">
            {progress}%
            <Progress value={progress} />
          </div>
        ) : (
          name
        )}
      </Button>
    </>
  );
};

export default ImageUploadButton;

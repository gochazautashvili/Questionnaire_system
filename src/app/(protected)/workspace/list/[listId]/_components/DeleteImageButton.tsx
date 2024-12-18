import { toast } from "@/hooks/use-toast";
import { TUploadImageButtonType } from "@/lib/types";
import { delete_image } from "@/server/actions/form";
import { X, Loader2 } from "lucide-react";
import { useTransition } from "react";

interface DeleteImageButtonProps {
  id: string;
  url: string;
  onDelete: () => void;
  type: TUploadImageButtonType;
}

const DeleteImageButton = (props: DeleteImageButtonProps) => {
  const { onDelete, url, id, type } = props;
  const [isLoading, startTransition] = useTransition();

  const handleDelete = () => {
    if (isLoading) return;

    startTransition(() => {
      delete_image({ url, id, type }).then((res) => {
        toast({
          description: res.message,
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
        });

        if (res.success) onDelete();
      });
    });
  };

  return (
    <span className="absolute right-3 top-8 cursor-pointer rounded-full border border-white bg-black/50 p-1 text-white">
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <X className="size-4" onClick={handleDelete} />
      )}
    </span>
  );
};

export default DeleteImageButton;

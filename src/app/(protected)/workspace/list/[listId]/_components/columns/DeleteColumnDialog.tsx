import LoadingButton from "@/components/LoadingButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { delete_column } from "@/server/actions/list";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";

interface DeleteColumnDialogProps {
  columnId: string;
}

const DeleteColumnDialog = ({ columnId }: DeleteColumnDialogProps) => {
  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const listId = useListId();

  const handleDelete = () => {
    startTransition(() => {
      delete_column({ columnId, listId }).then((res) => {
        toast({
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });
      });
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="justify-start">
          <Trash /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            variant="destructive"
            isLoading={isLoading}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteColumnDialog;

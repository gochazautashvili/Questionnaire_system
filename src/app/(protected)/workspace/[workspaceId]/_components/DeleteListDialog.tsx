"use client";
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
import { toast } from "@/hooks/use-toast";
import { delete_list } from "@/server/actions/list";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";

interface DeleteListDialogProps {
  listId: string;
}

const DeleteListDialog = ({ listId }: DeleteListDialogProps) => {
  const [isLoading, startLoading] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startLoading(() => {
      delete_list(listId).then((res) => {
        toast({
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });

        if (res.success) setOpen(false);
      });
    });
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Trash className="size-4" /> Delete list
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete all the data in this list
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            isLoading={isLoading}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-500/90"
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteListDialog;

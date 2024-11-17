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
import useUser from "@/hooks/use-user";
import { delete_user } from "@/server/actions/user";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";

interface UserDeleteDialogProps {
  userId: string;
}

const UserDeleteDialog = ({ userId }: UserDeleteDialogProps) => {
  const { id } = useUser();
  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      delete_user({ profileId: id, userId }).then((res) => {
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Trash /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This user will be deleted
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            isLoading={isLoading}
            onClick={handleDelete}
            variant="destructive"
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDeleteDialog;

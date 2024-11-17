"use client";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { create_workspace } from "@/server/actions/workspace";
import { Workspace } from "@prisma/client";
import { Pen, PencilRuler } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

interface CreateWorkspaceDialogProps {
  workspace?: Workspace;
}

const CreateWorkspaceDialog = ({ workspace }: CreateWorkspaceDialogProps) => {
  const [title, setTitle] = useState(workspace?.title || "");
  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    startTransition(() => {
      create_workspace({
        title: title.trim(),
        workspaceId: workspace?.id,
      }).then((res) => {
        toast({
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });

        if (res.url) router.push(res.url);
        if (res.success) {
          setOpen(false);
          setTitle("");
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={workspace ? "justify-start" : ""}
          variant={workspace && "outline"}
          size={workspace && "sm"}
        >
          {workspace ? <PencilRuler /> : <Pen />}
          {workspace ? "Edit" : "Create"} workspace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {workspace ? "Edit" : "Create new"} workspace
          </DialogTitle>
          <DialogDescription>
            If you need new workspace for easy work, you can make in here
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Workspace name*</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter workspace name..."
            />
          </div>
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={!title.length}
          >
            {workspace ? "Edit" : "Create"} Workspace
          </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;

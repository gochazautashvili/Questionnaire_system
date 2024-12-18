"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import LinkDialog from "./LinkDialog";
import LinkDeleteDialog from "./LinkDeleteDialog";
import Navigator from "@/components/Navigator";
import useUser from "@/hooks/use-user";
import { getWhatCanUsers } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QRCodeBox from "react-qr-code";

interface LinkActionsProps {
  link: Link;
}

const LinkActions = ({ link }: LinkActionsProps) => {
  const user = useUser();
  const { canActions } = getWhatCanUsers(user.role);

  if (!canActions) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="ml-auto mr-4 cursor-pointer text-right" />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col items-center gap-1 p-1">
        <LinkDialog formId={link.formId} link={link} />
        <LinkDeleteDialog linkId={link.id} />
        <Navigator
          right
          name="Preview"
          url={`/public/form/${link.id}?link_type=link`}
          className="w-full justify-start"
        />
        <QrCode url={`/public/form/${link.id}`} />
      </PopoverContent>
    </Popover>
  );
};

export default LinkActions;

interface TQrCode {
  url: string;
}

const QrCode = ({ url }: TQrCode) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start">
          QR code
        </Button>
      </DialogTrigger>
      <DialogContent className="size-[300px]">
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <QRCodeBox
          additive="replace"
          className="h-full w-full"
          value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${url}?link_type=qr_code`}
        />
      </DialogContent>
    </Dialog>
  );
};

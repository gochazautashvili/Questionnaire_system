"use client";
import { KeyboardEventHandler, LegacyRef, useRef, useState } from "react";
import { cn, getWhatCanUsers } from "@/lib/utils";
import { useClickAway } from "react-use";
import useUser from "@/hooks/use-user";
import { Textarea } from "./ui/textarea";

interface EditInputProps {
  value: string;
  className?: string;
  editable: boolean;
  onSubmit: (text: string) => void;
}

const EditTextarea = ({
  onSubmit,
  value,
  className,
  editable,
}: EditInputProps) => {
  const ref: LegacyRef<HTMLTextAreaElement> = useRef(null);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(value);
  const user = useUser();

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      onSubmit(text);
      setEdit(false);
    }
  };

  useClickAway(ref, () => setEdit(false));

  const { canActions } = getWhatCanUsers(user.role);

  if (edit) {
    return (
      <Textarea
        ref={ref}
        autoFocus
        value={text}
        onKeyDown={onKeyDown}
        onChange={(e) => setText(e.target.value)}
        className="h-[200px] w-full border-primary outline-none"
      />
    );
  }

  return (
    <h1
      onDoubleClick={() => {
        if (!canActions || !editable) return;
        setEdit(true);
      }}
      className={cn(className, "", value === "empty" && "text-gray-400")}
    >
      {value}
    </h1>
  );
};

export default EditTextarea;

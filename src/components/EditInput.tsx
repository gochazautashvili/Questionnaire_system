"use client";
import {
  CSSProperties,
  KeyboardEventHandler,
  LegacyRef,
  useRef,
  useState,
} from "react";
import { Input } from "./ui/input";
import { cn, getWhatCanUsers } from "@/lib/utils";
import { useClickAway } from "react-use";
import useUser from "@/hooks/use-user";

interface EditInputProps {
  value: string;
  class?: string;
  editable?: boolean;
  className?: string;
  styles?: CSSProperties;
  onSubmit: (text: string) => void;
}

const EditInput = (props: EditInputProps) => {
  const {
    editable = true,
    className,
    onSubmit,
    styles,
    value,
    class: inputClass,
  } = props;

  const ref: LegacyRef<HTMLInputElement> = useRef(null);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(value);
  const user = useUser();

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onSubmit(text);
      setEdit(false);
    }
  };

  useClickAway(ref, () => setEdit(false));

  const { canActions } = getWhatCanUsers(user.role);

  if (edit) {
    return (
      <Input
        ref={ref}
        autoFocus
        value={text}
        style={styles}
        onKeyDown={onKeyDown}
        onChange={(e) => setText(e.target.value)}
        className={cn("h-8 w-auto border-primary outline-none", inputClass)}
      />
    );
  }

  return (
    <h1
      style={styles}
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

export default EditInput;

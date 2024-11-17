"use client";

import { ClipboardCheck, Copy, Loader2 } from "lucide-react";
import { useState } from "react";

interface CopyPasswordProps {
  password: string;
}

type TStatus = "idle" | "pending" | "copied";

const CopyPassword = ({ password }: CopyPasswordProps) => {
  const [status, setStatus] = useState<TStatus>("idle");

  const handleCopy = async () => {
    setStatus("pending");
    await navigator.clipboard.writeText(password);
    setStatus("copied");

    setTimeout(() => {
      setStatus("idle");
    }, 1300);
  };

  if (status === "pending") {
    return (
      <span className="mt-2 flex cursor-pointer items-center gap-2 to-gray-500 text-xs font-bold text-primary">
        <Loader2 className="size-4 animate-spin" /> Copied
      </span>
    );
  }

  if (status === "copied") {
    return (
      <span className="mt-2 flex cursor-pointer items-center gap-2 to-gray-500 text-xs font-bold text-primary">
        <ClipboardCheck className="size-4" /> Copied
      </span>
    );
  }

  return (
    <span
      onClick={handleCopy}
      className="mt-2 flex cursor-pointer items-center gap-2 to-gray-500 text-xs font-bold text-primary w-fit"
    >
      <Copy className="size-4" />
      Copy password for authorization
    </span>
  );
};

export default CopyPassword;

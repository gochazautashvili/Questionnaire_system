"use client";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { error, isLoading } = useQuery({
    queryKey: ["email_verify"],
    queryFn: () => axios.get(`/api/email/verify?token=${token}`),
  });

  if (isLoading) {
    return <Loader2 className="size-8 animate-spin" />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <Image
          src="/error_icon.png"
          alt="verify error icon"
          width={60}
          height={60}
        />
        <h1 className="text-2xl text-destructive">Error</h1>
        <p>{getErrorMessage(error)}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Image
        src="/success_icon.png"
        alt="verify success icon"
        width={60}
        height={60}
      />
      <h1>Email successfully verified</h1>
      <Button asChild>
        <Link href="/auth">Back to sign in page</Link>
      </Button>
    </div>
  );
};

export default VerifyEmail;

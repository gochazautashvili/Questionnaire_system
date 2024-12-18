"use client";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "@/hooks/use-toast";
import { sign_in_demo_user } from "@/server/actions/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const DemoUserAuthButton = () => {
  const [isLoading, startLoading] = useTransition();
  const router = useRouter();

  const signIN = () => {
    startLoading(() => {
      sign_in_demo_user().then((res) => {
        toast({
          description: res.message,
          title: res.success ? "Success" : "Error",
          variant: res.success ? "default" : "destructive",
        });

        if (res.success) router.push("/");
      });
    });
  };

  return (
    <LoadingButton
      type="button"
      onClick={signIN}
      variant="outline"
      isLoading={isLoading}
    >
      Sign in with demo user
    </LoadingButton>
  );
};

export default DemoUserAuthButton;

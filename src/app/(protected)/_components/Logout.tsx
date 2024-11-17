"use client";
import LoadingButton from "@/components/LoadingButton";
import { sign_out } from "@/server/actions/auth";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

const Logout = () => {
  const [isLoading, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      sign_out();
    });
  };

  return (
    <LoadingButton
      type="submit"
      variant="outline"
      RightIcon={LogOut}
      isLoading={isLoading}
      onClick={handleLogout}
      className="mt-1 w-full"
    >
      Logout
    </LoadingButton>
  );
};

export default Logout;

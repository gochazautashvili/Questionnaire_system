import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const user = await getUser();

  if (user) redirect("/");

  return (
    <main className="flex h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;

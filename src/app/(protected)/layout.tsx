import UserProvider from "@/context/UserProvider";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import Sidebar from "./_components/Sidebar";
import { getIsDefaultPassword } from "@/lib/utils";
import Alert from "@/components/Alert";

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const user = await getUser();

  if (!user) redirect("/auth");

  const isDefaultPassword = getIsDefaultPassword({
    email: user.email,
    password: user.hash_password,
  });

  return (
    <div className="relative flex h-screen w-full">
      {isDefaultPassword && <Alert />}
      <Sidebar user={user} />
      <main className="h-full w-full overflow-x-hidden p-6">
        <div className="relative h-full w-full overflow-y-auto rounded-lg bg-slate-50 p-6">
          <UserProvider user={user}>{children}</UserProvider>
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;

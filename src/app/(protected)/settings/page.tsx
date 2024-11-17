import { getUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import DeleteUserButton from "./DeleteUserButton";

const SettingsPage = async () => {
  const user = await getUser();

  if (!user || user.role !== "OWNER") return notFound();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-6xl font-semibold">Coming soon!</h1>
      <DeleteUserButton />
    </div>
  );
};

export default SettingsPage;

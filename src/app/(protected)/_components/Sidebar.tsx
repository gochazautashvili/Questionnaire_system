import { Separator } from "@/components/ui/separator";
import CreateWorkspaceDialog from "./workspaces/CreateWorkspaceDialog";
import Workspaces from "./workspaces/Workspaces";
import { Suspense } from "react";
import { User } from "@prisma/client";
import UserButton from "./user/UserButton";
import Link from "next/link";
import { getWhatCanUsers } from "@/lib/utils";

interface SidebarProps {
  user: User;
}

const Sidebar = ({ user }: SidebarProps) => {
  const { canActions } = getWhatCanUsers(user.role);

  return (
    <aside className="sticky left-0 top-0 z-50 flex h-screen min-w-[240px] flex-col bg-slate-50 px-5 py-4 shadow-md">
      <h1 className="mb-5 text-center text-2xl font-bold text-primary">
        <Link href="/">Questionnaire</Link>
        <Separator className="h-1 w-full rounded-md bg-emerald-600" />
      </h1>
      {canActions && <CreateWorkspaceDialog />}
      <div className="mb-4 mt-10 flex flex-col gap-4">
        <h1 className="font-bold">
          Workspaces
          <Separator className="h-1 w-full rounded-md bg-emerald-500" />
        </h1>
        <Suspense fallback={<WorkspacesLoading />}>
          <Workspaces orgId={user.organizationId} />
        </Suspense>
      </div>
      <UserButton user={user} />
    </aside>
  );
};

export default Sidebar;

const WorkspacesLoading = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="h-8 w-full rounded-md bg-gray-400" key={i} />
      ))}
    </div>
  );
};

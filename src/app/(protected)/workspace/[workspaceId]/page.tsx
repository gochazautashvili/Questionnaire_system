import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import WorkspaceLists from "./_components/WorkspaceLists";
import MoreButton from "./_components/MoreButton";
import { Loader2 } from "lucide-react";

interface WorkspacePageProps {
  params: { workspaceId: string };
}

const WorkspacePage = ({ params: { workspaceId } }: WorkspacePageProps) => {
  return (
    <section>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Lists </h1>
            <Suspense
              fallback={<Loader2 className="animate-spin text-primary" />}
            >
              <MoreButton workspaceId={workspaceId} />
            </Suspense>
          </div>
          <Separator className="h-1 rounded-md bg-emerald-500" />
        </div>
        <Suspense fallback={<WorkspaceListsLoading />}>
          <WorkspaceLists workspaceId={workspaceId} />
        </Suspense>
      </div>
    </section>
  );
};

export default WorkspacePage;

const WorkspaceListsLoading = () => {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-[150px] animate-pulse rounded-md bg-gray-300"
        />
      ))}
    </div>
  );
};

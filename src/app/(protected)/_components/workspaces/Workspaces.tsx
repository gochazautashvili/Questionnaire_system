import { Button } from "@/components/ui/button";
import { getWorkspaces } from "@/server/db/workspace";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface WorkspacesProps {
  orgId: string;
}

const Workspaces = async ({ orgId }: WorkspacesProps) => {
  const Workspaces = await getWorkspaces(orgId);

  return (
    <div className="mb-4 flex flex-col gap-3">
      {Workspaces.map((Workspace, i) => (
        <HoverCard key={i} openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button
              asChild
              size="sm"
              variant="emerald"
              key={Workspace.id}
              className="justify-start font-semibold tracking-wide"
            >
              <Link href={`/workspace/${Workspace.id}`}>
                <span className="flex items-center justify-center rounded-full bg-purple-500 px-1">
                  {i + 1}
                </span>
                {Workspace.title.slice(0, 20)}...
              </Link>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="break-all p-2 text-sm font-semibold">
            {Workspace.title}
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default Workspaces;

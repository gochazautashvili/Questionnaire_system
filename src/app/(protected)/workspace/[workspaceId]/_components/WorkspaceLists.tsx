import { getLists } from "@/server/db/list";
import Link from "next/link";
import ListMoreButton from "./ListMoreButton";
import { getUser } from "@/lib/auth";

interface WorkspaceListsProps {
  workspaceId: string;
}

const WorkspaceLists = async ({ workspaceId }: WorkspaceListsProps) => {
  const lists = await getLists(workspaceId);
  const currentUser = await getUser();

  if (!currentUser) return null;

  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {lists.map((list) => (
        <div
          className="flex h-[150px] flex-col gap-2 rounded-md bg-primary/30 p-4"
          key={list.id}
        >
          <div className="flex items-center justify-between">
            <Link
              prefetch={true}
              href={`/workspace/list/${list.id}`}
              className="line-clamp-1 text-xl font-bold"
            >
              {list.title}
            </Link>
            <ListMoreButton role={currentUser.role} list={list} />
          </div>
          <p className="line-clamp-4 text-sm text-gray-900">
            {list.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WorkspaceLists;

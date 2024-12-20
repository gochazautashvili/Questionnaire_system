import { getLists } from "@/server/db/list";
import Link from "next/link";
import ListMoreButton from "./ListMoreButton";
import { getUser } from "@/lib/auth";
import Image from "next/image";

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
          className="flex h-[230px] flex-col overflow-hidden rounded-md bg-white/90 shadow-md"
          key={list.id}
        >
          <Image
            width={500}
            height={300}
            alt="list image"
            src={list.background}
            className="h-[160px] w-full rounded object-cover shadow-lg"
          />
          <div className="mt-1 p-2">
            <div className="flex items-center justify-between">
              <Link
                prefetch={true}
                href={`/workspace/list/${list.id}`}
                className="line-clamp-1 font-serif text-xl font-bold"
              >
                {list.title}
              </Link>
              <ListMoreButton role={currentUser.role} list={list} />
            </div>
            <p className="line-clamp-4 font-mono text-xs font-semibold text-gray-900">
              {list.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkspaceLists;

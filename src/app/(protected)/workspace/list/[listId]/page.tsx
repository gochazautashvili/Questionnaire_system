import { getList } from "@/server/db/list";
import { DataTable } from "./_components/DataTable";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ColumnSheet from "./_components/columns/ColumnSheet";
import CreateRowButton from "./_components/rows/CreateRowButton";
import { getWhatCanUsers } from "@/lib/utils";
import { getUser } from "@/lib/auth";
import CreateFormButton from "./_components/CreateFormButton";
import Navigator from "@/components/Navigator";

interface ListPageProps {
  params: { listId: string };
}

export default async function ListPage({ params: { listId } }: ListPageProps) {
  const list = await getList(listId);
  const user = await getUser();

  if (!list || !user) return notFound();

  const { canActions } = getWhatCanUsers(user.role);
  const isPublic = list.type === "PUBLIC";

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{list.title}</h1>
        <div className="flex items-center gap-2">
          {canActions && !list.form && isPublic && (
            <CreateFormButton listId={list.id} />
          )}
          {list.form && canActions && isPublic && (
            <Navigator
              right
              name="List form"
              url={`/workspace/list/${list.id}/form`}
            />
          )}
          {canActions && (
            <ColumnSheet
              isPublic={list.type === "PUBLIC"}
              formId={list.form?.id}
            />
          )}
          {canActions && !isPublic && <CreateRowButton listId={list.id} />}
        </div>
      </div>
      <Separator className="mb-4 mt-2 rounded-md bg-emerald-500" />
      <DataTable
        role={user.role}
        isPublic={isPublic}
        columns={list.columns}
        list={list}
      />
    </div>
  );
}

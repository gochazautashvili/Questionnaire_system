import { getErrorMessage } from "@/lib/utils";
import { getListColumnsForForm } from "@/server/db/list";

interface Props {
  params: { listId: string };
}

export async function GET(req: Request, { params: { listId } }: Props) {
  try {
    const columns = await getListColumnsForForm(listId);

    return Response.json(columns, { status: 200 });
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

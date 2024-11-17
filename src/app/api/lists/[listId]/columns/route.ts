import { getErrorMessage } from "@/lib/utils";
import { getListColumnsForForm } from "@/server/db/list";
import { NextRequest } from "next/server";

interface Props {
  params: { listId: string };
}

export async function GET(req: NextRequest, { params: { listId } }: Props) {
  try {
    const columns = await getListColumnsForForm(listId);

    return Response.json(columns, { status: 200 });
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

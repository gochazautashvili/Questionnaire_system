import { getErrorMessage } from "@/lib/utils";
import { getFormLinksByListId } from "@/server/db/form";
import { NextRequest } from "next/server";

interface Props {
  params: { listId: string };
}

export async function GET(req: NextRequest, { params: { listId } }: Props) {
  try {
    const links = await getFormLinksByListId(listId);

    return Response.json(links, { status: 200 });
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

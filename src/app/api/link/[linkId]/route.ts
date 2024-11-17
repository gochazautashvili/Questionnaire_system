import { getErrorMessage } from "@/lib/utils";
import { getLinkById } from "@/server/db/link";

interface Props {
  params: { linkId: string };
}

export async function GET(req: Request, { params: { linkId } }: Props) {
  try {
    const link = await getLinkById(linkId);

    if (!link) {
      return new Response("Link not found", { status: 404 });
    }

    return Response.json(link);
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

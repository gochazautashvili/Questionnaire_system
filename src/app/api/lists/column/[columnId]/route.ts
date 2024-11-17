import { getErrorMessage } from "@/lib/utils";
import { getChoices } from "@/server/db/list";

interface Props {
  params: { columnId: string };
}

export async function GET(req: Request, { params: { columnId } }: Props) {
  try {
    const choices = await getChoices(columnId);

    return Response.json(choices);
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

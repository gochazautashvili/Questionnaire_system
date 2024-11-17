import { TListData, TListResponse } from "@/lib/types";
import { getErrorMessage, parseJson } from "@/lib/utils";
import { getListRows } from "@/server/db/list";
import { NextRequest } from "next/server";

interface Props {
  params: { listId: string };
}

export async function GET(req: NextRequest, { params: { listId } }: Props) {
  try {
    const size = 10;
    const page = Number(req.nextUrl.searchParams.get("page")) || 0;

    const rows = await getListRows({ listId, page, size });

    const data: TListData[] = rows.map((row) => {
      return {
        id: row.id,
        listId: row.listId,
        ...parseJson(row.content),
      };
    });

    const res: TListResponse = {
      data: data.slice(0, size),
      hasNextPage: rows.length > size,
    };

    return Response.json(res, { status: 200 });
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

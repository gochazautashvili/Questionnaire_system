import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { setCookies, verify_jwt_token } from "@/server/helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new Response("Error: token not found", { status: 404 });
  }

  try {
    const { expired, data, valid } = await verify_jwt_token<{ email: string }>(
      token,
    );

    if (expired) {
      return new Response("Token is expired", { status: 500 });
    }

    if (!valid || !data) {
      return new Response("Token is invalid", { status: 500 });
    }

    const user = await db.user.update({
      where: { email: data.email },
      data: { verified_email: true },
    });

    setCookies({ name: "user_session", value: user.id });

    return Response.json("success");
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

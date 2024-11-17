import { getErrorMessage } from "@/lib/utils";
import { delete_unverified_users } from "@/server/db/user";

export async function POST() {
  try {
    await delete_unverified_users();

    return new Response("Success");
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

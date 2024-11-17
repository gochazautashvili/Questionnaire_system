import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { getUsersByOrganizationId } from "@/server/db/user";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const users = await getUsersByOrganizationId(user.organizationId);

    return Response.json(users);
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}

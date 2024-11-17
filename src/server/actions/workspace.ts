"use server";
import { getErrorMessage } from "@/lib/utils";
import {
  create_workspaceDb,
  delete_workspaceDb,
  edit_workspaceDb,
  getWorkspaceCount,
} from "../db/workspace";
import { getUser } from "@/lib/auth";
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache";
import { checkWhatUserCan } from "../helpers";

// Post
export const create_workspace = async (data: TCreateWorkspace) => {
  try {
    const { title, workspaceId } = data;

    const { success, message } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    const user = await getUser();

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const workspace_count = await getWorkspaceCount(user.organizationId);

    if (workspace_count >= 5) {
      return { success: false, message: `Max workspace length if 5` };
    }

    if (workspaceId) {
      const workspace = await edit_workspaceDb({ title, workspaceId });

      revalidateDbCache({
        tag: CACHE_TAGS.workspaces,
        id: workspace.organizationId,
      });
      return { success: true, message: "Workspace edited successfully" };
    }

    const workspace = await create_workspaceDb({
      title: title,
      organizationId: user.organizationId,
    });

    revalidateDbCache({
      tag: CACHE_TAGS.workspaces,
      id: workspace.organizationId,
    });
    return {
      success: true,
      message: "workspace successfully created",
      url: `/workspace/${workspace.id}`,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// Delete
export const delete_workspace = async ({
  organizationId,
  workspaceId,
}: TDeleteWorkspace) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    await delete_workspaceDb(workspaceId);

    revalidateDbCache({
      tag: CACHE_TAGS.workspaces,
      id: organizationId,
    });
    return { success: true, message: "workspace deleted successfully" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// types
interface TDeleteWorkspace {
  workspaceId: string;
  organizationId: string;
}

interface TCreateWorkspace {
  title: string;
  workspaceId?: string;
}

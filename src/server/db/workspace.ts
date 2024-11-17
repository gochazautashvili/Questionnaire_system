import { CACHE_TAGS, dbCache, getIdTag } from "@/lib/cache";
import db from "@/lib/db";

// GET
export const getWorkspaces = (orgId: string) => {
  const cacheFn = dbCache(getWorkspacesFn, {
    tags: [getIdTag(orgId, CACHE_TAGS.workspaces)],
  });

  return cacheFn(orgId);
};

export const getWorkspaceCount = (orgId: string) => {
  return db.workspace.count({
    where: { organizationId: orgId },
  });
};

export const getWorkspaceById = (workspaceId: string) => {
  return db.workspace.findUnique({ where: { id: workspaceId } });
};

// POST
export const create_workspaceDb = (data: TCreateWorkspace) => {
  return db.workspace.create({
    data: { title: data.title, organizationId: data.organizationId },
  });
};

// Delete
export const delete_workspaceDb = (workspaceId: string) => {
  return db.workspace.delete({ where: { id: workspaceId } });
};

// Edit

export const edit_workspaceDb = ({ title, workspaceId }: TEditWorkspace) => {
  return db.workspace.update({
    where: { id: workspaceId },
    data: { title },
  });
};

// Real functions for cache
export const getWorkspacesFn = (orgId: string) => {
  return db.workspace.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
  });
};

// types
interface TCreateWorkspace {
  title: string;
  organizationId: string;
}

interface TEditWorkspace {
  workspaceId: string;
  title: string;
}

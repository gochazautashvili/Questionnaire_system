import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getUserTag>
  | ReturnType<typeof getIdTag>
  | ReturnType<typeof getOrgIdTag>;

export const CACHE_TAGS = {
  users: "users",
  lists: "lists",
  columns: "columns",
  workspaces: "workspaces",
  organization_users: "organization_users",
} as const;

type Props = keyof typeof CACHE_TAGS;

export const getGlobalTag = (tag: Props) => {
  return `global:${CACHE_TAGS[tag]}` as const;
};
export const getUserTag = (userId: string, tag: Props) => {
  return `user:${userId}-${CACHE_TAGS[tag]}` as const;
};
export const getIdTag = (id: string, tag: Props) => {
  return `id:${id}-${CACHE_TAGS[tag]}` as const;
};
export const getOrgIdTag = (orgId: string, tag: Props) => {
  return `organizationId:${orgId}-${CACHE_TAGS[tag]}` as const;
};

export const clearFullCache = () => {
  revalidateTag("*");
};

export function dbCache<T extends (...args: any[]) => Promise<any>>(
  cb: Parameters<typeof unstable_cache<T>>[0],
  { tags }: { tags: ValidTags[] },
) {
  return cache(unstable_cache<T>(cb, undefined, { tags: [...tags, "*"] }));
}

export const revalidateDbCache = (data: TRevalidateDbCache) => {
  const { tag, id, orgId, userId } = data;

  revalidateTag(getGlobalTag(tag));

  if (id) revalidateTag(getIdTag(id, tag));

  if (orgId) revalidateTag(getOrgIdTag(orgId, tag));

  if (userId) revalidateTag(getUserTag(userId, tag));
};

interface TRevalidateDbCache {
  tag: Props;
  userId?: string;
  id?: string;
  orgId?: string;
}

import db from "@/lib/db";
import { TPersonSchema } from "../validations";
import { CACHE_TAGS, dbCache, getIdTag } from "@/lib/cache";

// GET
export const getUserById = (userId: string) => {
  const cacheFn = dbCache(getUserByIdFn, {
    tags: [getIdTag(userId, CACHE_TAGS.users)],
  });

  return cacheFn(userId);
};

export const getOrganizationUsersCount = (orgId: string) => {
  return db.user.count({
    where: { organizationId: orgId },
  });
};

export const getOrganizationUsers = ({ organizationId, userId }: TOrgUser) => {
  const cacheFn = dbCache(getOrganizationUserFn, {
    tags: [getIdTag(userId, CACHE_TAGS.organization_users)],
  });

  return cacheFn({ organizationId, userId });
};

export const getUsersByOrganizationId = (organizationId: string) => {
  return db.user.findMany({
    where: { organizationId, NOT: { role: "OWNER" }, verified_email: true },
  });
};

// Edit
export const edit_nameDb = ({ name, userId }: TEditName) => {
  return db.user.update({
    where: { id: userId },
    data: { name },
  });
};

export const edit_passwordDb = ({ hash_password, userId }: TEditPassword) => {
  return db.user.update({
    where: { id: userId },
    data: { hash_password },
  });
};

export const edit_userDb = ({ userId, data }: TEditUser) => {
  return db.user.update({
    where: { id: userId },
    data: { ...data },
  });
};

// Post
export const create_userDb = (value: TCreateUser) => {
  return db.user.create({
    data: {
      ...value.data,
      hash_password: value.hash_password,
      organizationId: value.organizationId,
    },
  });
};

// Delete
export const delete_userDb = (userId: string) => {
  return db.user.delete({ where: { id: userId } });
};

export const delete_unverified_users = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  return db.user.deleteMany({
    where: { verified_email: false, createdAt: { lt: oneDayAgo } },
  });
};

// functions for cache
const getOrganizationUserFn = ({ organizationId, userId }: TOrgUser) => {
  return db.user.findMany({
    where: { organizationId, NOT: { id: userId } },
    orderBy: { createdAt: "desc" },
  });
};

const getUserByIdFn = (userId: string) => {
  return db.user.findUnique({ where: { id: userId } });
};

// types
interface TEditName {
  userId: string;
  name: string;
}

interface TEditPassword {
  hash_password: string;
  userId: string;
}

interface TCreateUser {
  data: TPersonSchema;
  hash_password: string;
  organizationId: string;
}

interface TOrgUser {
  organizationId: string;
  userId: string;
}

interface TEditUser {
  userId: string;
  data: TPersonSchema;
}

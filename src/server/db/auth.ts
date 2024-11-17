import db from "@/lib/db";

// GET
export const getUserByEmail = (email: string) => {
  return db.user.findUnique({ where: { email } });
};

// POST
export const create_user = (data: TCreateUser) => {
  return db.user.create({
    data: {
      ...data,
      role: "OWNER",
      organization: { create: { name: data.name } },
    },
  });
};

// Delete
export const delete_accountDb = (organizationId: string) => {
  return db.organization.delete({ where: { id: organizationId } });
};

// types
interface TCreateUser {
  name: string;
  email: string;
  hash_password: string;
}

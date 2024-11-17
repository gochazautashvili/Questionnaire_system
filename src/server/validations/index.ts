import { z } from "zod";

// auth
export const sign_up_schema = z.object({
  name: z.string().min(3).max(40),
  email: z.string().email(),
  password: z.string().min(8).max(80),
});

export type TSign_up_schema = z.infer<typeof sign_up_schema>;

export const sign_in_schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(80),
});

export type TSign_in_schema = z.infer<typeof sign_in_schema>;

// create person for organization

const roleEnum = z.enum(["ADMIN", "MEMBER", "VIEWER", "OWNER"]);

export const roles: { name: string; value: z.infer<typeof roleEnum> }[] = [
  {
    name: "Admin",
    value: "ADMIN",
  },
  {
    name: "Member",
    value: "MEMBER",
  },
  {
    name: "Viewer",
    value: "VIEWER",
  },
];

export const person_schema = z.object({
  name: z.string().min(3).max(40),
  email: z.string().email(),
  role: roleEnum,
});

export type TPersonSchema = z.infer<typeof person_schema>;

// lists
export const list_schema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().min(5).max(200),
  isPublic: z.boolean().default(true),
});

export type TList_schema = z.infer<typeof list_schema>;

// list columns
const columnEnum = z.enum([
  "TEXT",
  "USERS",
  "CHOICE",
  "BIG_TEXT",
  "DATETIME",
  "RATING",
]);

export const types: { name: string; value: z.infer<typeof columnEnum> }[] = [
  {
    name: "Text",
    value: "TEXT",
  },
  {
    name: "Big Text",
    value: "BIG_TEXT",
  },
  {
    name: "Choice",
    value: "CHOICE",
  },
  {
    name: "Date",
    value: "DATETIME",
  },
  {
    name: "Person",
    value: "USERS",
  },
  {
    name: "Rating",
    value: "RATING",
  },
];

export const column_schema = z.object({
  name: z.string().min(2).max(20),
  type: columnEnum.default("TEXT"),
  withFormColumn: z.boolean().default(false),
});

export type TColumnSchema = z.infer<typeof column_schema>;

// edit user

export const user_schema = z.object({
  name: z.string().min(3).max(40),
});

export type TUserSchema = z.infer<typeof user_schema>;

export const password_schema = z.object({
  old_password: z.string().min(8).max(80),
  new_password: z.string().min(8).max(50),
});

export type TEditPassword = z.infer<typeof password_schema>;

// form

export const form_schema = z.object({
  title: z.string().min(2).max(50),
  subtitle: z.string().min(5).max(100),
});

export type TFormSchema = z.infer<typeof form_schema>;

// form links

export const link_schema = z.object({
  name: z.string().min(2).max(50),
  location: z.string().min(2).max(100),
  code: z.string().optional(),
});

export type TLinkSchema = z.infer<typeof link_schema>;

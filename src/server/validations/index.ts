import { Column } from "@prisma/client";
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
  background: z.string().min(1),
});

export type TList_schema = z.infer<typeof list_schema>;

// list columns
const columnEnum = z.enum([
  "NPS",
  "TEXT",
  "USERS",
  "CHOICE",
  "MATRIX",
  "RATING",
  "NUMBER",
  "BIG_TEXT",
  "DATETIME",
  "MULTIPLE_CHOICE",
]);

export const column_schema = z.object({
  name: z.string().min(2).max(20),
  type: columnEnum.default("TEXT"),
  withFormColumn: z.boolean().default(false),
  required: z.boolean().default(true),
  rate_range: z.number().min(3).max(10).default(5),
  rate_type: z.enum(["STARS", "EMOJIS", "HEART"]).default("STARS"),
  nps_start: z.string().default("Start"),
  nps_end: z.string().default("End"),
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

// others
export const generateFormSchema = (columns: Column[]) => {
  const message = "This field is required";

  const schema = z.object(
    columns.reduce((acc, column) => {
      switch (column.type) {
        case "TEXT":
          acc[column.id] = column.required
            ? z.string().min(1, message).max(100)
            : z.string();
          break;
        case "BIG_TEXT":
          acc[column.id] = column.required
            ? z.string().min(1, message).max(500)
            : z.string();
          break;
        case "NUMBER":
          acc[column.id] = column.required
            ? z.number().min(1, message)
            : z.number();
          break;
        case "DATETIME":
          acc[column.id] = column.required
            ? z.string().min(1, message)
            : z.string();
          break;
        case "CHOICE":
          acc[column.id] = column.required
            ? z.string().min(1, message)
            : z.string();
          break;
        case "MULTIPLE_CHOICE":
          acc[column.id] = column.required
            ? z.array(z.string()).min(1, message)
            : z.array(z.string());
          break;
        case "RATING":
          acc[column.id] = column.required
            ? z.number().min(1, message)
            : z.number();
          break;
        case "NPS":
          acc[column.id] = column.required
            ? z.number().min(1, message)
            : z.number();
          break;
        case "MATRIX":
          acc[column.id] = column.required
            ? z.string().min(1, message)
            : z.string();
          break;
        default:
          throw new Error(`Unsupported type: ${column.type}`);
      }
      return acc;
    }, {} as TGeneratedFormSchema),
  );

  return schema;
};

export type TGeneratedForm = z.infer<ReturnType<typeof generateFormSchema>>;

type TGeneratedFormSchema = Record<
  string,
  z.ZodString | z.ZodNumber | z.ZodDate | z.ZodArray<z.ZodString>
>;

// uploadthing
export const uploadthing_schema = z.object({
  type: z.enum(["background", "form_background", "logo", "list"]),
  formId: z.string().min(1),
});

export type TUploadSchema = z.infer<typeof uploadthing_schema>;

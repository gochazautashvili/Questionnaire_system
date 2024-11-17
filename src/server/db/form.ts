import db from "@/lib/db";
import { TFormSchema } from "../validations";

// GET
export const getFormByListId = (listId: string) => {
  return db.form.findUnique({
    where: { listId },
    include: {
      columns: {
        include: { choices: true },
        where: { NOT: { OR: [{ type: "USERS" }, { use_type: "LIST" }] } },
      },
    },
  });
};

export const getFormLinksByListId = (listId: string) => {
  return db.form.findUnique({
    where: { listId },
    include: { links: { orderBy: { createdAt: "desc" } } },
  });
};

// Post
export const create_formDb = (props: TCreateForm) => {
  const { listId, values } = props;

  return db.form.create({
    data: { ...values, listId },
  });
};

// Edit
export const edit_columnsDb = (columnIds: string[]) => {
  return db.column.updateMany({
    where: { id: { in: columnIds } },
    data: { use_type: "BOTH" },
  });
};

interface TCreateForm {
  values: TFormSchema;
  listId: string;
}

import db from "@/lib/db";
import { TFormSchema } from "../validations";
import { form_include, TStyles, TUploadImageButtonType } from "@/lib/types";

// GET
export const getFormByListId = (listId: string) => {
  return db.form.findUnique({
    where: { listId },
    include: form_include,
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
    data: {
      ...values,
      listId,
      columns: {
        createMany: {
          data: [
            { name: "Column 1", type: "TEXT", use_type: "BOTH", listId },
            { name: "Column 2", type: "TEXT", use_type: "BOTH", listId },
            { name: "Column 3", type: "TEXT", use_type: "BOTH", listId },
          ],
        },
      },
      form_styles: { create: {} },
    },
  });
};

export const upload_backgroundDb = ({ formId, url }: TUploadImage) => {
  return db.formStyles.update({
    where: { formId },
    data: { background_image: url },
  });
};

export const upload_form_backgroundDb = ({ formId, url }: TUploadImage) => {
  return db.formStyles.update({
    where: { formId },
    data: { form_background_image: url },
  });
};

export const upload_logoDb = ({ formId, url }: TUploadImage) => {
  return db.formStyles.update({
    where: { formId },
    data: { logo: url },
  });
};

// Edit
export const edit_columnsDb = (columnIds: string[]) => {
  return db.column.updateMany({
    where: { id: { in: columnIds } },
    data: { use_type: "BOTH" },
  });
};

export const edit_form_title = ({ listId, value }: TEditFormHeader) => {
  return db.form.update({
    where: { listId },
    data: { title: value },
  });
};

export const edit_form_subtitle = ({ listId, value }: TEditFormHeader) => {
  return db.form.update({
    where: { listId },
    data: { subtitle: value },
  });
};

export const edit_form_stylesDb = ({ formId, styles }: TEditStyles) => {
  return db.formStyles.update({
    where: { formId },
    data: { ...styles },
  });
};

// DELETE
export const delete_imageDb = ({ id, type }: TDeleteImage) => {
  switch (type) {
    case "background_image":
      return db.formStyles.update({
        where: { formId: id },
        data: { background_image: "" },
      });
    case "form_background_image":
      return db.formStyles.update({
        where: { formId: id },
        data: { form_background_image: "" },
      });
    case "logo":
      return db.formStyles.update({
        where: { formId: id },
        data: { logo: "" },
      });
    case "list":
      return db.list.update({
        where: { id },
        data: { background: "" },
      });
    default:
      return;
  }
};

// types
interface TDeleteImage {
  id: string;
  type: TUploadImageButtonType;
}

interface TUploadImage {
  url: string;
  formId: string;
}

interface TEditStyles {
  formId: string;
  styles: TStyles;
}

interface TCreateForm {
  values: TFormSchema;
  listId: string;
}

interface TEditFormHeader {
  value: string;
  listId: string;
}

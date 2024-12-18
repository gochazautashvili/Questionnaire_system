"use server";
import { getErrorMessage } from "@/lib/utils";
import { form_schema, TFormSchema, TUploadSchema } from "../validations";
import {
  create_formDb,
  delete_imageDb,
  edit_columnsDb,
  edit_form_stylesDb,
  edit_form_subtitle,
  edit_form_title,
  upload_backgroundDb,
  upload_form_backgroundDb,
  upload_logoDb,
} from "../db/form";
import { checkWhatUserCan } from "../helpers";
import { revalidatePath } from "next/cache";
import { TStyles, TUploadImageButtonType } from "@/lib/types";
import { delete_file } from "../uploadthing";

// POST
export const create_form = async (props: TCreateForm) => {
  const { columnIds, listId, values } = props;

  try {
    const { data, error } = form_schema.safeParse(values);

    if (error) {
      return { success: false, message: error.message };
    }

    const { message, success } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    const form = await create_formDb({ listId, values: data });
    await edit_columnsDb(columnIds);

    return {
      success: true,
      message: "Form created successfully",
      url: `/workspace/list/${form.listId}/form`,
    };
  } catch (error) {
    return { success: true, message: getErrorMessage(error) };
  }
};

// EDIT
export const edit_form_header = async (props: TEditFormHeader) => {
  const { listId, type, value } = props;

  try {
    if (!value) return { success: false, message: "value is null" };

    if (type !== "title" && type !== "subtitle") {
      return { success: false, message: "the type is not correct" };
    }

    if (type === "title") await edit_form_title({ listId, value });
    if (type === "subtitle") await edit_form_subtitle({ listId, value });

    revalidatePath(`/workspace/list/${listId}/form`);
    return { success: true, message: "Form title updated successfully" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const edit_form_styles = async (props: TEditStyles) => {
  try {
    await edit_form_stylesDb(props);

    return { success: true, message: "Form styles successfully updated" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const upload_background = async ({ formId, url }: TUploadImage) => {
  await upload_backgroundDb({ formId, url });
};

export const upload_form_background = async ({ formId, url }: TUploadImage) => {
  await upload_form_backgroundDb({ formId, url });
};

export const upload_logo = async ({ formId, url }: TUploadImage) => {
  await upload_logoDb({ formId, url });
};

export const upload_fileDb = async ({ data, url }: TUploadFileDb) => {
  const { formId, type } = data;

  switch (type) {
    case "background":
      return upload_background({ formId, url });
    case "form_background":
      return upload_form_background({ formId, url });
    case "logo":
      return upload_logo({ formId, url });
    default:
      return;
  }
};

// DELETE
export const delete_image = async ({ id, type, url }: TDeleteImage) => {
  try {
    await delete_imageDb({ id, type });

    await delete_file(url);

    return { success: true, message: "Image successfully deleted" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// types
interface TDeleteImage {
  id: string;
  url: string;
  type: TUploadImageButtonType;
}

interface TEditStyles {
  formId: string;
  styles: TStyles;
}

interface TCreateForm {
  values: TFormSchema;
  columnIds: string[];
  listId: string;
}

interface TEditFormHeader {
  value: string;
  listId: string;
  type: "title" | "subtitle";
}

interface TUploadFileDb {
  url: string;
  data: TUploadSchema;
}

interface TUploadImage {
  url: string;
  formId: string;
}

"use server";
import { getErrorMessage } from "@/lib/utils";
import { form_schema, TFormSchema } from "../validations";
import { create_formDb, edit_columnsDb } from "../db/form";
import { checkWhatUserCan } from "../helpers";

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

interface TCreateForm {
  values: TFormSchema;
  columnIds: string[];
  listId: string;
}

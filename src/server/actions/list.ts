"use server";
import { getErrorMessage, parseJson } from "@/lib/utils";
import { column_schema, TColumnSchema, TList_schema } from "../validations";
import {
  create_choiceDb,
  create_column,
  create_formDb,
  create_listDb,
  create_rowDb,
  delete_choiceDb,
  delete_columnDB,
  delete_listDb,
  delete_rowDb,
  edit_choice_colorDb,
  edit_columnDB,
  edit_full_column,
  edit_listDb,
  edit_rowDb,
  getListColumns,
  getListCount,
  select_choiceDb,
} from "../db/list";
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache";
import { TListData } from "@/lib/types";
import { checkWhatUserCan, sendEmails } from "../helpers";
import { getUserById } from "../db/user";

// POST
export const create_list = async (data: TCreateList) => {
  const { values, withForm, workspaceId, listId } = data;

  const { success, message } = await checkWhatUserCan("actions");

  if (!success) {
    return { success: false, message };
  }

  try {
    if (listId) {
      const list = await edit_listDb({ values, listId });

      revalidateDbCache({ tag: CACHE_TAGS.lists, id: list.workspaceId });
      return {
        success: true,
        message: "workspace list edit successfully",
      };
    } else {
      const list_count = await getListCount(workspaceId);

      if (list_count >= 5) {
        return { success: false, message: "Max lists length is 5" };
      }

      const list = await create_listDb({ values, workspaceId });

      if (withForm && values.isPublic) {
        await create_formDb(list.id);
      }

      revalidateDbCache({ tag: CACHE_TAGS.lists, id: workspaceId });
      return {
        success: true,
        message: "workspace list created successfully",
        url: `/workspace/list/${list.id}`,
      };
    }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const create_row = async (listId: string) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) throw new Error(message);

    const columns = await getListColumns(listId);

    const content = JSON.stringify(
      columns.reduce(
        (items, item) => {
          items[item.id] = "";

          return items;
        },
        {} as Record<string, string>,
      ),
    );

    const row = await create_rowDb({ listId, content });

    const data: TListData = {
      id: row.id,
      listId: row.listId,
      ...parseJson(row.content),
    };

    return { message: "Row successfully created", data };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const column_action = async (props: TColumnAction) => {
  const { values, columnId, listId, formId } = props;

  try {
    const { data, error } = column_schema.safeParse(values);

    if (error) {
      return { success: false, message: error.message };
    }

    const { success, message } = await checkWhatUserCan("actions");

    if (!success) {
      return { success: false, message };
    }

    if (!columnId) {
      await create_column({ data, listId, formId });
    } else {
      await edit_full_column({ columnId, data, formId });
    }

    revalidateDbCache({ tag: CACHE_TAGS.columns, id: listId });
    return {
      success: true,
      message: columnId
        ? "Column successfully edited"
        : "Column successfully created",
    };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
};

export const create_choice = async (data: TCreateChoice) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) throw new Error(message);

    const choice = await create_choiceDb(data);

    return { message: "Choice created successfully", data: choice };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// EDIT
export const edit_row = async ({ columnId, row, value }: TEdit_row) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) throw new Error(message);

    const newRow = { ...row, [columnId]: value };

    await edit_rowDb(newRow);

    return { message: "Row updated successfully" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const edit_column = async ({ columnId, name, listId }: TEditColumn) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    await edit_columnDB({ columnId, name });

    revalidateDbCache({ tag: CACHE_TAGS.columns, id: listId });
    return { success: true, message: "Column edited successfully" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const select_choice = async (data: TSelectChoice) => {
  const { success, message } = await checkWhatUserCan("actions");

  if (!success) throw new Error(message);

  const { choiceId, columnId, row, type } = data;

  if (type === "user") {
    const user = await getUserById(choiceId);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    sendEmails({ name: user.name, subject: "You have job", to: [user.email] });
  }

  const newRow = { ...row, [columnId]: choiceId };

  await select_choiceDb({ row: JSON.stringify(newRow), rowId: row.id });
  try {
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const edit_choice_color = async (data: TChoiceColor) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) throw new Error(message);

    await edit_choice_colorDb(data);

    return { message: "choice color edited successfully" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// DELETE
export const delete_list = async (listId: string) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    const list = await delete_listDb(listId);

    revalidateDbCache({ tag: CACHE_TAGS.lists, id: list.workspaceId });
    return { success: true, message: "List deleted successfully :)" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const delete_row = async (rowId: string) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) throw new Error(message);

    await delete_rowDb(rowId);

    return { message: "Row deleted successfully" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const delete_choice = async (choiceId: string) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) throw new Error(message);

    await delete_choiceDb(choiceId);

    return { message: "Choice deleted" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const delete_column = async ({ columnId, listId }: TDeleteColumn) => {
  try {
    const { success, message } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    await delete_columnDB(columnId);

    revalidateDbCache({ tag: CACHE_TAGS.columns, id: listId });
    return { success: true, message: "Column deleted successfully" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// types
interface TCreateList {
  values: TList_schema;
  workspaceId: string;
  withForm: boolean;
  listId?: string;
}

interface TEdit_row {
  columnId: string;
  row: TListData;
  value: string;
}

interface TEditColumn {
  columnId: string;
  name: string;
  listId: string;
}

interface TColumnAction {
  listId: string;
  formId?: string;
  columnId?: string;
  values: TColumnSchema;
}

interface TCreateChoice {
  columnId: string;
  name: string;
}

interface TSelectChoice {
  row: TListData;
  columnId: string;
  choiceId: string;
  type: "user" | "default";
}

interface TChoiceColor {
  color: string;
  choiceId: string;
}

interface TDeleteColumn {
  columnId: string;
  listId: string;
}

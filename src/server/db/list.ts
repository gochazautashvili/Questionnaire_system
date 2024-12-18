import db from "@/lib/db";
import { TColumnSchema, TList_schema } from "../validations";
import { CACHE_TAGS, dbCache, getIdTag } from "@/lib/cache";
import { TListData } from "@/lib/types";

// GET
export const getLists = (workspaceId: string) => {
  const cacheFn = dbCache(getListsFn, {
    tags: [getIdTag(workspaceId, CACHE_TAGS.lists)],
  });

  return cacheFn(workspaceId);
};

export const getListCount = (workspaceId: string) => {
  return db.list.count({
    where: { workspaceId },
  });
};

export const getList = (listId: string) => {
  return db.list.findUnique({
    where: { id: listId },
    include: {
      columns: { orderBy: { createdAt: "asc" } },
      form: true,
    },
  });
};

export const getListRows = ({ listId, page, size }: TGetRows) => {
  return db.row.findMany({
    where: { listId },
    orderBy: { createdAt: "desc" },
    skip: page * size,
    take: size + 1,
  });
};

export const getListColumns = (listId: string) => {
  const cacheFn = dbCache(getListColumnsFn, {
    tags: [getIdTag(listId, CACHE_TAGS.columns)],
  });

  return cacheFn(listId);
};

export const getChoices = (columnId: string) => {
  return db.choice.findMany({ where: { columnId }, orderBy: { type: "desc" } });
};

export const getListColumnsForForm = (listId: string) => {
  return db.column.findMany({
    where: { listId },
  });
};

// POST
export const create_listDb = ({
  values,
  workspaceId,
  withForm,
}: TCreateList) => {
  const { isPublic, ...data } = values;

  return db.list.create({
    data: {
      ...data,
      workspaceId,
      columns: withForm
        ? {}
        : {
            createMany: {
              data: [
                { name: "Test column 1", type: "TEXT" },
                { name: "Test column 2", type: "TEXT" },
                { name: "Test column 3", type: "TEXT" },
              ],
            },
          },
      type: isPublic ? "PUBLIC" : "ORGANIZATION",
    },
    select: { id: true },
  });
};

export const create_formDb = (listId: string) => {
  return db.form.create({
    data: {
      title: "Form title",
      subtitle:
        "form subtitle this is just default, you can edit subtitle and title.",
      listId,
      columns: {
        createMany: {
          data: [
            { name: "Form column 1", listId, use_type: "BOTH" },
            { name: "Form column 2", listId, use_type: "BOTH" },
          ],
        },
      },
      form_styles: { create: {} },
    },
  });
};

export const create_rowDb = ({ content, listId }: TCreateRow) => {
  return db.row.create({
    data: {
      content,
      listId,
    },
  });
};

export const create_column = ({ data, listId, formId }: TCreateColumn) => {
  const { name, type, withFormColumn, rate_range, rate_type, required } = data;

  return db.column.create({
    data: {
      name,
      type,
      listId,
      required,
      rate_type,
      rate_range,
      formId: withFormColumn ? formId : undefined,
      use_type: withFormColumn ? "BOTH" : "LIST",
    },
  });
};

export const create_choiceDb = (data: TCreateChoice) => {
  return db.choice.create({
    data: { ...data },
  });
};

// EDIT
export const edit_listDb = ({ values, listId }: TEditList) => {
  const { description, title, background } = values;

  return db.list.update({
    where: { id: listId },
    data: { description, title, background },
  });
};

export const edit_rowDb = (content: TListData) => {
  const { id, ...data } = content;

  return db.row.update({
    where: { id },
    data: { content: JSON.stringify(data) },
  });
};

export const edit_columnDB = ({ columnId, name }: TEditColumn) => {
  return db.column.update({
    where: { id: columnId },
    data: { name },
  });
};

export const edit_full_column = ({
  columnId,
  data,
  formId,
}: TEditFullColumn) => {
  const { name, type, withFormColumn, rate_range, rate_type, required } = data;

  return db.column.update({
    where: { id: columnId },
    data: {
      name,
      type,
      required,
      rate_type,
      rate_range,
      use_type: withFormColumn ? "BOTH" : "LIST",
      formId: withFormColumn ? formId : undefined,
    },
  });
};

export const select_choiceDb = ({ row, rowId }: TSelectChoice) => {
  return db.row.update({
    where: { id: rowId },
    data: { content: row },
  });
};

export const edit_choice_colorDb = ({ choiceId, color }: TChoiceColor) => {
  return db.choice.update({
    where: { id: choiceId },
    data: { color },
  });
};

// DELETE
export const delete_listDb = (listId: string) => {
  return db.list.delete({ where: { id: listId } });
};

export const delete_rowDb = (rowId: string) => {
  return db.row.delete({ where: { id: rowId } });
};

export const delete_choiceDb = (choiceId: string) => {
  return db.choice.delete({ where: { id: choiceId } });
};

export const delete_columnDB = (columnId: string) => {
  return db.column.delete({ where: { id: columnId } });
};

// Real functions for cache
const getListsFn = (workspaceId: string) => {
  return db.list.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  });
};

const getListColumnsFn = (listId: string) => {
  return db.column.findMany({
    where: {
      listId,
      NOT: { use_type: "FORM" },
    },
    select: { id: true },
  });
};

// types
interface TCreateList {
  values: TList_schema;
  workspaceId: string;
  withForm: boolean;
}

interface TEditList {
  values: TList_schema;
  listId: string;
}

interface TCreateRow {
  content: string;
  listId: string;
}

interface TEditColumn {
  columnId: string;
  name: string;
}

interface TCreateColumn {
  listId: string;
  data: TColumnSchema;
  formId?: string;
}

interface TEditFullColumn {
  columnId: string;
  data: TColumnSchema;
  formId?: string;
}

interface TGetRows {
  page: number;
  size: number;
  listId: string;
}

interface TCreateChoice {
  type: "NORMAL" | "OTHER";
  columnId: string;
  name: string;
}

interface TSelectChoice {
  rowId: string;
  row: string;
}

interface TChoiceColor {
  color: string;
  choiceId: string;
}

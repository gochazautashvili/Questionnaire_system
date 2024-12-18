"use server";
import { getErrorMessage } from "@/lib/utils";
import { link_schema, TGeneratedForm, TLinkSchema } from "../validations";
import {
  create_linkDb,
  delete_linkDb,
  edit_link_nameDb,
  edit_linkDb,
  send_user_responseDb,
} from "../db/link";
import { checkWhatUserCan } from "../helpers";

// Create
export const create_link = async (props: TCreateLink) => {
  const { formId, values } = props;

  try {
    const { data, error } = link_schema.safeParse(values);

    if (error) throw new Error(error.message);

    const { message, success } = await checkWhatUserCan("actions");

    if (!success) throw new Error(message);

    const link = await create_linkDb({ data, formId });

    return { data: link, message: "link created successfully" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const send_user_response = async (props: TUserResponse) => {
  const { linkId, values, listId, linkType } = props;

  try {
    const data = {
      ...values,
      link_name: linkId,
      link_location: linkId,
      link_type: linkType,
    };

    const jsonData = JSON.stringify(data);

    await send_user_responseDb({ content: jsonData, listId });

    return { success: true, message: "your response successfully sended" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// Edit
export const edit_link = async (props: TEditLink) => {
  const { values, linkId } = props;

  try {
    const { data, error } = link_schema.safeParse(values);

    if (error) throw new Error(error.message);

    const { message, success } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    await edit_linkDb({ data, linkId });

    return { message: "link edited successfully" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const edit_link_name = async ({ linkId, name, type }: TEditLinkName) => {
  try {
    const { message, success } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    await edit_link_nameDb({ linkId, name, type });

    return { message: "link name successfully edited" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// Delete
export const delete_link = async (linkId: string) => {
  try {
    const { message, success } = await checkWhatUserCan("actions");

    if (!success) return { success: false, message };

    await delete_linkDb(linkId);

    return { message: "form link successfully deleted" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// Types
interface TEditLinkName {
  linkId: string;
  name: string;
  type: "name" | "code" | "location";
}

interface TCreateLink {
  formId: string;
  values: TLinkSchema;
}

interface TEditLink {
  linkId: string;
  values: TLinkSchema;
}

interface TUserResponse {
  values: TGeneratedForm;
  linkType: string;
  listId: string;
  linkId: string;
}

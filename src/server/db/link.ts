import db from "@/lib/db";
import { TLinkSchema } from "../validations";
import { link_include } from "@/lib/types";

// Get
export const getLinkWithForm = (linkId: string) => {
  return db.link.findUnique({
    where: { id: linkId },
    include: link_include,
  });
};

export const getLinkById = (linkId: string) => {
  return db.link.findUnique({ where: { id: linkId } });
};

// Post
export const create_linkDb = ({ data, formId }: TCreateLink) => {
  return db.link.create({
    data: { formId, ...data },
  });
};

export const send_user_responseDb = ({ content, listId }: TUserResponse) => {
  return db.row.create({
    data: { content, listId },
  });
};

// Edit
export const edit_linkDb = ({ data, linkId }: TEditLink) => {
  return db.link.update({
    where: { id: linkId },
    data: { ...data },
  });
};

export const edit_link_nameDb = ({ linkId, name, type }: TEditLinkName) => {
  switch (type) {
    case "code":
      return db.link.update({
        where: { id: linkId },
        data: { code: name },
      });
    case "location":
      return db.link.update({
        where: { id: linkId },
        data: { location: name },
      });
    case "name":
      return db.link.update({
        where: { id: linkId },
        data: { name },
      });
  }
};

// Delete
export const delete_linkDb = (linkId: string) => {
  return db.link.delete({ where: { id: linkId } });
};

// types
interface TEditLinkName {
  linkId: string;
  name: string;
  type: "name" | "code" | "location";
}

interface TCreateLink {
  formId: string;
  data: TLinkSchema;
}

interface TEditLink {
  linkId: string;
  data: TLinkSchema;
}

interface TUserResponse {
  content: string;
  listId: string;
}

import { Prisma } from "@prisma/client";

export type TListData = {
  id: string;
  listId: string;
  [x: string]: string;
};

export type TListResponse = {
  data: TListData[];
  hasNextPage: boolean;
};

export const link_include = {
  form: {
    include: {
      columns: {
        include: { choices: true },
        where: { NOT: { type: "USERS" } },
      },
    },
  },
} satisfies Prisma.LinkInclude;

export type TLinkInclude = Prisma.LinkGetPayload<{
  include: typeof link_include;
}>;

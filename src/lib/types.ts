import { Choice, Column, Prisma } from "@prisma/client";

export type TListData = {
  id: string;
  listId: string;
  [x: string]: string;
};

export type TListResponse = {
  data: TListData[];
  hasNextPage: boolean;
};

export type TMostSelectedOptions = Column & {
  choices: Choice[];
  choice_counts: Record<string, number>;
};

export const link_include = {
  form: {
    include: {
      columns: {
        orderBy: { order: "asc" },
        include: { choices: true },
        where: { NOT: { type: "USERS" } },
      },
      form_styles: true,
    },
  },
} satisfies Prisma.LinkInclude;

export type TLinkInclude = Prisma.LinkGetPayload<{
  include: typeof link_include;
}>;

export const form_include = {
  columns: {
    orderBy: { order: "asc" },
    include: { choices: true },
    where: { NOT: { OR: [{ type: "USERS" }, { use_type: "LIST" }] } },
  },
  form_styles: true,
} satisfies Prisma.FormInclude;

export type TFormInclude = Prisma.FormGetPayload<{
  include: typeof form_include;
}>;

export type TStyles = {
  border_size: number;
  border_color: string;
  form_border_radius: number;

  background: string;
  form_background: string;
  text_color: string;
  title_size: number;
  subtitle_size: number;

  logo?: string;
  background_image?: string;
  form_background_image?: string;

  button_text: string;
  button_color: string;
};

export type TMatrixContent = {
  columns: { id: string; value: string }[];
  rows: { id: string; value: string; selectedColumnId: string }[];
};

export type TRateDashboardData = Column & {
  average_rating: number;
};

export type TUploadImageButtonType =
  | "background_image"
  | "form_background_image"
  | "logo"
  | "list";

import { TMatrixContent } from "@/lib/types";
import { ColumnType, RateType, UserRole } from "@prisma/client";

export const column_types: TColumnTypes[] = [
  {
    name: "Text",
    value: "TEXT",
  },
  {
    name: "Date",
    value: "DATETIME",
  },
  {
    name: "Rating",
    value: "RATING",
  },
  {
    name: "Choice",
    value: "CHOICE",
  },
  {
    name: "Person",
    value: "USERS",
  },
  {
    name: "Matrix",
    value: "MATRIX",
  },
  {
    name: "Big Text",
    value: "BIG_TEXT",
  },
  {
    name: "Number",
    value: "NUMBER",
  },
  {
    name: "Multiple choices",
    value: "MULTIPLE_CHOICE",
  },
  {
    name: "Net Promoter Score",
    value: "NPS",
  },
];

export const user_roles: TUserRoles[] = [
  {
    name: "Admin",
    value: "ADMIN",
  },
  {
    name: "Member",
    value: "MEMBER",
  },
  {
    name: "Viewer",
    value: "VIEWER",
  },
];

export const column_rate_types: TRoleType[] = [
  {
    name: "Stars",
    value: "STARS",
  },
  {
    name: "Hearts",
    value: "HEART",
  },
  {
    name: "Emojis",
    value: "EMOJIS",
  },
];

export const colors = [
  "#b91c1c",
  "#b45309",
  "#4d7c0f",
  "#166534",
  "#115e59",
  "#0e7490",
  "#1e40af",
  "#6b21a8",
  "#86198f",
  "#a3e635",
  "#ea580c",
  "#94a3b8",
];

const matrix_table: TMatrixContent = {
  columns: [
    { id: "columns_1", value: "column 1" },
    { id: "columns_2", value: "column 2" },
  ],
  rows: [
    { id: "rows_1", value: "row 1", selectedColumnId: "1" },
    { id: "rows_2", selectedColumnId: "", value: "row 2" },
  ],
};

export const default_matrix_table = JSON.stringify(matrix_table);


// types
interface TColumnTypes {
  name: string;
  value: ColumnType;
}

interface TUserRoles {
  name: string;
  value: UserRole;
}

interface TRoleType {
  name: string;
  value: RateType;
}

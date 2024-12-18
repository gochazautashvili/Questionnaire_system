import { ColumnType, RateType, UserRole } from "@prisma/client";
import { Heart, Smile, Star } from "lucide-react";

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

export const getRateIconByType = (type: RateType) => {
  switch (type) {
    case "STARS":
      return Star;
    case "EMOJIS":
      return Smile;
    case "HEART":
      return Heart;
    default:
      return Star;
  }
};

export const getRateClassName = (type: RateType) => {
  switch (type) {
    case "STARS":
      return "fill-yellow-500 text-yellow-500";
    case "EMOJIS":
      return "fill-yellow-500";
    case "HEART":
      return "fill-red-500 text-red-500";
    default:
      return "fill-yellow-500 text-yellow-500";
  }
};

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

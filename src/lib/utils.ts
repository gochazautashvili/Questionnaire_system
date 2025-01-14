import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Resend } from "resend";
import { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { Choice, Column, RateType, Row, UserRole } from "@prisma/client";
import Resizer from "react-image-file-resizer";
import jwt from "jsonwebtoken";
import emailjs from "@emailjs/browser";
import { Heart, Smile, Star } from "lucide-react";
import { TMostSelectedOptions, TRateDashboardData } from "./types";

export const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) return error.response.data;

    return error.message;
  }

  if (typeof error === "string") return error;

  return "Something went wrong! try agin.";
};

export function getPromise(delay = 1000) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(":)");
    }, delay);
  });
}

export const parseJson = <T>(value: string) => {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNameStarts = (name: string) => {
  const username = name.split(" ");

  const firstName = username[0];
  const lastName = username[1];

  if (lastName && !!lastName.length) return firstName[0] + lastName[0];

  return firstName[0] + firstName[1];
};

export const generatePassword = (email: string) => {
  const start_with = process.env.USER_PASSWORD_DEFAULT!;

  const password = `${start_with}-${email}-${randomUUID()}`;

  return password.slice(0, 80);
};

export const getIsDefaultPassword = ({ email, password }: TDefaultPassword) => {
  const start_with = process.env.USER_PASSWORD_DEFAULT || "";

  return password.startsWith(start_with) && password.includes(email);
};

export const getUserRoleDescription = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
      return "ADMIN: This user only can't delete organization";
    case "MEMBER":
      return "MEMBER: This user can create edit and delete";
    case "VIEWER":
      return "VIEWER: This user only can see";
    default:
      return null;
  }
};

export const getWhatCanUsers = (role: UserRole) => {
  const canActions = role === "ADMIN" || role === "OWNER" || role === "MEMBER";

  const workWithUsers = role === "ADMIN" || role === "OWNER";

  return { workWithUsers, canActions };
};

export const resizeFile = ({ file, height, width }: TResizeFile) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "webp",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
    );
  });
};

export const sendEmails_V2 = ({ email }: TSendEmails) => {
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_ID;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) throw new Error("You need JWT SECRET in env file");

  const user_JWT = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: 60 * 3,
  });

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error("not found keys in env file");
  }

  const data = { token: user_JWT, to_email: email };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, { publicKey: PUBLIC_KEY });
};

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
      return "#eeff1b";
    case "EMOJIS":
      return "#eeff1b";
    case "HEART":
      return "red";
    default:
      return "#eeff1b";
  }
};

export const calculateRating = ({ columns, rows }: TList) => {
  const data: TRateDashboardData[] = [];

  columns.forEach((column) => {
    if (column.type === "RATING") {
      let average_rating = 0;

      const ratings = rows
        .map((row) => {
          try {
            const content = parseJson<TRowContent>(row.content);
            if (!content) return null;
            const rating = Number(content[column.id]);

            if (isNaN(rating)) return null;

            return Number(content[column.id]) || 0;
          } catch {
            return null;
          }
        })
        .filter((rating) => rating !== null);

      average_rating = ratings.length
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0;

      data.push({
        ...column,
        average_rating: Math.round(average_rating * 10) / 10,
      });
    }
  });

  return data;
};

export const calculateMostSelectedChoice = (props: TOptionsList) => {
  const { columns, rows } = props;
  const data: TMostSelectedOptions[] = [];
  const choice_counts: Record<string, number> = {};

  columns.forEach((column) => {
    if (column.type === "CHOICE") {
      rows.forEach((row) => {
        try {
          const content = parseJson<TRowContent>(row.content);
          if (!content) return;
          const choiceId = content[column.id];
          if (!choiceId) return;

          choice_counts[choiceId] = (choice_counts[choiceId] || 0) + 1;
        } catch {
          return;
        }
      });

      data.push({ ...column, choice_counts });
    }
  });

  return data;
};

// types
type TRowContent = { [x: string]: string | number };

interface TList {
  columns: Column[];
  rows: Row[];
}

type ColumnWithOptions = Column & { choices: Choice[] };

interface TOptionsList {
  columns: ColumnWithOptions[];
  rows: Row[];
}

interface TSendEmails {
  email: string;
}

interface TResizeFile {
  file: File;
  width: number;
  height: number;
}

interface TDefaultPassword {
  password: string;
  email: string;
}

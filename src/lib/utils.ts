import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Resend } from "resend";
import { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { UserRole } from "@prisma/client";
import Resizer from "react-image-file-resizer";
import jwt from "jsonwebtoken";
import emailjs from "@emailjs/browser";

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

// types
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

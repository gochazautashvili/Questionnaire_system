import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Resend } from "resend";
import { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { UserRole } from "@prisma/client";

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

export const parseJson = (value: string) => {
  try {
    return JSON.parse(value);
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
      return "This user is admin";
    case "MEMBER":
      return "This user can create edit and delete";
    case "VIEWER":
      return "This user only can see";
    default:
      return null;
  }
};

export const getWhatCanUsers = (role: UserRole) => {
  const canActions = role === "ADMIN" || role === "OWNER" || role === "MEMBER";

  const workWithUsers = role === "ADMIN" || role === "OWNER";

  return { workWithUsers, canActions };
};

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

// types
interface TDefaultPassword {
  password: string;
  email: string;
}

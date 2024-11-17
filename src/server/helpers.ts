"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getWhatCanUsers, resend } from "@/lib/utils";
import { EmailTemplate } from "@/components/EmailTemplate";
import { getUser } from "@/lib/auth";
const JWT_SECRET = process.env.JWT_SECRET;

export const setCookies = ({ name, value }: TCookies) => {
  if (!JWT_SECRET) throw new Error("You need JWT SECRET in env file");

  const JWT_DATA = jwt.sign(value, JWT_SECRET);

  cookies().set(name, JWT_DATA, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 2,
    secure: process.env.NODE_ENV === "development",
  });
};

export const getCookies = async (name: string) => {
  if (!JWT_SECRET) throw new Error("You need JWT SECRET in env file");

  try {
    const data = cookies().get(name);

    if (!data) return null;

    const verified_data = jwt.verify(data.value, JWT_SECRET);

    if (typeof verified_data !== "string") return null;

    return verified_data as string;
  } catch (_) {
    return null;
  }
};

export const sendEmails = (data: TSendEmail) => {
  const { name, subject, to } = data;

  if (!JWT_SECRET) throw new Error("You need JWT SECRET in env file");

  const user_JWT = jwt.sign({ email: to[0] }, JWT_SECRET, {
    expiresIn: 60 * 3,
  });

  return resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    react: EmailTemplate({ name, user_JWT }),
  });
};

export async function verify_jwt_token<T>(token: string) {
  if (!JWT_SECRET) throw new Error("You need JWT SECRET in env file");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as T;

    return { valid: true, expired: false, data: decoded };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return { valid: false, expired: true, data: null };
    }

    return { valid: false, expired: false, data: null };
  }
}

export const checkWhatUserCan = async (type: TCheckRole) => {
  const currentUser = await getUser();

  if (!currentUser) {
    return { success: false, message: "User not found" };
  }

  const { canActions, workWithUsers } = getWhatCanUsers(currentUser.role);

  switch (type) {
    case "actions":
      return { success: canActions, message: "This user can't any actions" };
    case "users_actions":
      return {
        success: workWithUsers,
        message: "This user can't user actions",
      };
    default:
      return { success: false, message: "type is not found" };
  }
};

// types
interface TCookies {
  name: string;
  value: string;
}

interface TSendEmail {
  to: string[];
  subject: string;
  name: string;
}

type TCheckRole = "users_actions" | "actions";
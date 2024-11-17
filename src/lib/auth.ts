"use server";
import { getCookies } from "@/server/helpers";
import db from "./db";
import { cache } from "react";

export const getUser = cache(async () => {
  try {
    const userId = await getCookies("user_session");

    if (!userId) return null;

    const user = await db.user.findUnique({
      where: { id: userId, verified_email: true },
    });

    return user;
  } catch (_) {
    return null;
  }
});

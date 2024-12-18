"use server";
import { getErrorMessage, getIsDefaultPassword } from "@/lib/utils";
import {
  sign_in_schema,
  sign_up_schema,
  TSign_in_schema,
  TSign_up_schema,
} from "../validations";
import { create_user, delete_accountDb, getUserByEmail } from "../db/auth";
import bcrypt from "bcrypt";
import { sendEmails, setCookies } from "../helpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

// POST
export const sign_up = async (values: TSign_up_schema) => {
  try {
    const { data, error } = sign_up_schema.safeParse(values);

    if (error) {
      return { success: false, message: error.message };
    }

    const existUser = await getUserByEmail(data.email);

    if (existUser) {
      return { success: false, message: "User already exist!" };
    }

    const hash_password = await bcrypt.hash(data.password, 10);

    const validData = {
      name: data.name,
      email: data.email,
      hash_password,
    };

    const user = await create_user(validData);

    const { error: email_error } = await sendEmails({
      name: user.name,
      subject: "Verify your email address",
      to: [user.email],
    });

    if (email_error) {
      return { success: false, message: email_error.message };
    }

    return {
      success: true,
      message: "Link for email verification is sended on your email :)",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const sign_in = async (values: TSign_in_schema) => {
  try {
    const { data, error } = sign_in_schema.safeParse(values);

    if (error) {
      return { success: false, message: error.message };
    }

    const existUser = await getUserByEmail(data.email);

    if (!existUser) {
      return { success: false, message: "User not found!" };
    }

    const valid_password = await bcrypt.compare(
      data.password,
      existUser.hash_password,
    );

    const isDefaultPassword = getIsDefaultPassword({
      email: existUser.email,
      password: existUser.hash_password,
    });

    if (!valid_password && !isDefaultPassword) {
      return { success: false, message: "User not found!" };
    }

    if (!existUser.verified_email) {
      const { error: email_error } = await sendEmails({
        name: existUser.name,
        subject: "Verify your email address",
        to: [existUser.email],
      });

      if (email_error) {
        return { success: false, message: email_error.message };
      }

      return {
        success: true,
        message:
          "This email is not verified, Link for email verification is sended on your email :)",
      };
    }

    setCookies({ name: "user_session", value: existUser.id });

    return {
      success: true,
      message: "User sign in successfully :)",
      redirect: true,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const sign_out = () => {
  cookies().delete("user_session");
  redirect("/auth");
};

export const sign_in_demo_user = async () => {
  try {
    const existUser = await getUserByEmail("gochazautashvili2017@gmail.com");

    if (!existUser) {
      return { success: false, message: "User not found!" };
    }

    setCookies({ name: "user_session", value: existUser.id });

    return {
      success: true,
      message: "User sign in successfully :)",
      redirect: true,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// Delete
export const delete_account = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, message: "User not found" };
    }

    await delete_accountDb(user.organizationId);

    return {
      success: true,
      message: "This account deleted successfully, and all relatable data",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

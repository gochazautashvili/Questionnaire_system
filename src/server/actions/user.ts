"use server";
import {
  create_userDb,
  delete_userDb,
  edit_nameDb,
  edit_passwordDb,
  edit_userDb,
  getOrganizationUsersCount,
} from "../db/user";
import bcrypt from "bcrypt";
import { person_schema, TPersonSchema } from "../validations";
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache";
import {
  generatePassword,
  getErrorMessage,
  getIsDefaultPassword,
} from "@/lib/utils";
import { getUserByEmail } from "../db/auth";
import { checkWhatUserCan } from "../helpers";
import { getUser } from "@/lib/auth";

// Edit
export const edit_name = async ({ name, userId }: TEditName) => {
  try {
    await edit_nameDb({ name, userId });

    revalidateDbCache({
      tag: CACHE_TAGS.users,
      id: userId,
    });
    return { success: true, message: "Your name updated successfully" };
  } catch (error) {
    return {
      success: true,
      message: getErrorMessage(error),
    };
  }
};

export const edit_password = async (data: TEditPassword) => {
  const { new_password, old_password } = data;

  try {
    const user = await getUser();

    if (!user) {
      return { success: false, message: "User not found try agin sign in" };
    }

    const validPassword = await bcrypt.compare(
      old_password,
      user.hash_password,
    );

    const isDefaultPassword = getIsDefaultPassword({
      email: user.email,
      password: old_password,
    });

    if (!validPassword && !isDefaultPassword) {
      return { success: false, message: "Old password is not valid" };
    }

    const hash_password = await bcrypt.hash(new_password, 10);

    await edit_passwordDb({ hash_password, userId: user.id });

    revalidateDbCache({
      tag: CACHE_TAGS.users,
      id: user.id,
    });
    return { success: true, message: "Your password edited successfully" };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const edit_user = async ({ profileId, values, userId }: TEditUser) => {
  try {
    const { data, error } = person_schema.safeParse(values);

    if (error) {
      return { success: false, message: error.message };
    }

    const { success, message } = await checkWhatUserCan("users_actions");

    if (!success) return { success: false, message };

    await edit_userDb({ userId, data });

    revalidateDbCache({
      tag: CACHE_TAGS.organization_users,
      id: profileId,
    });
    return { success: true, message: "user edited successfully" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// Post
export const create_user = async (data: TCreateUser) => {
  const { organizationId, values, profileId } = data;

  const hash_password = generatePassword(data.values.email);

  try {
    const { data, error } = person_schema.safeParse(values);

    if (error) return { success: false, message: error.message };

    const { success, message } = await checkWhatUserCan("users_actions");

    if (!success) return { success: false, message };

    const user_count = await getOrganizationUsersCount(organizationId);

    if (user_count >= 10) {
      return { success: false, message: "You can create only 10 user" };
    }

    const existedUser = await getUserByEmail(data.email);

    if (existedUser) {
      return { success: false, message: "This email already exist!" };
    }

    await create_userDb({ hash_password, organizationId, data });

    revalidateDbCache({
      tag: CACHE_TAGS.organization_users,
      id: profileId,
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

// Delete
export const delete_user = async ({ profileId, userId }: TDeleteUser) => {
  try {
    const { success, message } = await checkWhatUserCan("users_actions");

    if (!success) return { success: false, message };

    await delete_userDb(userId);

    revalidateDbCache({
      tag: CACHE_TAGS.organization_users,
      id: profileId,
    });
    return { success: true, message: "User successfully deleted" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

// types

interface TEditName {
  userId: string;
  name: string;
}

interface TEditPassword {
  old_password: string;
  new_password: string;
}

interface TCreateUser {
  profileId: string;
  values: TPersonSchema;
  organizationId: string;
}

interface TDeleteUser {
  userId: string;
  profileId: string;
}

interface TEditUser {
  userId: string;
  profileId: string;
  values: TPersonSchema;
}

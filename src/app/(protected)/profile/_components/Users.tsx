import {
  getIsDefaultPassword,
  getNameStarts,
  getUserRoleDescription,
  getWhatCanUsers,
} from "@/lib/utils";
import { getOrganizationUsers } from "@/server/db/user";
import { User } from "@prisma/client";
import UsersMoreButton from "./profile/UsersMoreButton";
import CopyPassword from "./CopyPassword";
import { getUser } from "@/lib/auth";
import { CircleHelp } from "lucide-react";
import PopoverCard from "@/components/PopoverCard";

interface UsersProps {
  organizationId: string;
  userId: string;
}

const Users = async ({ organizationId, userId }: UsersProps) => {
  const users = await getOrganizationUsers({ organizationId, userId });
  const currentUser = await getUser();

  if (!currentUser) return null;

  if (!users.length) {
    return (
      <h1 className="my-10 text-center text-xl text-primary">
        You have not users. if you wont you can create
      </h1>
    );
  }

  const { workWithUsers } = getWhatCanUsers(currentUser.role);

  if (!workWithUsers) return null;

  return (
    <div className="flex flex-wrap gap-5">
      {users.map((user) => (
        <UserCard user={user} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default Users;

interface UserCardProps {
  user: User;
  currentUser: User;
}

const UserCard = ({ user, currentUser }: UserCardProps) => {
  const isDefaultPassword = getIsDefaultPassword({
    email: user.email,
    password: user.hash_password,
  });

  const { workWithUsers } = getWhatCanUsers(currentUser.role);

  return (
    <div className="flex-1 basis-[450px] rounded-md bg-white p-4">
      <div className="flex gap-2">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[18px] font-semibold uppercase text-white">
          {getNameStarts(user.name)}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between font-bold">
            {user.name}
            {workWithUsers && <UsersMoreButton user={user} />}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            {user.email}
            {!user.verified_email && (
              <p className="flex items-center gap-2 text-xs font-bold text-destructive">
                This email is not verified{" "}
                <PopoverCard content="You won't be able to assign a task to a user until they activate their email.">
                  <CircleHelp className="size-4 cursor-pointer" />
                </PopoverCard>
              </p>
            )}
          </div>
          <h1 className="mt-2 text-xs text-gray-500">
            {getUserRoleDescription(user.role)}
          </h1>
          {isDefaultPassword && workWithUsers && (
            <CopyPassword password={user.hash_password} />
          )}
        </div>
      </div>
    </div>
  );
};

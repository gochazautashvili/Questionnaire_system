import { User } from "@prisma/client";
import EditUser from "./profile/EditUser";
import EditPassword from "./profile/EditPassword";
import CreateUser from "./profile/CreateUser";
import { getWhatCanUsers } from "@/lib/utils";

interface EditProfileProps {
  user: User;
}

const EditProfile = ({ user }: EditProfileProps) => {
  const { workWithUsers } = getWhatCanUsers(user.role);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-10">
        <EditUser user={user} />
        <EditPassword />
      </div>
      {workWithUsers && (
        <CreateUser userId={user.id} organizationId={user.organizationId} />
      )}
    </div>
  );
};

export default EditProfile;

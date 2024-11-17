import { Tabs, TabsContent } from "@/components/ui/tabs";
import EditProfile from "./_components/EditProfile";
import Users from "./_components/Users";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import TabsListTriggers from "./_components/TabsListTriggers";
import { getUser } from "@/lib/auth";

interface ProfilePageProps {
  searchParams: { profile_page: string | null };
}

const ProfilePage = async ({
  searchParams: { profile_page },
}: ProfilePageProps) => {
  const user = await getUser();

  if (!user) return notFound();

  return (
    <Tabs defaultValue={profile_page || "edit-profile"}>
      <TabsListTriggers role={user.role} />
      <Separator className="mb-5 h-[2px] rounded-lg bg-emerald-500" />
      <TabsContent value="edit-profile">
        <EditProfile user={user} />
      </TabsContent>
      <TabsContent value="users">
        <Suspense fallback={<UsersLoading />}>
          <Users organizationId={user.organizationId} userId={user.id} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePage;

const UsersLoading = () => {
  return (
    <div className="my-10 flex h-full w-full items-center justify-center">
      <Loader2 className="mx-auto size-8 animate-spin text-primary" />
    </div>
  );
};

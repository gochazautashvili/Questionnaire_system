"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWhatCanUsers } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { useQueryState } from "nuqs";

interface TabsListTriggersProps {
  role: UserRole;
}

const TabsListTriggers = ({ role }: TabsListTriggersProps) => {
  const [page, setPage] = useQueryState("profile_page");

  const { workWithUsers } = getWhatCanUsers(role);

  return (
    <TabsList>
      <TabsTrigger onClick={() => setPage(null)} value="edit-profile">
        Edit profile
      </TabsTrigger>
      {workWithUsers && (
        <TabsTrigger onClick={() => setPage("users")} value="users">
          Organization users
        </TabsTrigger>
      )}
    </TabsList>
  );
};

export default TabsListTriggers;

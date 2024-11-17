"use client";
import { User } from "@prisma/client";
import { createContext, PropsWithChildren } from "react";

export const UserContext = createContext<User | null>(null);

interface UserProviderProps extends PropsWithChildren {
  user: User;
}

const UserProvider = ({ children, user }: UserProviderProps) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;

import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";

const useUser = () => {
  const user = useContext(UserContext);

  if (user === null) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return user;
};

export default useUser;

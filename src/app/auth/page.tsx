import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./_components/SignIn";
import SignUp from "./_components/SignUp";

const AuthPage = () => {
  return (
    <Tabs defaultValue="sign-in" className="w-full max-w-[500px]">
      <TabsList className="mb-7 grid grid-cols-2 bg-primary text-white">
        <TabsTrigger value="sign-in">Sign in</TabsTrigger>
        <TabsTrigger value="sign-up">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <SignIn />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
};

export default AuthPage;

import { PropsWithChildren } from "react";

const PublicLayout = ({ children }: PropsWithChildren) => {
  return <main className="px-3">{children}</main>;
};

export default PublicLayout;

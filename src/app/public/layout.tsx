import { PropsWithChildren } from "react";

const PublicLayout = ({ children }: PropsWithChildren) => {
  return <main>{children}</main>;
};

export default PublicLayout;

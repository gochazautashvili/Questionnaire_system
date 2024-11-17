import { TriangleAlert } from "lucide-react";
import Link from "next/link";

const Alert = () => {
  return (
    <Link
      href="/profile"
      className="fixed right-3 top-3 z-50 w-[200px] rounded-md bg-destructive/90 p-3 text-xs text-white"
    >
      <h1 className="mb-2 flex items-center gap-2 text-xl font-bold">
        <TriangleAlert /> Warning
      </h1>
      You need to change your password for security
    </Link>
  );
};

export default Alert;

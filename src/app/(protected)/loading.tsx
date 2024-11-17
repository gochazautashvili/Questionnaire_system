import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
};

export default loading;

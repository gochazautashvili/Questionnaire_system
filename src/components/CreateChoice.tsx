import useCreateChoice from "@/hooks/use-create-choice";
import { Input } from "./ui/input";

interface CreateChoiceProps {
  columnId: string;
}

const CreateChoice = ({ columnId }: CreateChoiceProps) => {
  const { mutate, isLoading } = useCreateChoice(columnId);

  return (
    <div className="mt-2 h-10 w-full border-b-2 border-b-gray-400">
      <Input
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            mutate({ columnId, name: e.currentTarget.value });
          }
        }}
        className="border-none outline-none"
        placeholder="Enter here new choice..."
      />
    </div>
  );
};

export default CreateChoice;

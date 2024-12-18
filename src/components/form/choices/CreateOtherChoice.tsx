import useCreateChoice from "@/hooks/use-create-choice";
import LoadingButton from "../../LoadingButton";

interface CreateOtherChoiceProps {
  columnId: string;
}

const CreateOtherChoice = ({ columnId }: CreateOtherChoiceProps) => {
  const { mutate, isLoading } = useCreateChoice(columnId);

  return (
    <div className="mt-2 h-10 w-full border-b-2 border-b-gray-400">
      <LoadingButton
        size="sm"
        className="w-full"
        variant="secondary"
        isLoading={isLoading}
        onClick={() => mutate({ columnId, name: "other", type: "OTHER" })}
      >
        Add other
      </LoadingButton>
    </div>
  );
};

export default CreateOtherChoice;

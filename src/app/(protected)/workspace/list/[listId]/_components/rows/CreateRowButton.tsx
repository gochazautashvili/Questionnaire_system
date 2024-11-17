"use client";
import LoadingButton from "@/components/LoadingButton";
import { Plus } from "lucide-react";
import useCreateRow from "../../hooks/useCreateRow";

interface CreateRowButtonProps {
  listId: string;
}

const CreateRowButton = ({ listId }: CreateRowButtonProps) => {
  const { isLoading, mutate } = useCreateRow(listId);

  const onClick = () => {
    mutate(listId);
  };

  return (
    <LoadingButton
      size="sm"
      RightIcon={Plus}
      variant="outline"
      onClick={onClick}
      isLoading={isLoading}
    >
      Create row
    </LoadingButton>
  );
};

export default CreateRowButton;

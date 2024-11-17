import { Trash } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import useDeleteRow from "../../hooks/useDeleteRow";

interface DeleteRowButtonProps {
  rowId: string;
}

const DeleteRowButton = ({ rowId }: DeleteRowButtonProps) => {
  const { mutate, isLoading } = useDeleteRow();

  return (
    <LoadingButton
      size="sm"
      RightIcon={Trash}
      variant="destructive"
      isLoading={isLoading}
      onClick={() => mutate(rowId)}
    >
      Delete
    </LoadingButton>
  );
};

export default DeleteRowButton;

import EditInput from "@/components/EditInput";
import useEditLinkName from "../hooks/use-edit-link-name";

interface CellProps {
  value: string;
  linkId: string;
  type: "name" | "code" | "location";
}

const Cell = ({ linkId, value, type }: CellProps) => {
  const { mutate } = useEditLinkName();

  return (
    <EditInput
      onSubmit={(name) => mutate({ linkId, name, type })}
      value={value}
    />
  );
};

export default Cell;

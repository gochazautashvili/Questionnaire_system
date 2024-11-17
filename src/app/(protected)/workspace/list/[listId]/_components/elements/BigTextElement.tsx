import EditTextarea from "@/components/EditTexarea";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useEditRow from "../../hooks/useEditRow";
import { TListData } from "@/lib/types";

interface BigTextElementProps {
  value: string;
  columnId: string;
  row: TListData;
  editable: boolean;
}

const BigTextElement = ({
  value,
  columnId,
  row,
  editable,
}: BigTextElementProps) => {
  const { mutate } = useEditRow();
  const onEditText = (text: string) => {
    mutate({ columnId, row, value: text });
  };

  return (
    <HoverCard openDelay={500}>
      <HoverCardTrigger className="line-clamp-1">{value}</HoverCardTrigger>
      <HoverCardContent className="max-h-[250px] overflow-y-auto">
        <EditTextarea editable={editable} onSubmit={onEditText} value={value} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default BigTextElement;

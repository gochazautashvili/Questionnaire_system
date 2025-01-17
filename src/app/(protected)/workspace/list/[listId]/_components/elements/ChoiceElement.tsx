import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useChoices from "@/hooks/use-choices";
import useSelectChoice from "../../hooks/useSelectChoice";
import { TListData } from "@/lib/types";
import useUser from "@/hooks/use-user";
import { getWhatCanUsers } from "@/lib/utils";

interface ChoiceElementProps {
  columnId: string;
  selectedId: string;
  row: TListData;
  editable: boolean;
}

const ChoiceElement = (props: ChoiceElementProps) => {
  const { columnId, editable, row, selectedId } = props;
  const { data, isLoading } = useChoices(columnId);
  const { mutate } = useSelectChoice();
  const user = useUser();

  if (isLoading) <Badge>Loading...</Badge>;

  if (!data) return <Badge>Empty</Badge>;

  const selectedChoice = data.find((d) => {
    if (d.id === selectedId && d.type === "NORMAL") return d;

    if (d.type === "OTHER") return selectedId;

    return null;
  });

  const { canActions } = getWhatCanUsers(user.role);

  const selectedChoiceValue =
    selectedChoice?.name === "other" ? selectedId : selectedChoice?.name;

  if (!canActions || !editable) {
    return (
      <Badge style={{ background: selectedChoice?.color }}>
        {selectedChoiceValue || "Not Selected"}
      </Badge>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Badge style={{ background: selectedChoice?.color }}>
          {selectedChoiceValue || "Not Selected"}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-1 p-1">
        {data.map((item) => (
          <Badge
            key={item.id}
            style={{ background: item.color }}
            onClick={() =>
              mutate({ choiceId: item.id, columnId, row, type: "default" })
            }
            className="w-full cursor-pointer"
          >
            {item.name}
          </Badge>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ChoiceElement;

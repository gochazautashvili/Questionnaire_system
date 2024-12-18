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
  selectedIds: string;
  row: TListData;
  editable: boolean;
}

const MultipleChoiceElement = (props: ChoiceElementProps) => {
  const { columnId, editable, row, selectedIds } = props;

  const { data, isLoading } = useChoices(columnId);
  const { mutate } = useSelectChoice();
  const user = useUser();

  if (isLoading) {
    return <Badge>Loading...</Badge>;
  }

  if (!data) {
    return <Badge>Empty</Badge>;
  }

  const selectedChoices = data.filter((d) => selectedIds.includes(d.id));

  const { canActions } = getWhatCanUsers(user.role);

  if (!canActions || !editable) {
    return (
      <Popover>
        <PopoverTrigger>
          <Badge>view answers</Badge>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center gap-1 p-1">
          {!!selectedChoices.length ? (
            selectedChoices.map((item) => (
              <Badge
                key={item.id}
                style={{ background: item.color }}
                className="w-full cursor-pointer"
              >
                {item.name}
              </Badge>
            ))
          ) : (
            <Badge className="w-full items-center justify-center bg-red-500 hover:bg-red-700">
              Not selected
            </Badge>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Badge>view answers</Badge>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col items-center gap-1 p-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <h1>selected</h1>
            {selectedChoices.map((item) => (
              <Badge
                key={item.id}
                style={{ background: item.color }}
                onClick={() =>
                  mutate({ choiceId: item.id, columnId, row, type: "default" })
                }
                className="cursor-pointer"
              >
                {item.name}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <h1>default</h1>
            {data.map((item) => (
              <Badge
                key={item.id}
                style={{ background: item.color }}
                onClick={() =>
                  mutate({ choiceId: item.id, columnId, row, type: "default" })
                }
                className="cursor-pointer"
              >
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MultipleChoiceElement;

import { TListData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import useEditRow from "../../hooks/useEditRow";

interface RatingElementProps {
  value: string;
  columnId: string;
  row: TListData;
  editable: boolean;
}

const RatingElement = ({
  columnId,
  row,
  value,
  editable,
}: RatingElementProps) => {
  const rate = Number(value);
  const { mutate } = useEditRow();

  const handleRate = (index: number) => {
    if (!editable) return;
    mutate({ columnId, row, value: index.toString() });
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <Star
            onClick={() => handleRate(i)}
            className={cn(
              "size-4",
              i <= rate && "fill-yellow-600 text-yellow-500",
              editable && "cursor-pointer",
            )}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default RatingElement;

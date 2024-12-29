import { TListData } from "@/lib/types";
import { cn, getRateClassName, getRateIconByType } from "@/lib/utils";
import useEditRow from "../../hooks/useEditRow";
import { RateType } from "@prisma/client";

interface RatingElementProps {
  value: string;
  row: TListData;
  columnId: string;
  editable: boolean;
  rate_range: number;
  rate_type: RateType;
}

const RatingElement = (props: RatingElementProps) => {
  const { columnId, editable, row, value, rate_range, rate_type } = props;
  const rate = Number(value);
  const { mutate } = useEditRow();

  const handleRate = (index: number) => {
    if (!editable) return;
    mutate({ columnId, row, value: index.toString() });
  };

  const Icon = getRateIconByType(rate_type);
  const className = getRateClassName(rate_type);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rate_range }).map((_, i) => {
        const currentRate = i + 1;

        return (
          <Icon
            onClick={() => handleRate(i)}
            className={cn(
              "size-4",
              rate >= currentRate && `${className}`,
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

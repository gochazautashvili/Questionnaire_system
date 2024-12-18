"use client";
import { getRateClassName, getRateIconByType } from "@/constants";
import { cn } from "@/lib/utils";
import { RateType } from "@prisma/client";
import { useState } from "react";

interface RatingElementProps {
  onRatingChange: (rate: number) => void;
  rate_type: RateType;
  rate_range: number;
}

const RatingElement = (props: RatingElementProps) => {
  const { onRatingChange, rate_range, rate_type } = props;
  const [rate, setRate] = useState(0);

  const Icon = getRateIconByType(rate_type);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rate_range }).map((_, i) => (
        <Icon
          onClick={() => {
            onRatingChange(i);
            setRate(i);
          }}
          key={i}
          className={cn(
            "size-5 cursor-pointer stroke-1",
            rate >= i && getRateClassName(rate_type),
          )}
        />
      ))}
    </div>
  );
};

export default RatingElement;

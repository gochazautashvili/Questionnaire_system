"use client";
import { getRateClassName, getRateIconByType } from "@/lib/utils";
import { RateType } from "@prisma/client";
import { useState } from "react";

interface RatingElementProps {
  onRatingChange: (rate: number) => void;
  border_color: string;
  rate_type: RateType;
  rate_range: number;
}

const RatingElement = (props: RatingElementProps) => {
  const { onRatingChange, rate_range, rate_type, border_color } = props;
  const [rate, setRate] = useState(0);

  const Icon = getRateIconByType(rate_type);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rate_range }).map((_, i) => {
        const currentRate = i + 1;

        return (
          <Icon
            key={i}
            style={{
              fill: rate >= currentRate ? getRateClassName(rate_type) : "",
              stroke: border_color,
            }}
            onClick={() => {
              onRatingChange(currentRate);
              setRate(currentRate);
            }}
            className="size-5 cursor-pointer stroke-1"
          />
        );
      })}
    </div>
  );
};

export default RatingElement;

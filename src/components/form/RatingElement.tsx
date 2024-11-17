"use client";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface RatingElementProps {
  onRatingChange: (rate: number) => void;
}

const RatingElement = ({ onRatingChange }: RatingElementProps) => {
  const [rate, setRate] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          onClick={() => {
            onRatingChange(i);
            setRate(i);
          }}
          key={i}
          className={cn(
            "size-5 cursor-pointer",
            rate >= i && "fill-yellow-500 text-yellow-500",
          )}
        />
      ))}
    </div>
  );
};

export default RatingElement;

import { cn } from "@/lib/utils";
import { useState } from "react";

interface NPSElementProps {
  nps_end: string;
  nps_start: string;
  text_color: string;
  border_color: string;
  onChange: (rate: number) => void;
}

const NPSElement = (props: NPSElementProps) => {
  const { nps_start, nps_end, onChange, border_color, text_color } = props;
  const [selectedRate, setSelectedRate] = useState(0);

  const handleClick = (rate: number) => {
    onChange(rate);
    setSelectedRate(rate);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        {Array.from({ length: 10 }).map((_, i) => {
          const rate = i + 1;

          return (
            <div
              onClick={() => handleClick(rate)}
              style={{ borderColor: border_color, color: text_color }}
              className={cn(
                "flex w-full cursor-pointer items-center justify-center rounded-sm border p-1",
                selectedRate >= rate ? "bg-green-400/50" : "bg-slate-50/30",
              )}
              key={i}
            >
              {rate}
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex items-center justify-between px-1">
        <p className="font-mono font-semibold">{nps_start}</p>
        <p className="font-mono font-semibold">{nps_end}</p>
      </div>
    </div>
  );
};

export default NPSElement;

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface NPSElementProps {
  value: string;
  nps_end: string;
  nps_start: string;
}

const NPSElement = ({ value, nps_end, nps_start }: NPSElementProps) => {
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Badge className="flex w-full justify-center">See answer</Badge>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        <div>
          <div className="flex items-center justify-between gap-2">
            {Array.from({ length: 10 }).map((_, i) => {
              const rate = i + 1;

              return (
                <div
                  className={cn(
                    "flex w-10 items-center justify-center rounded-sm border p-1",
                    Number(value) >= rate
                      ? "bg-green-400/50"
                      : "bg-slate-50/30",
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
      </PopoverContent>
    </Popover>
  );
};

export default NPSElement;

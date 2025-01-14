"use client";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TMostSelectedOptions } from "@/lib/types";

interface ChoiceChartProps {
  data: TMostSelectedOptions;
}

interface TChartConfig {
  [x: string]: {
    label: string;
    color: string;
  };
}

export function ChoiceChart({ data }: ChoiceChartProps) {
  const chartData = data.choices.map((choice) => ({
    fill: choice.color,
    choice: choice.name,
    count: data.choice_counts[choice.id] || 0,
  }));

  const generateChartConfig: TChartConfig = data.choices.reduce(
    (prev, choice) => {
      prev[choice.name] = {
        label: choice.name,
        color: choice.color,
      };

      if (!data.choice_counts[choice.id]) return {};

      return prev;
    },
    {} as TChartConfig,
  ) satisfies ChartConfig;

  const chartConfig = {
    ...generateChartConfig,
    count: {
      label: "Selected",
    },
  };

  return (
    <Card className="flex flex-1 basis-[400px] flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="choice" />
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2 rounded-md border bg-slate-100 p-3">
          {data.choices.map((choice) => {
            return (
              <div
                className="flex items-center justify-between border-b border-black/60"
                key={choice.id}
              >
                <div className="flex items-center gap-1">
                  <span
                    className="size-4 rounded-full"
                    style={{ background: choice.color }}
                  />
                  <p className="text-xs font-semibold">{choice.name}</p>
                </div>
                <span>{data.choice_counts[choice.id] || 0}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

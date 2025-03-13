import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "JANUARY", desktop: 186 },
  { month: "FEBRUARY", desktop: 305 },
  { month: "MARCH", desktop: 237 },
  { month: "APRIL", desktop: 73 },
  { month: "MAY", desktop: 209 },
  { month: "JUNE", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "BORROWED",
    color: "hsl(var(--chart-1))",
  },
};

export function AllBooks() {
  return (
    <Card className={"w-full h-50 border-none shadow-none"}>
      <CardHeader className={"w-full flex flex-col"}>
        <CardTitle className={"uppercase"}>borrowed</CardTitle>
        <CardDescription className={"uppercase"}>
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="black"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}

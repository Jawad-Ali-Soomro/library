"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  XAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

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
  { month: "January", students: 186, sales: 100 },
  { month: "February", students: 305, sales: 150 },
  { month: "March", students: 237, sales: 120 },
  { month: "April", students: 73, sales: 50 },
  { month: "May", students: 209, sales: 180 },
  { month: "June", students: 214, sales: 160 },
  { month: "July", students: 186, sales: 100 },
  { month: "August", students: 305, sales: 150 },
  { month: "September", students: 237, sales: 120 },
  { month: "October", students: 73, sales: 50 },
  { month: "November", students: 209, sales: 180 },
  { month: "December", students: 214, sales: 160 },
];

const chartConfig = {
  students: {
    label: "STUDENTS",
    color: "hsl(var(--chart-1))",
  },
  sales: {
    label: "BOOKS",
    color: "hsl(var(--chart-1))",
  },
};

export function AllUsers() {
  return (
    <div className="flex gap-4">
      <Card className="w-1/2 sm:w-full border-none shadow-none">
        <CardHeader>
          <CardTitle>STUDENTS</CardTitle>
          <CardDescription className={"uppercase"}>
            January - June 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="month"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                content={<ChartTooltipContent hideLabel />}
                cursor={{ fill: "black" }}
              />
              <Line
                dataKey="students"
                type="monotone"
                stroke="black"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      {/* Bar Chart Section */}
      <Card className="w-1/2 sm:w-full border-none shadow-none">
        <CardHeader>
          <CardTitle>BOOKS</CardTitle>
          <CardDescription className={"uppercase"}>
            January - June 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              className="hover:bg-white"
              margin={{ left: 12, right: 12 }}
            >
              {/* <CartesianGrid vertical={true} /> */}
              <XAxis
                dataKey="month"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                content={<ChartTooltipContent hideLabel />}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              <Bar dataKey="sales" fill="black" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm"></CardFooter>
      </Card>

      {/* Line Chart Section */}
    </div>
  );
}

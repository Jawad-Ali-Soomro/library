import { useUser } from "@/middleware/user";
import { axiosInstance } from "@/utils/axiosInstance";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
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

const AdminDashboard = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/all");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    const fetchBooks = async () => {
      const response = await axiosInstance.post("/book/get/all");
      setBooks(response.data);
    };
    fetchBooks();
  }, []);
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };
  return (
    <div className="flex w-full h-full flex flex-col align-end ">
      <div className="cards flex justify-between">
        <div className="card w-[49%] h-[400px] bg-gray-100 items-center justify-center flex-col flex">
          <h1 className="uppercase text-[30px] font-semibold">
            Users Enrolled
          </h1>
          <h1 className="uppercase text-[90px] font-semibold">
            {users?.length}
          </h1>
        </div>
        <div className="card w-[49%] h-[400px] bg-gray-100 items-center justify-center flex-col flex">
          <h1 className="uppercase text-[30px] font-semibold">Total Books</h1>
          <h1 className="uppercase text-[90px] font-semibold">
            {books?.length}
          </h1>
        </div>
      </div>
      <div className="">
        <Card className={" shadow-none border-none"}>
          <CardContent className={"border-none shadow-none"}>
            <ChartContainer
              config={chartConfig}
              className={"shadow-none border-none"}
            >
              <ResponsiveContainer height={300}>
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  width={800}
                  height={300}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                    s
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

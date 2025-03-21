import { useUser } from "@/middleware/user";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AdminDashboard = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axiosInstance.get("/user/all");
        setUsers(usersResponse.data.users);

        const booksResponse = await axiosInstance.post("/book/get/all");
        setBooks(booksResponse.data);

        const borrowedResponse = await axiosInstance.get("/book/borrowed");
        setBorrowed(borrowedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare chart data
  const chartData = [
    { name: "Users", value: users?.length || 0, fill: "blue" },
    { name: "Books", value: books?.length || 0, fill: "blueviolet" },
    {
      name: "Borrowed",
      value: borrowed?.length || 0,
      fill: "orange",
    },
  ];

  const chartConfig = {
    value: {
      label: "Value",
    },
    Users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
    Books: {
      label: "Books",
      color: "hsl(var(--chart-2))",
    },
    Borrowed: {
      label: "Borrowed Books",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="cards flex justify-between mt-2">
        <div className="card w-[49%] rounded-xl h-[400px] bg-blue-500 items-center text-white justify-center flex-col flex">
          <h1 className="uppercase text-[30px] font-semibold">
            Users Enrolled
          </h1>
          <h1 className="uppercase text-[90px] font-semibold">
            {users?.length}
          </h1>
        </div>
        <div className="card w-[49%] rounded-xl h-[400px] bg-[blueviolet] text-white items-center justify-center flex-col flex">
          <h1 className="uppercase text-[30px] font-semibold">Total Books</h1>
          <h1 className="uppercase text-[90px] font-semibold">
            {books?.length}
          </h1>
        </div>
      </div>
      <div className="cards flex justify-between mt-10">
        <div className="card w-[49%] rounded-xl h-[400px] text-white bg-[orange] items-center justify-center flex-col flex">
          <h1 className="uppercase text-[30px] font-semibold">
            Borrowed Books
          </h1>
          <h1 className="uppercase text-[90px] font-semibold">
            {borrowed?.length}
          </h1>
        </div>
        <div className="card w-[49%] rounded-xl h-[400px] items-center justify-center flex-col flex">
          <ChartContainer config={chartConfig} className="border h-full rounded-xl w-full">
            <BarChart className="h-full" accessibilityLayer data={chartData}>
              <ChartTooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.005)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent>
                        <p className="text-white bg-gray-100 p-2 rounded">
                          {payload[0].name}: {payload[0].value}
                        </p>
                      </ChartTooltipContent>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                name="name"
                fill="fill"
                radius={4}
                className="rounded-xl"
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

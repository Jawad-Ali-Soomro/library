import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect } from "react";
import { Button } from "./ui/button";

const UserDashboard = () => {
  const [title, setTitle] = useState("");
  const [publishedYear, setPublishYear] = useState("");
  const [category, setCategory] = useState("");
  const [books, setBooks] = useState([]);
  const departments = [
    "Computer Science",
    "Commerce",
    "Education",
    "Business",
    "English",
    "Mathematics",
  ];

  const fetchBooks = async () => {
    const response = await axiosInstance.post("/book/get/all", {
      title,
      publishedYear,
      category,
    });
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  });
  const years = [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];
  return (
    <div className="flex flex-col relative mt-10">
      <div className="top-search flex gap-2 w-full  justify-end items-end">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={"w-[300px] py-4"}
        ></Input>
        <div className="flex">
          <Select
            onValueChange={(value) => setCategory(value)}
            className="w-full px-10"
          >
            <SelectTrigger className={"w-[200px] h-20"}>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments?.map((dept) => {
                return <SelectItem value={dept}>{dept}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          <Select
            className="w-full px-10"
            onValueChange={(value) => setPublishYear(value)}
          >
            <SelectTrigger className={"w-[150px] h-20"}>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years?.map((year) => {
                return <SelectItem value={year}>{year}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="bottom gap-2 mt-10 flex flex-wrap justify-between wrap w-full">
        {books?.map((book) => {
          return (
            <div className="rounded-md relative flex  w-[1/2] flex-col gap-2 p-5 items-end">
              <img
                className="w-[350px] rounded-xl h-[450px]"
                src={book?.image}
                alt=""
              />
              <Button className={"w-[100px] rounded-xl py-5 mt-2 uppercase"}>
                Get
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;

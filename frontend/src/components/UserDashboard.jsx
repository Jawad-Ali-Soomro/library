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
import toast from "react-hot-toast";
import { useUser } from "@/middleware/user";
import FullImage from "./FullImage";

const UserDashboard = () => {
  const { user, fetchUser } = useUser();
  const [title, setTitle] = useState("");
  const [publishedYear, setPublishYear] = useState("");
  const [category, setCategory] = useState("");
  const [books, setBooks] = useState([]);
  const [showIMage, setSHowIMage] = useState(false);
  const [imgUrl, setImageUrl] = useState("")
  const onClose = () => {
    setSHowIMage(false);
  }
  const departments = [
    "Information Technology",
    "Computer Science",
    "Commerce",
    "Education",
    "Business",
    "English",
    "Mathematics",
  ];

  const isBorrowed = (bookId) => {
    const borrowedBooks = user?.borrowedBooks || [];
    return borrowedBooks.some((book) => book.book._id === bookId);
  };

  const fetchBooks = async () => {
    const response = await axiosInstance.post("/book/get/all", {
      title,
      publishedYear,
      category,
    });
    setBooks(response.data);
  };

  const borrowBook = async (bookId) => {
    if (user.borrowedBooks.length >= 4) {
      return toast.error("Borrow Limit Exceeded");
    }
    try {
      const response = await axiosInstance.post(`/book/borrow`, {
        userId: user?._id,
        bookId,
      });
      if (response.data.success) {
        toast.success("Book borrowed successfully");
      } else {
        toast.error("Failed to borrow book");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUser();
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
                onClick={() => {setSHowIMage(true); setImageUrl(book?.image)}}
              />
              <Button
                className={"w-[100px] rounded-xl py-5 mt-2 uppercase"}
                onClick={() => borrowBook(book?._id)}
                disabled={isBorrowed(book._id)}
              >
                Get
              </Button>
            </div>
          );
        })}
      </div>
          {
            showIMage && (
              <FullImage imageUrl={imgUrl} onClose={onClose} />
            )
          }
    </div>
  );
};

export default UserDashboard;

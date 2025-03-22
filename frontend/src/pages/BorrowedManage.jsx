import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/constants/formatDate";
import { axiosInstance } from "@/utils/axiosInstance";
import { TimerOff, Timer } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BorrowedManage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBorrowed = async () => {
    try {
      const response = await axiosInstance.get("/book/borrowed");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
  };

  const returnBook = async (bookId) => {
    const response = await axiosInstance.post("/book/return", {
      borrowId: bookId,
    });
    if (response.data) {
      toast.success("Book returned successfully");
      await fetchBorrowed();
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  // Filter books based on title or borrower username
  const filteredBooks = books.filter((book) => {
    const titleMatch = book?.book?.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const userMatch = book?.borrower?.username
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || userMatch;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end w-full mt-10 mb-10">
        <Input
          className="w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap wrap w-full justify-between">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="rounded-md relative flex flex-col gap-2 p-2"
          >
            <img
              className="w-[350px] rounded h-[450px]"
              src={book?.book?.image}
              alt={book?.book?.title}
            />
            <div className="user-info flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="w-[40px] h-[40px] rounded-full border border-gray-400"
                  src={book?.borrower?.avatar || "/default.jpg"}
                  alt={book?.borrower?.username}
                />
                <h1>{book?.borrower?.username}</h1>
              </div>
              <div className="flex px-3 py-2 bg-gray-100 rounded border">
                {formatDate(book?.borrowedAt)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`flex items-center gap-5 px-5 py-2 ${
                  book?.returnedAt ? "bg-green-200" : "bg-gray-100"
                } text-black rounded border`}
              >
                {book.returnedAt ? (
                  <TimerOff size={"18"} />
                ) : (
                  <span className="timer w-2 h-2 bg-white rounded-xl"></span>
                )}
                {book.returnedAt
                  ? formatDate(book?.returnedAt)
                  : formatDate(book?.dueDate)}
              </div>
              <Button
                className="w-[150px] rounded py-5 uppercase"
                onClick={() => returnBook(book?._id)}
                disabled={book?.returnedAt}
              >
                {book?.returnedAt ? "Returned" : "Return"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedManage;

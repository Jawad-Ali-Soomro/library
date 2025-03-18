import { useUser } from "@/middleware/user";
import React, { useEffect, useState } from "react";

const Borrowed = () => {
  const { user } = useUser();
  const [timers, setTimers] = useState({});
  console.log(user);

  useEffect(() => {
    if (!user?.borrowedBooks?.length) return;

    const updateTimers = () => {
      const updatedTimers = {};
      user.borrowedBooks.forEach((book) => {
        updatedTimers[book._id] = calculateRemainingTime(book.dueDate);
      });
      setTimers(updatedTimers);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);

    return () => clearInterval(interval);
  }, [user?.borrowedBooks]);

  const calculateRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeRemaining = due - now;

    if (timeRemaining <= 0) return "Time Expired";

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <div className="bottom gap-2 mt-10 flex flex-wrap justify-start wrap w-full">
        {user?.borrowedBooks?.map((book) => (
          <div
            key={book?.id}
            className="rounded-md relative flex w-[1/2] flex-col gap-2 p-5 items-end"
          >
            <img
              className="w-[350px] rounded-xl h-[450px]"
              src={book?.book?.image}
              alt={book?.book?.title || "Book Image"}
            />
            <p className="px-5 w-50 flex justify-between items-center rounded-2xl text-black py-2 bg-gray-100 text-[15px] font-semibold mt-2">
              <span className="w-3 h-3 bg-gray-500 timer rounded-xl"></span>{" "}
              {timers[book._id] || "Calculating..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrowed;

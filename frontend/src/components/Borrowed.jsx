import { useUser } from "@/middleware/user";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { formatDate } from "@/constants/formatDate";

const Borrowed = () => {
  const { user, fetchUser } = useUser();
  console.log(user);

  return (
    <div>
      <div className="bottom gap-2 mt-10 flex flex-wrap justify-start wrap w-full">
        {user?.borrowedBooks?.map((book) => {
          return (
            <div className="rounded-md relative flex  w-[1/2] flex-col gap-2 p-5 items-end">
              <img
                className="w-[350px] rounded-xl h-[450px]"
                src={book?.book?.image}
                alt=""
              />
              <p className="px-5 rounded-2xl text-white py-2 bg-blue-600 text-[15px] font-semibold mt-2">
                {" "}
                {formatDate(book?.borrowedAt)}
              </p>
              {book?.returnedAt && (
                <p className="px-5 rounded-2xl text-white py-2 bg-blue-600 text-[15px] font-semibold mt-2">
                  <span>Returned</span>
                  {formatDate(book?.returnedAt)}
                </p>
              )}
              <p className="px-5 rounded-2xl text-white py-2 bg-red-600 text-[15px] font-semibold mt-2">
                {" "}
                {formatDate(book?.dueDate)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Borrowed;

import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Cross } from "lucide-react";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  return (
    <div className="w-[400px] fixed border right-[50px] bottom-[00px]  border border-gray-300">
      <div
        className="top flex w-full h-[50px] flex px-3 justify-between items-center no-round bg-gray-900 rounded-none cursor-pointer text-white"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <h1 className="font-semibold uppercase">Let's Chat</h1>
      </div>
      <div
        className={` flex items-end justify-center pb-2 bg-white overflow-hidden ${
          showChatbot ? "h-[400px]" : "h-[0px]"
        }`}
      >
        <div className="flex w-[80%] border border-gray-200 rounded ">
          <Input className={"border-none outline-none"} />
          <div className="flex items-center justify-center w-[38px] bg-blue-500 text-white rounded h-[38px]">
            <Send className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

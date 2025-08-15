import CheckImage from "@svg/icon-check.svg";
import type React from "react";
import { useState, type ChangeEvent } from "react";
import "./InputTaskBar.css";

export function InputTaskBar() {
  const [taskValue, setTaskValue] = useState("");
  const [isCheckBoxPressed, setIsCheckBoxPressed] = useState(false);

  function isCheckBoxPressedHandler() {
    setIsCheckBoxPressed((prev) => !prev);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const taskText = e.target.value;
    setTaskValue(taskText);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      console.log(taskValue);
    }
  }

  //hover:bg-gradient-to-tl from-purple-400 to-cyan-300
  return (
    <>
      <section
        className="w-full h-10 bg-gray-50 relative rounded-[5px] flex justify-baseline items-center"
        onKeyDown={handleKeyPress}
      >
        <input type="checkbox" id="checkbox-id" className="hidden" />
        <label
          htmlFor="checkbox-id"
          className="absolute left-3 w-5 h-5 flex items-center justify-center"
        >
          <span
            className="checkbox-inner w-full h-full flex justify-center items-center text-transparent border-gray-300 border-2 rounded-full cursor-pointer"
            onClick={isCheckBoxPressedHandler}
          >
            {isCheckBoxPressed ? <img src={CheckImage} /> : ""}
          </span>
        </label>
        <input
          type="text"
          id="inputTaskField"
          placeholder="Create a new todo..."
          className="w-full h-full text-sm pl-12"
          onChange={handleInputChange}
        />
      </section>
    </>
  );
}

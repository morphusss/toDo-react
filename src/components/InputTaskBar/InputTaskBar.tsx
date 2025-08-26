import { CheckboxComponent } from "@components/CheckboxComponent";
import { useTodoActions } from "@store/taskListStore";
import type React from "react";
import { useState, type ChangeEvent } from "react";
import "./InputTaskBar.css";
import { calculateIndex } from "./calculateIndex";

export function InputTaskBar() {
  const { addTodo } = useTodoActions();
  const [taskValue, setTaskValue] = useState("");
  const [isInputFieldPressed, setIsInputFieldPressed] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const taskText = e.target.value;
    setTaskValue(taskText);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      addTodo({
        id: calculateIndex(),
        isComplete: isInputFieldPressed,
        taskValue: taskValue,
      });
    }
  }

  //hover:bg-gradient-to-tl from-purple-400 to-cyan-300
  return (
    <>
      <section
        className="w-full h-10 bg-gray-50 relative rounded-[5px] flex justify-baseline items-center shadow-md"
        onKeyDown={handleKeyPress}
      >
        <section className="w-fit h-fit absolute left-3">
          <CheckboxComponent
            isCheckBoxPressed={isInputFieldPressed}
            setIsCheckBoxPressed={setIsInputFieldPressed}
            task_id={-1}
          />
        </section>
        <input
          type="text"
          id="inputTaskField"
          placeholder="Create a new todo..."
          className="w-full h-full text-sm pl-12"
          onChange={handleInputChange}
          value={taskValue}
        />
      </section>
    </>
  );
}

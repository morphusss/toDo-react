import CheckMarkImage from "@svg/icon-check-mark.svg?react";
import { CheckboxComponent } from "@components/CheckboxComponent";
import { useTodoActions, useTodos, useTodoStore } from "@store/taskListStore";
import type React from "react";
import { useState, type ChangeEvent } from "react";
import { calculateIndex } from "@utils/calculateIndex";

export function InputTaskBar() {
  const todosList = useTodoStore((state) => state.tasks);
  const { addTodo, addFilterTodo } = useTodoActions();
  const [taskValue, setTaskValue] = useState("");
  const [isInputFieldPressed, setIsInputFieldPressed] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const taskText = e.target.value;
    setTaskValue(taskText);
  }

  const list = useTodos();
  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      addTodo({
        id: calculateIndex(),
        isComplete: isInputFieldPressed,
        taskValue: taskValue,
      });
      addFilterTodo({
        id: calculateIndex(),
        isComplete: isInputFieldPressed,
        taskValue: taskValue,
      });
    }

    localStorage.setItem("ToDoList", JSON.stringify(list));
  }

  function addTodoByButton() {
    addTodo({
      id: calculateIndex(),
      isComplete: isInputFieldPressed,
      taskValue: taskValue,
    });
    addFilterTodo({
      id: calculateIndex(),
      isComplete: isInputFieldPressed,
      taskValue: taskValue,
    });
    localStorage.setItem("ToDoList", JSON.stringify(list));
  }

  return (
    <>
      <section
        className="group w-full h-10 bg-gray-50 dark:bg-[#25273c] relative rounded-[5px] flex justify-baseline items-center shadow-md "
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
          className="w-full h-full text-sm pl-12 text-gray-500 focus:outline-0 dark:text-purple-100"
          onChange={handleInputChange}
          value={taskValue}
        />
        <button
          className={`w-8 h-8 flex justify-center items-center shadow-md rounded-[5px]
                    bg-white dark:bg-[#2a2c42] absolute right-1.5 lg:opacity-0 
                      lg:group-hover:opacity-100 lg:group-hover:motion-preset-expand active:scale-90 lg:active:scale-90 cursor-pointer`}
          onClick={() => addTodoByButton()}
        >
          <CheckMarkImage />
        </button>
      </section>
    </>
  );
}

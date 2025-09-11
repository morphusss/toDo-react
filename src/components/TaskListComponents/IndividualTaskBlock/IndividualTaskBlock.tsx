import { CheckboxComponent } from "@components/CheckboxComponent";
import {
  useTodoActions,
  useTodos,
  type TaskState,
} from "@src/store/taskListStore";
import CrossImage from "@svg/icon-cross.svg?react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { TaskValueBlock } from "@components/TaskListComponents/TaskValueBlock";

type Props = {
  task: TaskState;
};

export function IndividualTaskBlock({ task }: Props) {
  const id = task.id;
  const todosStore = useTodos();
  const { updateList, updateFilteredList } = useTodoActions();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [isCheckBoxPressed, setIsCheckBoxPressed] = useState(
    task.isComplete || false
  );

  function deleteTodo(array: TaskState[], todo: TaskState) {
    const correctArray = array.filter((item) => item !== todo);
    updateFilteredList(correctArray);
    updateList(correctArray);
    localStorage.setItem("ToDoList", JSON.stringify(todosStore));
    return "";
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <section
        className="w-full min-h-12 border-b border-gray-300 dark:border-gray-700 relative flex items-center cursor-grab"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <section className="w-fit h-fit absolute left-3">
          <CheckboxComponent
            isCheckBoxPressed={isCheckBoxPressed}
            setIsCheckBoxPressed={setIsCheckBoxPressed}
            task_id={id}
          />
        </section>
        <section className="w-[85%] h-full flex items-center relative">
          <TaskValueBlock isCheckBoxPressed={isCheckBoxPressed} task={task} />
        </section>
        <section className="w-[15%] h-full flex justify-center items-center z-30 bg-transparent">
          <button
            className="w-fit h-fit p-2.5 bg-transparent border-0"
            onClick={() => deleteTodo(todosStore, task)}
          >
            <CrossImage className="cursor-pointer" />
          </button>
        </section>
      </section>
    </>
  );
}

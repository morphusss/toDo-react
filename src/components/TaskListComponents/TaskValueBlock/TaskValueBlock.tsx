import { useState, type ChangeEvent } from "react";
import { EditValueBlock } from "@components/TaskListComponents/EditValueBlock";
import {
  useTodoActions,
  useTodos,
  type TaskState,
} from "@src/store/taskListStore";

type Props = {
  isCheckBoxPressed: boolean;
  task: TaskState;
};

export function TaskValueBlock(props: Props) {
  const todosStore = useTodos();
  const { updateList, updateFilteredList } = useTodoActions();
  const [isEditAppeared, setIsEditAppeared] = useState(false);
  const [isEditPressed, setIsEditPressed] = useState(false);
  const [localTaskValue, setLocalTaskValue] = useState(
    props.task.taskValue || ""
  );

  function deleteTodo(array: TaskState[], todo: TaskState) {
    const correctArray = array.filter((item) => item !== todo);
    updateFilteredList(correctArray);
    updateList(correctArray);
    return "";
  }

  function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setLocalTaskValue(newValue);
  }

  return (
    <>
      {!isEditPressed ? (
        <section
          className={`${
            props.isCheckBoxPressed
              ? "line-through text-gray-300"
              : "visible text-gray-600"
          } w-full h-full flex items-center pl-12 pb-1.5 pt-1.5 cursor-pointer `}
          onClick={() => {
            // setIsEditPressed((prev) => !prev);
            setIsEditAppeared((prev) => !prev);
          }}
        >
          {props.task.taskValue.length === 0
            ? deleteTodo(todosStore, props.task)
            : props.task.taskValue}
          <EditValueBlock
            task_id={props.task.id}
            isEditAppeared={isEditAppeared}
            isEditPressed={isEditPressed}
            setIsEditPressed={setIsEditPressed}
            localTaskValue={localTaskValue}
          />
        </section>
      ) : (
        <>
          <input
            className="w-full h-full pl-12 flex items-center pb-1.5 pt-1.5"
            type="text"
            placeholder="Rewrite todo or keep blank"
            onChange={handleValueChange}
            value={localTaskValue}
          />
          <EditValueBlock
            task_id={props.task.id}
            isEditAppeared={isEditAppeared}
            isEditPressed={isEditPressed}
            setIsEditPressed={setIsEditPressed}
            localTaskValue={localTaskValue}
          />
        </>
      )}
    </>
  );
}

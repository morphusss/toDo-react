import useScreeSize from "@src/hooks/useScreenSize/useScreenSize";
import {
  useTodoActions,
  useTodoStore,
  type TaskState,
} from "@store/taskListStore";
import { TaskTableSwitcher } from "@components/TaskListComponents/TaskTableSwitcher";

export function TableOperatorBlock() {
  const todosStore = useTodoStore((state) => state.tasks);
  const displaySize = useScreeSize();
  const { updateList, updateFilteredList } = useTodoActions();

  function deleteAllCompleted(list: TaskState[]) {
    let clearedArray: TaskState[] = [];
    for (let i = 0; i < list.length; i++) {
      if (!list[i].isComplete) clearedArray.push(list[i]);
    }
    updateList(clearedArray);
    updateFilteredList(clearedArray);
  }

  function counter(list: TaskState[]) {
    let counter: number = 0;
    for (let i = 0; i < list.length; i++) {
      if (!list[i].isComplete) counter++;
    }
    return counter;
  }

  return (
    <>
      <section className="w-full h-full text-gray-400 dark:text-gray-600 flex justify-between">
        <section
          className={`${
            displaySize.width > 768 ? "w-1/4" : "w-2/4"
          } flex items-center justify-baseline pl-2.5 text-[13px] hover:text-gray-600 dark:hover:text-gray-300`}
        >
          {`${counter(todosStore)} items left`}
        </section>
        <section
          className={`${displaySize.width > 768 ? "w-2/4 h-full" : "hidden"}`}
        >
          <TaskTableSwitcher />
        </section>
        <section
          className={`${
            displaySize.width > 768 ? "w-1/4" : "w-2/4"
          } flex items-center justify-end pr-1.5`}
        >
          <button
            className="w-fit h-fit text-[13px] p-1.5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => deleteAllCompleted(todosStore)}
          >
            {"Clear Completed"}
          </button>
        </section>
      </section>
    </>
  );
}

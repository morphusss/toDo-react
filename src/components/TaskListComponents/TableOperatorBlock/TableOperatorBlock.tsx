import useScreeSize from "@src/hooks/useScreenSize/useScreenSize";
import {
  useTodoActions,
  useTodoStore,
  type TaskState,
} from "@src/store/taskListStore";
import { TaskTableSwitcher } from "../TaskTableSwitcher";

export function TableOperatorBlock() {
  const todosStore = useTodoStore((state) => state.tasks);
  const displaySize = useScreeSize();
  const { updateList } = useTodoActions();

  function deleteAllCompleted(list: TaskState[]) {
    let clearedArray: TaskState[] = [];
    for (let i = 0; i < list.length; i++) {
      if (!list[i].isComplete) clearedArray.push(list[i]);
    }
    updateList(clearedArray);
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
      <section className="w-full h-full text-gray-400 flex justify-between">
        <section
          className={`${
            displaySize.width > 768 ? "w-1/4" : "w-2/4"
          } flex items-center justify-baseline pl-2.5 text-[13px]`}
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
            className="w-fit h-fit text-[13px] p-1.5"
            onClick={() => deleteAllCompleted(todosStore)}
          >
            {"Clear Completed"}
          </button>
        </section>
      </section>
    </>
  );
}

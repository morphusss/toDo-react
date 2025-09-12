import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { TaskState } from "@store/taskListStore";
import { IndividualTaskBlock } from "@components/TaskListComponents/IndividualTaskBlock";
import { EmptyHandler } from "@components/EmptyHandler";

type Props = {
  todoList: TaskState[];
};

export function TaskCompletedTable({ todoList }: Props) {
  let filteredList: TaskState[] = [];
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].isComplete) filteredList.push(todoList[i]);
  }

  return (
    <>
      {filteredList.length !== 0 ? (
        <section className="w-full h-full overflow-y-auto overflow-x-hidden">
          <SortableContext
            items={todoList}
            strategy={verticalListSortingStrategy}
          >
            {filteredList.map((task) => (
              <IndividualTaskBlock task={task} key={task.id} />
            ))}
          </SortableContext>
        </section>
      ) : (
        <EmptyHandler />
      )}
    </>
  );
}

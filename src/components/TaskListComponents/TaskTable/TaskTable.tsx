import { type TaskState } from "@src/store/taskListStore";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IndividualTaskBlock } from "../IndividualTaskBlock";
import { EmptyHandler } from "@components/EmptyHandler";

type Props = {
  todoList: TaskState[];
};

export function TaskTable({ todoList }: Props) {
  return (
    <>
      {todoList.length !== 0 ? (
        <section className="w-full h-full overflow-y-auto overflow-x-hidden">
          <SortableContext
            items={todoList}
            strategy={verticalListSortingStrategy}
          >
            {todoList.map((task) => (
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

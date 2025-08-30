import { type TaskState } from "@src/store/taskListStore";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IndividualTaskBlock } from "../IndividualTaskBlock";

type Props = {
  todoList: TaskState[];
};

export function TaskTable({ todoList }: Props) {
  return (
    <>
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
    </>
  );
}

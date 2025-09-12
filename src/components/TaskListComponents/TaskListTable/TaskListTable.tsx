import {
  useTodoActions,
  useTodoStore,
  type TaskState,
} from "@src/store/taskListStore";
import { TaskTable } from "../TaskTable";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TableOperatorBlock } from "../TableOperatorBlock";
import { TaskActiveTable } from "../TaskActiveTable";
import { TaskCompletedTable } from "../TaskCompletedTable";

export function TaskListTable() {
  const filteredTodoStore = useTodoStore((state) => state.filteredTasks);
  const tableType = useTodoStore((state) => state.tableType);
  const { updateList, updateFilteredList } = useTodoActions();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPosition = (id: number) =>
    filteredTodoStore.findIndex((task) => task.id === id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id === over?.id) return;

    function updateTodosPosition(todos: TaskState[]) {
      const originalPosition = getTaskPosition(+active.id);
      const newPosition = getTaskPosition(+over!.id || 0);

      return arrayMove(todos, originalPosition, newPosition);
    }

    updateList(updateTodosPosition(filteredTodoStore));
    updateFilteredList(updateTodosPosition(filteredTodoStore));
  }

  function renderCorrectTable(
    type: "All" | "Active" | "Completed",
    list: TaskState[]
  ) {
    switch (type) {
      case "All":
        return (
          <>
            <TaskTable todoList={list} />
          </>
        );
      case "Active":
        return (
          <>
            <TaskActiveTable todoList={list} />
          </>
        );
      case "Completed":
        return (
          <>
            <TaskCompletedTable todoList={list} />
          </>
        );
    }
  }

  return (
    <>
      <section className="w-full h-85 md:h-100 bg-white dark:bg-[#25273c] rounded-[5px] shadow-md flex flex-col ">
        <section className="w-full h-72 md:h-87">
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            {renderCorrectTable(tableType, filteredTodoStore)}
          </DndContext>
        </section>
        <section className="w-full h-13">
          <TableOperatorBlock />
        </section>
      </section>
    </>
  );
}

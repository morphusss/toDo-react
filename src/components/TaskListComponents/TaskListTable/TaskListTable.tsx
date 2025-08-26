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
import "./TaskListTable.css";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { EmptyHandler } from "@components/EmptyHandler";
import { TableOperatorBlock } from "../TableOperatorBlock";

export function TaskListTable() {
  const todoStore = useTodoStore((state) => state.tasks);
  const filteredTodoStore = useTodoStore((state) => state.filteredTasks);
  const { updateList } = useTodoActions();


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
    (filteredTodoStore.length === 0 ? todoStore : filteredTodoStore).findIndex((task) => task.id === id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id === over?.id) return;

    function updateTodosPosition(todos: TaskState[]) {
      const originalPosition = getTaskPosition(+active.id);
      const newPosition = getTaskPosition(+over?.id!);

      return arrayMove(todos, originalPosition, newPosition);
    }

    updateList(updateTodosPosition(filteredTodoStore.length === 0 ? todoStore : filteredTodoStore));
  }

  return (
    <>
      <section className="w-full h-85 md:h-100 bg-white rounded-[5px] shadow-md flex flex-col">
        <section className="w-full h-72 md:h-87">
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            {(filteredTodoStore.length === 0 ? todoStore : filteredTodoStore).length !== 0 ? (
              <TaskTable todoList={(filteredTodoStore.length === 0 ? todoStore : filteredTodoStore)} />
            ) : (
              <EmptyHandler />
            )}
          </DndContext>
        </section>
        <section className="w-full h-13">
          <TableOperatorBlock/>
        </section>
      </section>
    </>
  );
}

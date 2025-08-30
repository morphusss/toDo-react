import { create } from "zustand";

export interface TaskState {
  id: number;
  isComplete: boolean;
  taskValue: string;
}

interface TodoActions {
  addFilterTodo: (task: TaskState) => void;
  addTodo: (by: TaskState) => void;
  updateValue: (task_id: number, newValue: string) => void;
  updateStatus: (task_id: number, newValue: boolean) => void;
  updateList: (list: TaskState[]) => void;
  updateFilteredList: (list: TaskState[]) => void;
}

export interface TaskListState {
  tasks: TaskState[];
  filteredTasks: TaskState[];
  actions: TodoActions;
}

export const useTodoStore = create<TaskListState>()((set) => ({
  tasks: [],
  filteredTasks: [],
  actions: {
    addFilterTodo: (task) =>
      set((state) => ({
        filteredTasks: [...state.filteredTasks, task],
      })),
    addTodo: (by) =>
      set((state) => ({
        tasks: [...state.tasks, by],
      })),
    updateValue: (task_id, newValue) =>
      set((old) => ({
        tasks: old.tasks.map((todo) =>
          todo.id === task_id ? { ...todo, taskValue: newValue } : todo
        ),
        filteredTasks: old.tasks.map((todo) =>
          todo.id === task_id ? { ...todo, taskValue: newValue } : todo
        ),
      })),
    updateStatus: (task_id, newValue) =>
      set((old) => ({
        tasks: old.tasks.map((task) =>
          task.id === task_id ? { ...task, isComplete: newValue } : task
        ),
      })),
    updateList: (list) =>
      set(() => ({
        tasks: list,
      })),
    updateFilteredList: (list) =>
      set(() => ({
        filteredTasks: list,
      })),
  },
}));

export const useTodos = () => useTodoStore((state) => state.tasks);

export const useTodoActions = () => useTodoStore((state) => state.actions);

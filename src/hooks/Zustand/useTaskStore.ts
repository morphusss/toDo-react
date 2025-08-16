import { create } from "zustand";

export interface TaskState {
  id: number;
  isComplete: boolean;
  taskValue: string;
}

export interface TaskListState {
  tasks: TaskState[];
  addTasksToList: (by: TaskState) => void;
}

export const useTaskStore = create<TaskListState>()((set) => ({
  tasks: [],
  addTasksToList: (by) => set((state) => ({ 
    tasks: [...state.tasks, by]
    })),
}));


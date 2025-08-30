import { useState } from "react";
import {
  useTodoActions,
  useTodos,
  useTodoStore,
  type TaskState,
} from "@src/store/taskListStore";
import useScreeSize from "@src/hooks/useScreenSize/useScreenSize";

type ActionsListType = {
  showAllTodos: () => void;
  filterActiveTodos: () => void;
  filterCompletedTodos: () => void;
};

type StatesListType = {
  isAllPressed: boolean;
  isActivePressed: boolean;
  isCompletedPressed: boolean;
};

function initButtonList(
  actionsList: ActionsListType,
  statesList: StatesListType
) {
  const buttonList = [
    {
      name: "All",
      action: actionsList.showAllTodos,
      isPressed: statesList.isAllPressed,
    },
    {
      name: "Active",
      action: actionsList.filterActiveTodos,
      isPressed: statesList.isActivePressed,
    },
    {
      name: "Completed",
      action: actionsList.filterCompletedTodos,
      isPressed: statesList.isCompletedPressed,
    },
  ];

  return buttonList;
}

export function TaskTableSwitcher() {
  const displaySize = useScreeSize();
  //Call zustand todo list store
  const todosStore = useTodoStore((state) => state.tasks);
  const { updateFilteredList } = useTodoActions();
  const [isAllPressed, setIsAllPressed] = useState(true);
  const [isActivePressed, setIsActivePressed] = useState(false);
  const [isCompletedPressed, setIsCompletedPressed] = useState(false);

  const actionsList: ActionsListType = {
    showAllTodos: () => {
      if (!isAllPressed) {
        setIsAllPressed((prev) => {
          setIsActivePressed(false);
          setIsCompletedPressed(false);
          return !prev;
        });
      }
      updateFilteredList(todosStore);
    },
    filterActiveTodos: () => {
      let filteredList: TaskState[] = [];
      for (let i = 0; i < todosStore.length; i++) {
        if (!todosStore[i].isComplete) filteredList.push(todosStore[i]);
      }
      if (!isActivePressed) {
        setIsActivePressed((prev) => {
          setIsAllPressed(false);
          setIsCompletedPressed(false);
          return !prev;
        });
      }
      updateFilteredList(filteredList);
    },
    filterCompletedTodos: () => {
      let filteredList: TaskState[] = [];
      for (let i = 0; i < todosStore.length; i++) {
        if (todosStore[i].isComplete) filteredList.push(todosStore[i]);
      }
      if (!isCompletedPressed) {
        setIsCompletedPressed((prev) => {
          setIsAllPressed(false);
          setIsActivePressed(false);
          return !prev;
        });
      }
      updateFilteredList(filteredList);
    },
  };

  const statesList: StatesListType = {
    isAllPressed,
    isActivePressed,
    isCompletedPressed,
  };

  function renderFontColor(isPressed: boolean) {
    if (isPressed) {
      return {
        color: "hsl(220, 98%, 61%)",
      };
    } else {
      return {
        color: "hsl(233, 11%, 84%)",
      };
    }
  }

  return (
    <>
      <section
        className={`${
          displaySize.width < 768
            ? "rounded-[5px] shadow-md"
            : " rounded-[0px] shadow-none"
        } w-full h-full bg-white flex justify-center items-center gap-2 md:gap-1.5`}
      >
        {initButtonList(actionsList, statesList).map((item) => (
          <section className="w-fit h-fit">
            <button
              className="w-fit h-fit p-1 text-[16px] font-bold"
              style={renderFontColor(item.isPressed)}
              onClick={item.action}
            >
              {item.name}
            </button>
          </section>
        ))}
      </section>
    </>
  );
}

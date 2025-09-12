import { useState } from "react";
import { useTodoActions } from "@store/taskListStore";
import useScreeSize from "@src/hooks/useScreenSize/useScreenSize";
import verifyTheme from "@utils/themeVerification";

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
  const { updateTableType } = useTodoActions();
  const [isAllPressed, setIsAllPressed] = useState(true);
  const [isActivePressed, setIsActivePressed] = useState(false);
  const [isCompletedPressed, setIsCompletedPressed] = useState(false);
  const theme = verifyTheme();

  const actionsList: ActionsListType = {
    showAllTodos: () => {
      if (!isAllPressed) {
        setIsAllPressed((prev) => {
          setIsActivePressed(false);
          setIsCompletedPressed(false);
          return !prev;
        });
        updateTableType("All");
      }
    },
    filterActiveTodos: () => {
      if (!isActivePressed) {
        setIsActivePressed((prev) => {
          setIsAllPressed(false);
          setIsCompletedPressed(false);
          return !prev;
        });
        updateTableType("Active");
      }
    },
    filterCompletedTodos: () => {
      if (!isCompletedPressed) {
        setIsCompletedPressed((prev) => {
          setIsAllPressed(false);
          setIsActivePressed(false);
          return !prev;
        });
        updateTableType("Completed");
      }
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
        color: `${theme ? "hsl(233, 14%, 35%)" : "hsl(233, 11%, 84%)"}`,
      };
    }
  }

  return (
    <>
      <section
        className={`${
          displaySize.width < 768
            ? "rounded-[5px] shadow-md"
            : "rounded-[0px] shadow-none"
        } w-full h-full bg-white dark:bg-[#25273c] flex justify-center items-center gap-2 md:gap-1.5`}
      >
        {initButtonList(actionsList, statesList).map((item) => (
          <section className="w-fit h-fit" key={item.name}>
            <button
              style={renderFontColor(item.isPressed)}
              className="w-fit h-fit p-1 text-[16px] font-bold hover:text-gray-600 cursor-pointer"
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
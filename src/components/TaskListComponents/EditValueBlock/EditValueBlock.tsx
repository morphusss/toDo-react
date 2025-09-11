import EditImage from "@svg/icon-edit.svg?react";
import EditImage_white from "@svg/icon-edit-white.svg?react";
import BinImage from "@svg/icon-delete-bin.svg?react";
import CheckMarkImage from "@svg/icon-check-mark.svg?react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTodoActions } from "@src/store/taskListStore";
import verifyTheme from "@src/utils/themeVerification";

type Props = {
  task_id: number;
  localTaskValue: string;
  isEditAppeared: boolean;
  isEditPressed: boolean;
  setIsEditPressed: Dispatch<SetStateAction<boolean>>;
};

export function EditValueBlock(props: Props) {
  const { updateValue } = useTodoActions();
  const [isAdditionalButtonsPressed, setIsAdditionalButtonsPressed] =
    useState(true);
  const theme = verifyTheme();

  function saveButtonHandler() {
    props.setIsEditPressed((prev) => !prev);
    updateValue(props.task_id, props.localTaskValue);
    setIsAdditionalButtonsPressed(false);
  }

  function discardButtonHandler() {
    props.setIsEditPressed((prev) => !prev);
    setIsAdditionalButtonsPressed(false);
  }

  function animationHandler(isPressed: boolean) {
    if (isPressed) {
      return "motion-preset-focus motion-duration-1000";
    } else {
      return "motion-opacity-out-0 motion-blur-out-md motion-duration-1500";
    }
  }

  return (
    <>
      <section
        className={`${props.isEditPressed ? "justify-between" : "justify-end"}
          absolute flex w-20 h-9 right-0.5 `}
      >
        {props.isEditPressed ? (
          <>
            <button
              className={`${animationHandler(
                isAdditionalButtonsPressed
              )} w-9 h-full flex justify-center items-center cursor-pointer rounded-[5px] shadow-md bg-gray-50 dark:bg-[#2a2c42]`}
              onClick={() => saveButtonHandler()}
            >
              <CheckMarkImage />
            </button>
            <button
              className={`${animationHandler(
                isAdditionalButtonsPressed
              )} w-9 h-full flex justify-center items-center cursor-pointer rounded-[5px] shadow-md bg-gray-50 dark:bg-[#2a2c42]`}
              onClick={() => discardButtonHandler()}
            >
              <BinImage />
            </button>
          </>
        ) : (
          <button
            className={` ${animationHandler(props.isEditAppeared)} ${
              props.isEditAppeared ? "visible" : "hidden"
            } w-9 h-full flex justify-center items-center cursor-pointer rounded-[5px] shadow-md bg-gray-50 dark:bg-[#2a2c42]`}
            onClick={() => props.setIsEditPressed((prev) => !prev)}
          >
            {theme ? <EditImage_white /> : <EditImage />}
          </button>
        )}
      </section>
    </>
  );
}

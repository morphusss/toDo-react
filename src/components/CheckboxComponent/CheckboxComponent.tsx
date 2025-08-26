import { type Dispatch, type SetStateAction } from "react";
import CheckImage from "@svg/icon-check.svg";
import "./CheckboxComponent.css";
import { useTodoActions } from "@src/store/taskListStore";

type Props = {
  isCheckBoxPressed: boolean;
  setIsCheckBoxPressed: Dispatch<SetStateAction<boolean>>;
  task_id: number;
};

export function CheckboxComponent(props: Props) {
  const isPressed = props.isCheckBoxPressed;
  const setIsPressed = props.setIsCheckBoxPressed;
  const { updateStatus } = useTodoActions();
  // const [isComplete, setIsComplete] = useState(isPressed || false);

  function setBackgroundForPressedCheckbox() {
    if (isPressed) {
      return {
        background:
          "linear-gradient(to top left,hsl(280, 87%, 65%), hsl(192, 100%, 67%))",
        border: 0,
      };
    } else {
      return {
        background: "transparent",
        border: "2px solid #d1d5dc",
      };
    }
  }

  return (
    <>
      <input
        type="checkbox"
        id={`checkbox-id-${props.task_id}`}
        className="hidden"
      />
      <label
        htmlFor={`checkbox-id-${props.task_id}`}
        className="w-5 h-5 flex items-center justify-center"
      >
        <span
          className="checkbox-inner w-full h-full flex justify-center items-center text-transparent rounded-full cursor-pointer z-20"
          style={setBackgroundForPressedCheckbox()}
          onClick={() => {
            setIsPressed((prev) => {
              updateStatus(props.task_id, !prev);
              return !prev;
            });
          }}
        >
          {isPressed ? <img src={CheckImage} className="visible" /> : ""}
        </span>
      </label>
    </>
  );
}

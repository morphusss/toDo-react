import { TaskListTable } from "@components/TaskListComponents/TaskListTable";
import { TaskTableSwitcher } from "@components/TaskListComponents/TaskTableSwitcher";
import useScreeSize from "@src/hooks/useScreenSize/useScreenSize";

export function MainPageBody() {
  function showAdditionalText() {
    const screenSize = useScreeSize();
    if (screenSize.width > 768) {
      return "Press Enter to Create a Todo";
    }
  }

  return (
    <>
      <section className="w-full h-full flex flex-col justify-between">
        <section className="w-full h-fit flex flex-col justify-between gap-3">
          <section className="w-full h-fit">
            <TaskListTable />
          </section>
          <section className="w-full h-10 md:hidden">
            <TaskTableSwitcher />
          </section>
        </section>
        <section className="w-full h-12 flex flex-col justify-center items-center text-gray-400 text-xs font-bold">
          <section className="w-fill h-fill">
            Drag and drop to reorder list
          </section>
          <section className="w-fill h-fill">{showAdditionalText()}</section>
        </section>
      </section>
    </>
  );
}

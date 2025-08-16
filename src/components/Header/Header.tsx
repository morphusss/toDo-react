import { InputTaskBar } from "@components/InputTaskBar/InputTaskBar";
import { ThemeSwitcher } from "@components/ThemeSwitcher";

export function Header() {
  return (
    <>
      <section className="w-full h-fit flex flex-col gap-7">
        <section className="w-full h-fit flex justify-between">
          <section className="w-fit h-fit">
            <h1 className="font-bold text-white text-2xl">T O D O</h1>
          </section>
          <section className="w-fit h-fit">
            <ThemeSwitcher />
          </section>
        </section>
        <section className="w-full h-fit">
          <InputTaskBar />
        </section>
      </section>
    </>
  );
}

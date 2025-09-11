import { useThemeStore } from "@src/store/themeStore";
import MoonImg from "@svg/icon-moon.svg?react";
import SunImg from "@svg/icon-sun.svg?react";
import { useState } from "react";

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("ToDoIsDark")!) || false);
  const updateTheme = useThemeStore((state) => state.updateTheme);

  return (
    <>
      <button
        className="w-fit h-fit cursor-pointer select-none"
        onClick={() => setIsDark((prev: boolean) => {
          localStorage.setItem("ToDoIsDark", String(!prev));  
          updateTheme(!prev);
          return !prev;
        })}
      >
        {isDark ? <SunImg /> : <MoonImg />}
      </button>
    </>
  );
}

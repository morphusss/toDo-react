import MoonImg from "@svg/icon-moon.svg?react";
import SunImg from "@svg/icon-sun.svg?react";
import { useState } from "react";

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <button
        className="w-fit h-fit cursor-pointer"
        onClick={() => setIsDark((prev) => !prev)}
      >
        {isDark ? <MoonImg /> : <SunImg />}
      </button>
    </>
  );
}

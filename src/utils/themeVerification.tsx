import { useThemeStore } from "@src/store/themeStore";

export default function verifyTheme(): boolean {
  const themeStore = useThemeStore((state) => state.isDarkTheme);
  const themeLocalStorage = JSON.parse(localStorage.getItem("ToDoIsDark")!);

  if (themeLocalStorage) {
    return true;
  } else if (!themeLocalStorage) {
    return false;
  } else if (themeStore) {return themeStore}
  else return false;
}

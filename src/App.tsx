import { HashRouter as Router, Route, Routes } from "react-router";
import { MainPage } from "@Pages/MainPage";
import { NotFoundPage } from "@Pages/NotFoundPage";
import { useEffect } from "react";
import { useTodoActions, useTodos } from "@store/taskListStore";

function App() {
  const themeStorage = localStorage.getItem("ToDoIsDark");
  const todoListLocalStorage = JSON.parse(localStorage.getItem("ToDoList")!);
  const todoStore = useTodos();
  const { updateList, updateFilteredList } = useTodoActions();

  useEffect(() => {
    if (!themeStorage) localStorage.setItem("ToDoIsDark", "false");
    if (todoListLocalStorage !== null) {
      if (todoStore.length === 0) {
        updateList(todoListLocalStorage);
        updateFilteredList(todoListLocalStorage);
      }
    } 
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

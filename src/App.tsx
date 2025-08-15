import { HashRouter as Router, Route, Routes } from "react-router";
import { MainPage } from "@Pages/MainPage";
import { NotFoundPage } from "@Pages/NotFoundPage";
import "./App.css";

function App() {
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

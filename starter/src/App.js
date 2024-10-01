import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page";
import SearchPage from "./components/search-page";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;

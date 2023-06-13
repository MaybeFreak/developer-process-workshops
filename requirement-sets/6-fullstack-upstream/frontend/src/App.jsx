import { Route, Routes } from "react-router-dom";
import "./App.css";
import PlacePage from "./PlacePage";
import HomePage from "./HomePage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={"/places/:id"} element={<PlacePage />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import CollegeDetail from "./pages/CollegeDetail";
import Saved from "./pages/Saved";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/college/:id" element={<CollegeDetail />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  );
}

export default App;
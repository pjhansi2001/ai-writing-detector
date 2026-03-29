import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Patterns from "./pages/Patterns";
import About from "./pages/About";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

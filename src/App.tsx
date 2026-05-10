import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import ReviewPage from "./pages/ReviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

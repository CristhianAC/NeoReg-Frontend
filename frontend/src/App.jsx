import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chatbot from "./pages/Chatbot";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WorkerFormPage from "./pages/WorkerFormPage";
import PanelPersona from "./pages/PanelPersona";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/home" element={<Home />} />
        <Route path="/worker/" element={<WorkerFormPage />} />
        <Route path="/worker/:id" element={<WorkerFormPage />} />
        <Route path="/panel" element={<PanelPersona />} />
        <Route path="/panel/:id" element={<PanelPersona />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

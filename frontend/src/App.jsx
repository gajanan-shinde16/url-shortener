import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </Router>
  );
}
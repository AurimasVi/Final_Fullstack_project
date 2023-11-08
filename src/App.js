import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

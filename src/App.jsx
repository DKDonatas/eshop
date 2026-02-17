import "./App.css";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import SignUpForm from "./components/SignUpForm";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to="/"> Home</Link>
        <Link to="/about"> About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<h1> 404 not found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;

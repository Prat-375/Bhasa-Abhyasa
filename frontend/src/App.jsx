import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ModePage from "./pages/ModePage";
import LearnPage from "./pages/LearnPage";
import PracticePage from "./pages/PracticePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mode/:level" element={<ModePage />} />
          <Route path="/learn/:level" element={<LearnPage />} />
          <Route path="/practice/:level" element={<PracticePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Pokemon from "./routes/Pokemon";

function App() {
  return (
    <div className="min-h-full p-6 bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          {/* dynamic route */}
          <Route path="pokemon/:id" element={<Pokemon />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

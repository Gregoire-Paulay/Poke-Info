import "./App.css";
import { useThemeContext } from "./context/theme-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Theme from "./components/Theme";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./page/Home";
import PokemonList from "./page/PokemonList";
import Pokemon from "./page/Pokemon";
import Abilities from "./page/Abilities";
import Ability from "./page/Ability";
import Types from "./page/Types";
import TypeDetails from "./page/TypeDetails";
import MovesList from "./page/MovesList";
import MoveDetails from "./page/MoveDetails";

function App(): JSX.Element {
  const { theme } = useThemeContext();

  return (
    <Router>
      <div className={theme}>
        <Header />
        <Theme />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PokemonList" element={<PokemonList />} />
          <Route path="/Pokemon/:name" element={<Pokemon />} />
          <Route path="/Abilities" element={<Abilities />} />
          <Route path="/Ability/:id" element={<Ability />} />
          <Route path="/PokeTypes" element={<Types />} />
          <Route path="/PokeType/:id" element={<TypeDetails />} />
          <Route path="/MovesList" element={<MovesList />} />
          <Route path="/MoveDetails/:id" element={<MoveDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

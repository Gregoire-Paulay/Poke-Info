import "./App.css";
import { useThemeContext } from "./context/theme-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Theme from "./components/Theme";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./page/Home";
import Pokemon from "./page/Pokemon";
import Abilities from "./page/Abilities";
import Ability from "./page/Ability";

function App(): JSX.Element {
  const { theme } = useThemeContext();

  return (
    <Router>
      <div className={theme}>
        <Header />
        <Theme />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pokemon/:name" element={<Pokemon />} />
          <Route path="/Abilities" element={<Abilities />} />
          <Route path="/Ability/:id" element={<Ability />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

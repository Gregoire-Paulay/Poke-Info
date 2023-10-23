import "./App.css";
import { useThemeContext } from "./context/theme-context";

// Components
import Theme from "./components/Theme";
import Header from "./components/Header";

function App(): JSX.Element {
  const { theme } = useThemeContext();

  return (
    <body className={theme}>
      <Header />
      <Theme />
    </body>
  );
}

export default App;

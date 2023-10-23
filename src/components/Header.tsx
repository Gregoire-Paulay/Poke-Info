import logo from "../assets/pokemon-logo.jpg";
import { useThemeContext } from "../context/theme-context";

const Header = (): JSX.Element => {
  const { theme } = useThemeContext();
  return (
    <header className={theme}>
      <div className="container">
        <img src={logo} alt="pokemon logo" />
        <div>
          <h1>Titre de mon site</h1>
          <div className="headerNav">
            <p>Page 1</p>
            <p>Page 2</p>
            <p>Page 3</p>
            <p>Page 4</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

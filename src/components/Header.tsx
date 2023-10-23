import logo from "../assets/pokemon-logo.jpg";
import { useThemeContext } from "../context/theme-context";
import { useNavigate } from "react-router-dom";

const Header = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  return (
    <header className={theme}>
      <div className="container">
        <img
          src={logo}
          alt="pokemon logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <div>
          <h1>Titre de mon site</h1>
          <div className="headerNav">
            <p>Types</p>
            <p>Move</p>
            <p>Page 3</p>
            <p>Page 4</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

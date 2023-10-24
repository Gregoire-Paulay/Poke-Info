import { useThemeContext } from "../context/theme-context";
import { useState } from "react";

const Theme = (): JSX.Element => {
  const { theme, setTheme } = useThemeContext();
  const [themeButton, setThemeButton] = useState<string>("sun");

  return (
    <div>
      <button
        className={themeButton}
        onClick={() => {
          if (theme === "night") {
            setTheme("light");
            setThemeButton("moon");
          } else {
            setTheme("night");
            setThemeButton("sun");
          }
        }}
      >
        Switch
      </button>
    </div>
  );
};

export default Theme;

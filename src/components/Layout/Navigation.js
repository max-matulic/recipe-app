import React, { useState } from "react";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const [buttonText, setButtonText] = useState("Logout");

  const changeTextHandler = (text) => {
    setButtonText(text);
  };
  return (
    <nav className={classes.nav}>
      {buttonText === "Logout" && (
        <ul>
          <li>Hello User123!</li>
          <li>
            <button onClick={() => changeTextHandler("Login")}>
              {buttonText}
            </button>
          </li>
        </ul>
      )}
      {buttonText === "Login" && (
        <ul>
          <li>
            <button onClick={() => changeTextHandler("Logout")}>
              {buttonText}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;

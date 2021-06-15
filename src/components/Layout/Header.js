import React from "react";
import mealsImage from "../assets/food.jpg";
import classes from "./Header.module.css";
import Navigation from "./Navigation";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h2 className={classes.name}>ReactRecipes</h2>
        <Navigation />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;

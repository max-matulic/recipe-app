import React from "react";

import classes from "./RecipeFilter.module.css";

const RecipeFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className={classes["recipe-filter"]}>
      <div className={classes["recipe-filter__control"]}>
        <label>Filter recipes</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value={false}>All</option>
          <option value={true}>Favourite</option>
        </select>
      </div>
    </div>
  );
};

export default RecipeFilter;

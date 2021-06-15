import React from "react";
import classes from "./Recipes.module.css";
import RecipeItem from "./RecipeItem";
import Card from "../UI/Card";
import RecipeFilter from "./RecipeFilter";

const Recipes = (props) => {
  const recipeMapping = props.items.map((recipe) => (
    <RecipeItem
      onEdit={props.onEdit}
      onDelete={props.onDelete}
      onAddFavourite={props.onAddFavourite}
      key={recipe.id}
      id={recipe.id}
      title={recipe.title}
      ingredients={recipe.ingredients}
      isFavourite={recipe.isFavourite}
    />
  ));

  return (
    <React.Fragment>
      <Card className={classes.recipes}>
        <RecipeFilter
          selected={props.filteredValue}
          onChangeFilter={(selectedValue) => props.onFilter(selectedValue)}
        />
        {recipeMapping.length === 0 && (
          <h2 className={classes.text}>No recipe found!</h2>
        )}
        {recipeMapping}
      </Card>
    </React.Fragment>
  );
};

export default Recipes;

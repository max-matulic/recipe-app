import React, { useState, useEffect } from "react";
import classes from "./RecipeForm.module.css";
import Plus from "../UI/Plus";
import Minus from "../UI/Minus";
import "../UI/Minus.css";
import "../UI/Plus.css";

const RecipeForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [addIngredients, setAddIngredients] = useState([{ ingredients: "" }]);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidIngredient, setIsValidIngredient] = useState(true);

  const titleChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValidTitle(true);
    }
    setEnteredTitle(event.target.value);
  };

  const ingredientsChangeHandler = (index, event) => {
    const ingredients = [...addIngredients];
    ingredients[index][event.target.name] = event.target.value;
    if (event.target.value.trim().length > 0) {
      setIsValidIngredient(true);
    }
    setAddIngredients(ingredients);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredTitle.trim().length === 0) {
      setIsValidTitle(false);
      return;
    }

    if (addIngredients.length === 1 && addIngredients[0].ingredients === "") {
      setIsValidIngredient(false);
      return;
    }

    props.onAddRecipe({
      title: enteredTitle,
      ingredients: addIngredients,
      id: props.isEditing ? props.recipe.id : Math.random().toString(),
      isFavourite: false,
    });
    setEnteredTitle("");
    setAddIngredients([{ ingredients: "" }]);
  };

  const handleAddFields = () => {
    setAddIngredients([...addIngredients, { ingredients: "" }]);
  };

  const handeRemoveFields = (index) => {
    const ingredients = [...addIngredients];
    ingredients.splice(index, 1);
    setAddIngredients(ingredients);
  };

  useEffect(() => {
    if (props.recipe !== null) {
      setEnteredTitle(props.recipe.title);
      setAddIngredients(props.recipe.ingredients);
    }
  }, [props.recipe]);

  return (
    <div className={classes.welcome}>
      <h2>Welcome back User123!</h2>
      <p>Are you ready to add new recipes?</p>
      <form onSubmit={submitHandler}>
        <div className={classes["new-recipe__controls"]}>
          <div
            className={`${classes["new-recipe__control"]} ${
              !isValidTitle && classes.invalid
            }`}
          >
            <label>Recipe Name</label>
            <input
              type="text"
              name="title"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          {addIngredients.map((addIngredient, index) => (
            <div
              className={`${classes["new-recipe__control"]} ${
                !isValidIngredient && classes.invalid
              }`}
              key={index}
            >
              <label>Ingredient</label>
              <input
                type="text"
                name="ingredients"
                value={addIngredient.ingredients}
                onChange={(event) => ingredientsChangeHandler(index, event)}
              />
              {index === 0 && (
                <Plus className="plus" onClick={handleAddFields} />
              )}
              {index > 0 && (
                <Minus
                  className="minus"
                  onClick={() => handeRemoveFields(index)}
                />
              )}
            </div>
          ))}
        </div>
        <div className={classes["new-recipe__control"]}>
          {props.isEditing === true ? (
            <button onClick={submitHandler} type="submit">
              Edit Recipe
            </button>
          ) : (
            <button onClick={submitHandler} type="submit">
              Add New Recipe
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;

import React, { useState, useEffect } from "react";
import Header from "./components/Layout/Header";
import Recipes from "./components/Recipes/Recipes";
import RecipeForm from "./components/NewRecipe/RecipeForm";

const DUMMY_RECIPES = [
  {
    id: "e1",
    title: "Chicken Soup",
    ingredients: [
      { ingredients: "150g chicken" },
      { ingredients: "250ml water" },
    ],
    isFavourite: false,
  },
  {
    id: "e2",
    title: "Gefilte paprika",
    ingredients: [
      { ingredients: "1kg paprika" },
      { ingredients: "70dg mixed meat" },
    ],
    isFavourite: false,
  },
];

function App(props) {
  const [filterValue, setFilterValue] = useState(0);
  const [recipes, setRecipes] = useState(DUMMY_RECIPES);
  const [shownRecipes, setShownRecipes] = useState(DUMMY_RECIPES);
  const [editRecipe, setEditRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addRecipeHandler = (recipe) => {
    setRecipes((prevRecipes) => {
      if (isEditing) {
        let newRecipes = [...prevRecipes];
        newRecipes = newRecipes.map((recipeItem) => {
          if (recipeItem.id !== recipe.id) {
            return recipeItem;
          }
          return recipe;
        });
        setIsEditing(false);
        setEditRecipe(null);
        return newRecipes;
      }
      return [recipe, ...prevRecipes];
    });
  };

  const favouriteRecipeHandler = (id) => {
    setRecipes((prevRecipes) => {
      let newRecipes = [...prevRecipes];
      newRecipes = newRecipes.map((recipe) => {
        if (recipe.id !== id) {
          return recipe;
        }
        return {
          ...recipe,
          isFavourite: !recipe.isFavourite,
        };
      });
      return newRecipes;
    });
  };

  const favouriteFilteredHandler = (filter) => {
    setFilterValue(filter);
  };

  const deleteRecipeHandler = (id) => {
    const deletedRecipe = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(deletedRecipe);
  };

  const editRecipeHandler = (id) => {
    let recipe = recipes.find((r) => r.id === id);
    setIsEditing(true);
    setEditRecipe(recipe);
  };

  useEffect(() => {
    if (filterValue === "true") {
      setShownRecipes(recipes.filter((r) => r.isFavourite === true));
    } else {
      setShownRecipes(recipes);
    }
  }, [recipes, filterValue]);

  return (
    <React.Fragment>
      <Header />
      <main>
        <RecipeForm
          onAddRecipe={addRecipeHandler}
          recipe={editRecipe}
          isEditing={isEditing}
        />
      </main>
      <Recipes
        items={shownRecipes}
        filterValue={filterValue}
        onAddFavourite={favouriteRecipeHandler}
        onDelete={deleteRecipeHandler}
        onEdit={editRecipeHandler}
        onFilter={favouriteFilteredHandler}
      />
    </React.Fragment>
  );
}

export default App;

import React, { useState, useRef } from "react";
import "./RecipeItem.css";
import Card from "../UI/Card";
import Chevron from "../UI/Chevron";
import Edit from "../UI/Edit";
import Trash from "../UI/Trash";
import Star from "../UI/Star";
import "../UI/Star.css";
import "../UI/Edit.css";
import "../UI/Trash.css";

const RecipeItem = (props) => {
  const [isActive, setIsActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [isRotated, setIsRotated] = useState("recipe-item__icon");
  const [isFavourite, setIsFavourite] = useState(
    props.isFavourite === true ? "active" : ""
  );

  const DUMMY = [];

  const content = useRef(null);

  const toggleRecipe = () => {
    setIsActive(isActive === "" ? "active" : "");
    setHeight(
      isActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setIsRotated(
      isActive === "active" ? "recipe-item__icon" : "recipe-item__icon rotate"
    );
  };

  const toggleFavourite = () => {
    setIsFavourite(isFavourite === "" ? "active" : "");
    props.onAddFavourite(props.id);
  };
  props.ingredients.forEach((element, i) => {
    DUMMY.push(<li key={i}>{element.ingredients}</li>);
  });

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const editHandler = () => {
    props.onEdit(props.id);
    toggleRecipe();
  };

  return (
    <Card className="recipe-item__section">
      <Star className={`star ${isFavourite}`} onClick={toggleFavourite} />
      <button className={`recipe-item ${isActive}`} onClick={toggleRecipe}>
        <p className="recipe-item__title">{props.title}</p>
        <Chevron className={`${isRotated}`} width={12} fill={"#fff"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="recipe-item__content"
      >
        <div className="recipe-item__text">
          <ul>{DUMMY}</ul>
          <br />
          <Edit className="edit" onClick={editHandler} />
          <Trash className="trash" onClick={() => deleteHandler(props.id)} />
        </div>
      </div>
    </Card>
  );
};

export default RecipeItem;

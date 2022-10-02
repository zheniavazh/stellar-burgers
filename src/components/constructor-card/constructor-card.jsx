import React from "react";
import styles from "./constructor-card.module.css";
import PropTypes from "prop-types";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";

const ConstructorCard = ({ type, isLocked, ingredient }) => {
    let text = ingredient.name
    if (type === "top") {
        text = `${ingredient.name} (верх)`
    } else if (type === "bottom") {
        text = `${ingredient.name} (низ)`
    }

    return (
        <div className={`${styles.constructorCard} ${type === undefined ? "mr-2" : "mr-8"}`}>
            {type === undefined && <DragIcon />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={ingredient.price}
                thumbnail={ingredient.image}
            />
        </div>
    )
}

ConstructorCard.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    ingredient: ingredientType
};

export default ConstructorCard;

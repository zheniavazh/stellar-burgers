import React from "react";
import styles from "./constructor-card.module.css";
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorCard = ({ type, isLocked, name, price, image }) => {
    if (type === "top") {
        name = `${name} (верх)`
    } else if (type === "bottom") {
        name = `${name} (низ)`
    }

    return (
        <div className={`${styles.constructorCard} ${type === undefined ? "mr-2" : "mr-8"}`}>
            <DragIcon />
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>
    )
}

ConstructorCard.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}

export default ConstructorCard;

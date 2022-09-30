import React from "react";
import styles from "./ingredient-card.module.css";
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({ image, price, name, count }) => {
    return (
        <div className={`${styles.card} mb-8`}>
            <img src={image} alt="" />
            <div className={styles.cardPrice}>
                <p className="text text_type_digits-default mt-2 mb-2 mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{name}</p>
            <Counter count={count} size="default" />
        </div>
    )
}

IngredientCard.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number
}

export default IngredientCard;

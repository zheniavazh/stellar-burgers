import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { burgerIngredients, burgerConstructor } from "../../utils/data"

const App = () => {

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients data={burgerIngredients}/>
                <BurgerConstructor data={burgerConstructor} />
            </main>
        </div>
    );
};

export default App;

import { useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import { useDispatch, useSelector } from 'react-redux';
import { BUN, SAUCE, MAIN } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHOW_INGREDIENT_MODAL } from '../../services/actions/modal';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { ingredients } = useSelector((state) => state.ingredients);

  const [currentTab, setCurrentTab] = useState('Булки');
  const buns = ingredients.filter((el) => el.type === BUN);
  const sauces = ingredients.filter((el) => el.type === SAUCE);
  const mains = ingredients.filter((el) => el.type === MAIN);

  useEffect(() => {
    const container = document.querySelector('.container');
    const element = document.getElementById(currentTab);
    container.scrollTo({
      top: element.offsetTop - container.offsetTop,
      behavior: 'smooth',
    });
  }, [currentTab]);

  const handlerOpenModal = (ingredientId) => {
    dispatch({ type: SHOW_INGREDIENT_MODAL });
    navigate(`/ingredients/${ingredientId}`, {
      state: { background: pathname },
    });
  };

  return (
    <section className={`${styles.section}  ml-5 mr-5`}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={styles.tabWrap}>
        <Tab
          value="Булки"
          active={currentTab === 'Булки'}
          onClick={setCurrentTab}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={currentTab === 'Соусы'}
          onClick={setCurrentTab}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={currentTab === 'Начинки'}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={` ${styles.container} container mt-10 mb-10 custom-scroll`}
      >
        <div className="mb-2" id="Булки">
          <p className="text text_type_main-medium mb-6">Булки</p>
          <div className={`${styles.list} ml-4 mr-1`}>
            {buns.map((item) => (
              <IngredientCard
                key={item._id}
                ingredient={item}
                count={item.count}
                onModalOpen={handlerOpenModal}
              />
            ))}
          </div>
        </div>
        <div className="mb-2" id="Соусы">
          <p className="text text_type_main-medium mb-6">Соусы</p>
          <div className={`${styles.list} ml-4 mr-1`}>
            {sauces.map((item) => (
              <IngredientCard
                key={item._id}
                ingredient={item}
                count={item.count}
                onModalOpen={handlerOpenModal}
              />
            ))}
          </div>
        </div>
        <div className="mb-2" id="Начинки">
          <p className="text text_type_main-medium mb-6">Начинки</p>
          <div className={`${styles.list} ml-4 mr-1`}>
            {mains.map((item) => (
              <IngredientCard
                key={item._id}
                ingredient={item}
                count={item.count}
                onModalOpen={handlerOpenModal}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;

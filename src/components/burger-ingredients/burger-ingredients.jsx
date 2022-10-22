import { useEffect, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CURRENT_INGREDIENT } from '../../services/actions/ingredients';

const modalTitle = 'Детали ингредиента';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { ingredients, currentIngredient } = useSelector(
    (state) => state.ingredients
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState('Булки');
  const buns = ingredients.filter((el) => el.type === 'bun');
  const sauces = ingredients.filter((el) => el.type === 'sauce');
  const mains = ingredients.filter((el) => el.type === 'main');

  useEffect(() => {
    const container = document.querySelector('.container');
    const element = document.getElementById(currentTab);
    container.scrollTo({
      top: element.offsetTop - container.offsetTop,
      behavior: 'smooth',
    });
  }, [currentTab]);

  const handlerOpenModal = (payload) => {
    dispatch({ type: ADD_CURRENT_INGREDIENT, payload });
    setIsModalOpen(true);
  };

  return (
    <>
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
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalTitle={modalTitle}
      >
        <IngredientDetails ingredient={currentIngredient} />
      </Modal>
    </>
  );
};

export default BurgerIngredients;

import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const modalTitle = 'Детали ингредиента';

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState('Булки');
  const buns = data.filter((el) => el.type === 'bun');
  const sauces = data.filter((el) => el.type === 'sauce');
  const mains = data.filter((el) => el.type === 'main');

  const [currentIngredient, setCurrentIngredient] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerOpenModal = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className={`${styles.section} ml-5 mr-5`}>
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
        <div className={`${styles.container} mt-10 mb-10 custom-scroll`}>
          <div className="mb-2">
            <p className="text text_type_main-medium mb-6">Булки</p>
            <div className={`${styles.list} ml-4 mr-1`}>
              {buns.map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  count={1}
                  onModalOpen={handlerOpenModal}
                />
              ))}
            </div>
          </div>
          <div className="mb-2">
            <p className="text text_type_main-medium mb-6">Соусы</p>
            <div className={`${styles.list} ml-4 mr-1`}>
              {sauces.map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  count={1}
                  onModalOpen={handlerOpenModal}
                />
              ))}
            </div>
          </div>
          <div className="mb-2">
            <p className="text text_type_main-medium mb-6">Начинки</p>
            <div className={`${styles.list} ml-4 mr-1`}>
              {mains.map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  count={1}
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;

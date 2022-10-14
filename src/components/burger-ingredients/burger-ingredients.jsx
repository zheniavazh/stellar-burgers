import { useEffect, useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DataContext } from '../../services/dataContext';

const modalTitle = 'Детали ингредиента';

const BurgerIngredients = () => {
  const data = useContext(DataContext);

  const [currentTab, setCurrentTab] = useState('Булки');
  const buns = data.filter((el) => el.type === 'bun');
  const sauces = data.filter((el) => el.type === 'sauce');
  const mains = data.filter((el) => el.type === 'main');

  const [currentIngredient, setCurrentIngredient] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const element = document.getElementById(currentTab);
    element.scrollIntoView({ behavior: 'smooth' });
  }, [currentTab]);

  const handlerOpenModal = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIsModalOpen(true);
  };

  return (
    <>
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
        <div className="mb-2" id="Булки">
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
        <div className="mb-2" id="Соусы">
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
        <div className="mb-2" id="Начинки">
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

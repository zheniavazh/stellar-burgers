import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CURRENT_INGREDIENT } from '../../services/actions/ingredients';
import { DELETE_CURRENT_ORDER } from '../../services/actions/orders';

const modal = document.getElementById('modal');

const Modal = ({ isModalOpen, setIsModalOpen, modalTitle, children }) => {
  const dispatch = useDispatch();

  const { currentIngredient } = useSelector((state) => state.ingredients);
  const { currentOrder } = useSelector((state) => state.orders);

  const handlerCloseModal = useCallback(() => {
    setIsModalOpen(false);
    currentIngredient && dispatch({ type: DELETE_CURRENT_INGREDIENT });
    currentOrder && dispatch({ type: DELETE_CURRENT_ORDER });
  }, [setIsModalOpen, currentIngredient, currentOrder, dispatch]);

  useEffect(() => {
    const handlerKeyDown = (e) => {
      if (e.key === 'Escape') {
        handlerCloseModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handlerKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, [isModalOpen, handlerCloseModal]);

  return createPortal(
    isModalOpen && (
      <>
        <div className={`${styles.modal} pt-10 pb-15 pl-10 pr-10`}>
          <div className={styles.header}>
            <p className="text text_type_main-large">{modalTitle}</p>
            <CloseIcon type="primary" onClick={handlerCloseModal} />
          </div>
          {children}
        </div>
        <ModalOverlay onClose={handlerCloseModal} />
      </>
    ),
    modal
  );
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;

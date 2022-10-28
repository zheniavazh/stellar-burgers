import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CURRENT_ORDER } from '../../services/actions/orders';
import { useNavigate } from 'react-router-dom';
import {
  HIDE_INGREDIENT_MODAL,
  HIDE_ORDER_MODAL,
} from '../../services/actions/modal';

const modal = document.getElementById('modal');

const Modal = ({ modalTitle, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isIngredientModal, isOrderModal } = useSelector(
    (state) => state.modal
  );
  const isModalOpen = isIngredientModal || isOrderModal;

  const { currentOrder } = useSelector((state) => state.orders);

  const handlerCloseModal = useCallback(() => {
    isIngredientModal && dispatch({ type: HIDE_INGREDIENT_MODAL });
    isOrderModal && dispatch({ type: HIDE_ORDER_MODAL });
    navigate(-1, {
      state: null,
    });
    currentOrder && dispatch({ type: DELETE_CURRENT_ORDER });
  }, [isIngredientModal, isOrderModal, dispatch, navigate, currentOrder]);

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
    <>
      <div className={`${styles.modal} pt-10 pb-15 pl-10 pr-10`}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{modalTitle}</p>
          <CloseIcon type="primary" onClick={handlerCloseModal} />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={handlerCloseModal} />
    </>,
    modal
  );
};

Modal.propTypes = {
  modalTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;

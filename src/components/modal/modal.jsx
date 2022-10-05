import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modal = document.getElementById('modal');

const Modal = ({ isModal, setIsModal, modalTitle, children }) => {
  const handlerCloseModal = useCallback(() => {
    setIsModal(false);
  }, [setIsModal]);

  useEffect(() => {
    const handlerKeyDown = (e) => {
      if (e.key === 'Escape') {
        handlerCloseModal();
      }
    };

    window.addEventListener('keydown', handlerKeyDown);
    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, [handlerCloseModal]);

  return createPortal(
    isModal && (
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
  isModal: PropTypes.bool.isRequired,
  setIsModal: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;

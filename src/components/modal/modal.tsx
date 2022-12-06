import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modal = document.getElementById('modal') as Element | DocumentFragment;

type TModalProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
  modalTitle?: string;
  children: React.ReactNode;
};

const Modal = ({
  isModalOpen,
  onCloseModal,
  modalTitle,
  children,
}: TModalProps) => {
  useEffect(() => {
    const handlerKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handlerKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, [isModalOpen, onCloseModal]);

  return createPortal(
    <>
      <div className={`${styles.modal} pt-10 pb-15 pl-10 pr-10`}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{modalTitle}</p>
          <CloseIcon type="primary" onClick={onCloseModal} />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onCloseModal} />
    </>,
    modal
  );
};

export default Modal;

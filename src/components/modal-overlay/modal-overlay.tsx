import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlayProps) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;

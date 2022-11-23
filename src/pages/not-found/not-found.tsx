import styles from './not-found.module.css';

const NotFoundPage = () => {
  return (
    <p
      className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
      Страница не найдена ¯\_(ツ)_/¯
    </p>
  );
};

export default NotFoundPage;

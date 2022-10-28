import { useState, useEffect } from 'react';
import styles from './forgot-password.module.css';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/auth';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const [value, setValue] = useState({ email: '' });
  const handlerChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const reset = (e) => {
    e.preventDefault();
    dispatch(resetPassword(value));
    navigate('/reset-password', {
      replace: true,
      state: { email: value.email },
    });
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={reset}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          onChange={handlerChange}
          value={value.email}
          name={'email'}
          placeholder="Укажите e-mail"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div className="mt-20">
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}
        >
          Вспомнили пароль?{' '}
          <NavLink to="/login" className={styles.link}>
            Войти
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

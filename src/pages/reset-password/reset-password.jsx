import { useState, useEffect } from 'react';
import styles from './reset-password.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPassword } from '../../services/actions/auth';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state && location.state.email;

  const { currentUser } = useSelector((state) => state.auth);

  const [value, setValue] = useState({ password: '', token: '' });
  const handlerChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const reset = (e) => {
    e.preventDefault();
    dispatch(confirmPassword(value));
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
    if (!email) {
      navigate('/forgot-password', { replace: true });
    }
  }, [currentUser, navigate, email]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={reset}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <PasswordInput
          onChange={handlerChange}
          value={value.password}
          name={'password'}
          placeholder="Введите новый пароль"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handlerChange}
          value={value.token}
          name={'token'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
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

export default ResetPasswordPage;

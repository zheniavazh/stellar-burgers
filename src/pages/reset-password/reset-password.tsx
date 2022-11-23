import { useEffect } from 'react';
import styles from './reset-password.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { confirmPassword } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../index';

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state && location.state.email;

  const { currentUser } = useAppSelector((state) => state.auth);

  const { values, handlerChange } = useForm({ password: '', token: '' });

  const reset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(confirmPassword(values));
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
          value={values.password}
          name={'password'}
          placeholder="Введите новый пароль"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handlerChange}
          value={values.token}
          name={'token'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className="mt-20">
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>
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

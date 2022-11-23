import { useEffect } from 'react';
import styles from './login.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../index';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state && location.state.from;

  const { currentUser } = useAppSelector((state) => state.auth);

  const { values, handlerChange } = useForm({
    email: '',
    password: '',
  });

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (currentUser) {
      navigate(from ? `${from}` : '/', {
        replace: true,
      });
    }
  }, [currentUser, navigate, from]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={login}>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={handlerChange}
          value={values.email}
          name={'email'}
        />
        <PasswordInput
          onChange={handlerChange}
          value={values.password}
          name={'password'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className="mt-20">
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>
          Вы — новый пользователь?{' '}
          <NavLink to="/register" className={styles.link}>
            Зарегистрироваться
          </NavLink>
        </p>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>
          Забыли пароль?{' '}
          <NavLink to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState, useEffect } from 'react';
import styles from './login.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../services/actions/auth';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state && location.state.from;

  const { currentUser } = useSelector((state) => state.auth);

  const [value, setValue] = useState({ email: '', password: '' });
  const handlerChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(signIn(value));
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
          value={value.email}
          name={'email'}
        />
        <PasswordInput
          onChange={handlerChange}
          value={value.password}
          name={'password'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className="mt-20">
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}
        >
          Вы — новый пользователь?{' '}
          <NavLink to="/register" className={styles.link}>
            Зарегистрироваться
          </NavLink>
        </p>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}
        >
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

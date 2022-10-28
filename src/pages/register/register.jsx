import { useState, useEffect } from 'react';
import styles from './register.module.css';
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../services/actions/auth';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const [value, setValue] = useState({ name: '', email: '', password: '' });
  const handlerChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(signUp(value));
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={register}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handlerChange}
          value={value.name}
          name={'name'}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <div className="mt-20">
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}
        >
          Уже зарегистрированы?{' '}
          <NavLink to="/login" className={styles.link}>
            Войти
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

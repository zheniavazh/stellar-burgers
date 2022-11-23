import { useEffect } from 'react';
import styles from './register.module.css';
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUp } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../index';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.auth);

  const { values, handlerChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp(values));
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
          value={values.name}
          name={'name'}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <div className="mt-20">
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>
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

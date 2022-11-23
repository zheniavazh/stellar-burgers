import { useEffect } from 'react';
import styles from './forgot-password.module.css';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../index';

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.auth);

  const { values, handlerChange } = useForm({ email: '' });

  const reset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(values));
    navigate('/reset-password', {
      replace: true,
      state: { email: values.email },
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
          value={values.email}
          name={'email'}
          placeholder="Укажите e-mail"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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

export default ForgotPasswordPage;

import { useState } from 'react';
import styles from './profile.module.css';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateToken, updateUser } from '../../services/actions/auth';
import { useAppDispatch, useAppSelector } from '../../index';

const Profile = () => {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.auth);

  const [isButtons, showButtons] = useState(false);

  const [isInputDisabled, setInputDisabled] = useState(true);

  const initialState = {
    name: currentUser?.name,
    email: currentUser?.email,
    password: '',
  };

  const [values, setValues] = useState(initialState);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    showButtons(true);
  };

  const handlerCancel = () => {
    setValues(initialState);
    showButtons(false);
  };

  const handlerUpdate = () => {
    const token = window.localStorage.getItem('expires_in');
    if (token && Date.now() >= Number(token) + 1200 * 1000) {
      dispatch(updateToken());
    }
    dispatch(updateUser(values));
    showButtons(false);
  };

  return (
    <form className={styles.form} onSubmit={handlerUpdate}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handlerChange}
        value={values.name || ''}
        name={'name'}
        disabled={isInputDisabled}
        icon={'EditIcon'}
        onIconClick={() => {
          setInputDisabled(false);
        }}
      />
      <EmailInput
        onChange={handlerChange}
        value={values.email || ''}
        name={'email'}
        isIcon={true}
      />
      <PasswordInput
        onChange={handlerChange}
        value={values.password}
        name={'password'}
        icon={'EditIcon'}
      />
      {isButtons && (
        <div>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handlerCancel}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;

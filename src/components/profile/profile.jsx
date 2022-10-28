import { useState } from 'react';
import styles from './profile.module.css';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken, updateUser } from '../../services/actions/auth';

const Profile = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const [isButtons, showButtons] = useState(false);

  const initialState = {
    name: currentUser?.name,
    email: currentUser?.email,
    password: '',
  };
  const [value, setValue] = useState(initialState);

  const handlerChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    showButtons(true);
  };

  const handlerCancel = () => {
    setValue(initialState);
    showButtons(false);
  };

  const handlerUpdate = () => {
    const token = window.localStorage.getItem('expires_in');
    if (token && Date.now() >= Number(token) + 1200 * 1000) {
      dispatch(updateToken());
    }
    dispatch(updateUser(value));
    showButtons(false);
  };

  return (
    <form className={styles.form} onSubmit={handlerUpdate}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handlerChange}
        value={value.name || ''}
        name={'name'}
        icon={'EditIcon'}
      />
      <EmailInput
        onChange={handlerChange}
        value={value.email || ''}
        name={'email'}
        icon={'EditIcon'}
      />
      <PasswordInput
        onChange={handlerChange}
        value={value.password}
        name={'password'}
        icon={'EditIcon'}
      />
      {isButtons && (
        <div>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handlerCancel}
          >
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

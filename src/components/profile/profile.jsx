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
import { useForm } from '../../hooks/useForm';

const Profile = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const [isButtons, showButtons] = useState(false);

  const initialState = {
    name: currentUser?.name,
    email: currentUser?.email,
    password: '',
  };
  const { values, setValues, handlerChange } = useForm(initialState);

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
        icon={'EditIcon'}
      />
      <EmailInput
        onChange={handlerChange}
        value={values.email || ''}
        name={'email'}
        icon={'EditIcon'}
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

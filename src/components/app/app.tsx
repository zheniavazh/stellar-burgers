import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router } from 'react-router-dom';
import { getIngredients } from '../../services/actions/ingredients';
import { getUser, updateToken } from '../../services/actions/auth';
import ModalRoutes from '../modal-routes/modal-routes';
import { useAppDispatch } from '../../index';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    const token = window.localStorage.getItem('expires_in');
    if (token && Date.now() >= Number(token) + 1200 * 1000) {
      dispatch(updateToken());
      dispatch(getUser());
    } else {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Router basename={process.env.PUBLIC_URL}>
        <AppHeader />
        <ModalRoutes />
      </Router>
    </div>
  );
};

export default App;

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NotFoundPage from '../../pages/not-found/not-found';
import Profile from '../profile/profile';
import IngredientPage from '../../pages/ingredient/ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { INGREDIENTMODALTITLE } from '../../constants';
import {
  HIDE_INGREDIENT_MODAL,
  HIDE_ORDER_MODAL,
} from '../../services/actions/modal';
import { DELETE_CURRENT_ORDER } from '../../services/actions/orders';

const ModalRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  const { isIngredientModal, isOrderModal } = useSelector(
    (state) => state.modal
  );
  const isModalOpen = isIngredientModal || isOrderModal;

  const { currentOrder } = useSelector((state) => state.orders);

  const handlerCloseModal = () => {
    isIngredientModal && dispatch({ type: HIDE_INGREDIENT_MODAL });
    isOrderModal && dispatch({ type: HIDE_ORDER_MODAL });
    navigate(-1, {
      state: null,
    });
    currentOrder && dispatch({ type: DELETE_CURRENT_ORDER });
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={null} />
          </Route>
          <Route path="/profile/orders/:orderNumber" element={null}></Route>
        </Route>
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientPage />}
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal
                isModalOpen={isModalOpen}
                onCloseModal={handlerCloseModal}
                modalTitle={INGREDIENTMODALTITLE}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:orderNumber"
            element={
              <Modal isModalOpen={isModalOpen} onCloseModal={handlerCloseModal}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default ModalRoutes;

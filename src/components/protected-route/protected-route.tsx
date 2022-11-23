import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../index';

export function ProtectedRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true, state: { from: pathname } });
    }
  }, [currentUser, navigate, pathname]);

  return <Outlet />;
}

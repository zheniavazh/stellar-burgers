import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true, state: { from: pathname } });
    }
  }, [currentUser, navigate, pathname]);

  return <Outlet />;
}

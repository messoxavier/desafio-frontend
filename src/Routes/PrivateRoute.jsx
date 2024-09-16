import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  // Verifica se o token existe
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

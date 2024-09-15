import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Verifica se há um token armazenado
  return (
    <Route
      {...rest}
      element={token ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;

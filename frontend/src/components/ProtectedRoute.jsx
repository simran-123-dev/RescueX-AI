import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem('rescuex_token');
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  return (
    user.id
      ? children
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
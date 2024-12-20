import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.appUserRole !== 'ADMIN') {
    return <p>Access Denied: You must be an admin to view this page.</p>;
  }

  return children;
};

export default AdminRoute;
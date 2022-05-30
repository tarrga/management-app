import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ user, navigatePath }) {
  return user ? <Outlet /> : <Navigate to={navigatePath} />;
}

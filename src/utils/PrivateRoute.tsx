import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useSelector((s: RootState) => s.auth);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
